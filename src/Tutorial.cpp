#include <chrono>
#include <iostream>
#include <limits>
#include <string>
#include <thread>

void clear_screen() { std::cout << "\033[2J\033[1;1H"; }

void wait_for_enter() {
  std::cout << "\n[Presiona ENTER para continuar...]";
  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
}

void print_header(const std::string &title) {
  clear_screen();
  std::cout << "==================================================\n";
  std::cout << "   " << title << "\n";
  std::cout << "==================================================\n\n";
}

void section_intro() {
  print_header("BIENVENIDO A OMNITRADE: TU ENTRENAMIENTO C++");
  std::cout << "Este programa te guiará paso a paso por la construcción\n";
  std::cout << "de un motor de trading de alto rendimiento.\n\n";
  std::cout
      << "Objetivo: Entender C++ moderno, gestión de memoria y sistemas.\n";
  wait_for_enter();
}

void section_memory() {
  print_header("MÓDULO 1: GESTIÓN DE MEMORIA");
  std::cout << "¿Por qué no usar 'new' o 'malloc'?\n";
  std::cout << "1. Son lentos (buscan huecos en la memoria).\n";
  std::cout << "2. Fragmentan la memoria (dejan huecos inútiles).\n\n";

  std::cout << "SOLUCIÓN: Arena Allocator\n";
  std::cout
      << "Reservamos un bloque GIGANTE al principio y repartimos trozos.\n\n";

  std::cout << "Código Clave:\n";
  std::cout << "--------------------------------------------------\n";
  std::cout << "void* allocate(size_t size) {\n";
  std::cout << "    void* ptr = buffer_ + offset_;\n";
  std::cout << "    offset_ += size;\n";
  std::cout << "    return ptr;\n";
  std::cout << "}\n";
  std::cout << "--------------------------------------------------\n";
  std::cout << "¡Es solo una suma! O(1) de complejidad.\n";
  wait_for_enter();
}

void section_ood() {
  print_header("MÓDULO 2: DISEÑO ORIENTADO A DATOS");
  std::cout << "Tu CPU lee memoria en bloques de 64 bytes (Cache Lines).\n";
  std::cout << "Si tu objeto mide 33 bytes, ocupará 2 líneas de caché.\n";
  std::cout << "¡Eso es el doble de lento de leer!\n\n";

  std::cout << "SOLUCIÓN: Padding (Relleno)\n";
  std::cout << "Hacemos que nuestra estructura 'Order' mida exactamente 32 "
               "bytes.\n\n";

  std::cout << "struct Order {\n";
  std::cout << "    uint64_t id;       // 8 bytes\n";
  std::cout << "    uint64_t price;    // 8 bytes\n";
  std::cout << "    uint64_t quantity; // 8 bytes\n";
  std::cout << "    uint8_t side;      // 1 byte\n";
  std::cout << "    uint8_t type;      // 1 byte\n";
  std::cout << "    uint8_t padding[6];// 6 bytes -> Total 32\n";
  std::cout << "};\n";
  wait_for_enter();
}

void section_engine() {
  print_header("MÓDULO 3: EL MOTOR DE EMPAREJAMIENTO");
  std::cout
      << "Necesitamos ordenar las ofertas de compra (Bids) y venta (Asks).\n";
  std::cout << "- Bids: De mayor a menor precio.\n";
  std::cout << "- Asks: De menor a mayor precio.\n\n";

  std::cout << "Estructura de Datos:\n";
  std::cout << "std::map<Price, std::list<Order>>\n\n";

  std::cout << "¿Por qué std::map? Mantiene el orden automáticamente.\n";
  std::cout << "¿Por qué std::list? Permite borrar órdenes del medio en O(1)\n";
  std::cout << "si guardamos un iterador (puntero) a ellas.\n";
  wait_for_enter();
}

void section_network() {
  print_header("MÓDULO 4: REDES Y CONCURRENCIA");
  std::cout << "Un servidor normal crea un 'hilo' por cada cliente.\n";
  std::cout << "Si tienes 10,000 clientes, el ordenador explota.\n\n";

  std::cout << "SOLUCIÓN: Epoll (Linux)\n";
  std::cout << "Le pedimos al sistema operativo: 'Avísame cuando ALGUIEN envíe "
               "datos'.\n";
  std::cout << "Un solo hilo puede manejar miles de conexiones.\n\n";

  std::cout << "COMUNICACIÓN ENTRE HILOS:\n";
  std::cout << "Usamos una 'LockFreeQueue' (Cola sin candados).\n";
  std::cout << "Usamos operaciones atómicas para que no haya que esperar.\n";
  wait_for_enter();
}

int main() {
  section_intro();
  section_memory();
  section_ood();
  section_engine();
  section_network();

  print_header("¡ENTRENAMIENTO COMPLETADO!");
  std::cout << "Ahora revisa el código en 'src/' para ver esto en acción.\n";
  std::cout << "Ejecuta './run_all.sh' para ver los tests pasar.\n";
  return 0;
}
