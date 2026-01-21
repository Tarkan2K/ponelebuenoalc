// ============================================================================
// LECCIÓN 09: NETWORKING BÁSICO (SOCKETS)
// ============================================================================
//
// En HFT, todo se trata de enviar y recibir datos rápido.
// Aquí crearemos un mini-servidor y un mini-cliente en el mismo archivo
// usando hilos para comunicarlos.
//
// Usaremos sockets de estilo C (sys/socket.h) porque es la base de todo.
// ============================================================================

#include <arpa/inet.h>
#include <cstring>
#include <iostream>
#include <netinet/in.h>
#include <sys/socket.h>
#include <thread>
#include <unistd.h>

const int PORT = 8080;

void servidor() {
  // 1. Crear Socket
  int server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd == 0) {
    perror("Fallo socket servidor");
    return;
  }

  // Opciones para reutilizar el puerto rápido
  int opt = 1;
  setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt,
             sizeof(opt));

  // 2. Bind (Asociar a puerto)
  struct sockaddr_in address;
  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY; // Escuchar en todas las interfaces
  address.sin_port = htons(PORT);

  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("Fallo bind");
    return;
  }

  // 3. Listen (Esperar conexiones)
  if (listen(server_fd, 3) < 0) {
    perror("Fallo listen");
    return;
  }

  std::cout << "[SERVIDOR] Escuchando en puerto " << PORT << "..." << std::endl;

  // 4. Accept (Aceptar conexión)
  int addrlen = sizeof(address);
  int new_socket =
      accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen);

  if (new_socket < 0) {
    perror("Fallo accept");
    return;
  }

  // 5. Leer datos
  char buffer[1024] = {0};
  read(new_socket, buffer, 1024);
  std::cout << "[SERVIDOR] Recibido: " << buffer << std::endl;

  // 6. Responder
  const char *hello = "Hola desde el Servidor!";
  send(new_socket, hello, strlen(hello), 0);
  std::cout << "[SERVIDOR] Respuesta enviada." << std::endl;

  close(new_socket);
  close(server_fd);
}

void cliente() {
  // Esperar un poco a que el servidor arranque
  std::this_thread::sleep_for(std::chrono::seconds(1));

  // 1. Crear Socket
  int sock = 0;
  if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
    std::cout << "\n Error creación socket cliente \n";
    return;
  }

  struct sockaddr_in serv_addr;
  serv_addr.sin_family = AF_INET;
  serv_addr.sin_port = htons(PORT);

  // Convertir IP a binario
  if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
    std::cout << "\n Dirección inválida \n";
    return;
  }

  // 2. Conectar
  if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
    std::cout << "\n Conexión fallida \n";
    return;
  }

  // 3. Enviar
  const char *hello = "Hola Servidor, soy el Cliente!";
  send(sock, hello, strlen(hello), 0);
  std::cout << "[CLIENTE] Mensaje enviado." << std::endl;

  // 4. Leer respuesta
  char buffer[1024] = {0};
  read(sock, buffer, 1024);
  std::cout << "[CLIENTE] Respuesta recibida: " << buffer << std::endl;

  close(sock);
}

int main() {
  // Ejecutamos servidor y cliente en hilos paralelos
  std::thread t_server(servidor);
  std::thread t_client(cliente);

  t_server.join();
  t_client.join();

  return 0;
}
