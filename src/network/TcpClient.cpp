#include <arpa/inet.h>
#include <cstring>
#include <iostream>
#include <string>
#include <sys/socket.h>
#include <unistd.h>

namespace OmniTrade::Network {

void run_client() {
  int sock = 0;
  struct sockaddr_in serv_addr;

  if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
    std::cerr << "\n Socket creation error \n";
    return;
  }

  serv_addr.sin_family = AF_INET;
  serv_addr.sin_port = htons(8080);

  // Convert IPv4 and IPv6 addresses from text to binary form
  if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
    std::cerr << "\nInvalid address/ Address not supported \n";
    return;
  }

  if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
    std::cerr << "\nConnection Failed. Is the server running?\n";
    return;
  }

  std::cout << "Connected to Server! Type a message (or 'exit' to quit):\n";

  while (true) {
    std::string message;
    std::cout << "> ";
    std::getline(std::cin, message);

    if (message == "exit")
      break;

    send(sock, message.c_str(), message.length(), 0);

    char buffer[1024] = {0};
    int valread = read(sock, buffer, 1024);
    if (valread > 0) {
      std::cout << "Server replied: " << buffer << std::endl;
    }
  }

  close(sock);
}

} // namespace OmniTrade::Network

int main() {
  OmniTrade::Network::run_client();
  return 0;
}
