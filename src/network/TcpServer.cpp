#include <cerrno>
#include <cstring>
#include <fcntl.h>
#include <iostream>
#include <netinet/in.h>
#include <sys/epoll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <vector>

namespace OmniTrade::Network {

constexpr int MAX_EVENTS = 10;
constexpr int PORT = 8080;

void set_nonblocking(int sockfd) {
  int flags = fcntl(sockfd, F_GETFL, 0);
  fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);
}

/**
 * @brief A simple TCP Server demonstrating epoll.
 *
 * This is a standalone example function to show the pattern.
 * In a real engine, this would be a class integrated with the Queue.
 */
void run_server() {
  int server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd == -1) {
    perror("socket");
    return;
  }

  set_nonblocking(server_fd);

  sockaddr_in addr{};
  addr.sin_family = AF_INET;
  addr.sin_addr.s_addr = INADDR_ANY;
  addr.sin_port = htons(PORT);

  if (bind(server_fd, (struct sockaddr *)&addr, sizeof(addr)) == -1) {
    perror("bind");
    return;
  }

  if (listen(server_fd, SOMAXCONN) == -1) {
    perror("listen");
    return;
  }

  int epoll_fd = epoll_create1(0);
  if (epoll_fd == -1) {
    perror("epoll_create1");
    return;
  }

  epoll_event ev{}, events[MAX_EVENTS];
  ev.events = EPOLLIN;
  ev.data.fd = server_fd;

  if (epoll_ctl(epoll_fd, EPOLL_CTL_ADD, server_fd, &ev) == -1) {
    perror("epoll_ctl: server_fd");
    return;
  }

  std::cout << "Server listening on port " << PORT << std::endl;

  // Run for a few iterations just to demonstrate
  int iterations = 0;
  while (iterations < 50) { // Limit for demo purposes
    int nfds = epoll_wait(epoll_fd, events, MAX_EVENTS, 100); // 100ms timeout

    if (nfds == -1) {
      perror("epoll_wait");
      break;
    }

    for (int i = 0; i < nfds; ++i) {
      if (events[i].data.fd == server_fd) {
        // Accept new connection
        sockaddr_in client_addr;
        socklen_t client_len = sizeof(client_addr);
        int client_fd =
            accept(server_fd, (struct sockaddr *)&client_addr, &client_len);

        if (client_fd == -1) {
          if (errno != EAGAIN && errno != EWOULDBLOCK) {
            perror("accept");
          }
          continue;
        }

        set_nonblocking(client_fd);
        ev.events = EPOLLIN | EPOLLET; // Edge Triggered
        ev.data.fd = client_fd;
        if (epoll_ctl(epoll_fd, EPOLL_CTL_ADD, client_fd, &ev) == -1) {
          perror("epoll_ctl: client");
        }
        std::cout << "Accepted connection: " << client_fd << std::endl;

      } else {
        // Handle data from client
        char buf[1024];
        ssize_t n = read(events[i].data.fd, buf, sizeof(buf));

        if (n <= 0) {
          if (n == 0 || errno != EAGAIN) {
            close(events[i].data.fd);
            std::cout << "Closed connection: " << events[i].data.fd
                      << std::endl;
          }
        } else {
          std::cout << "Received " << n << " bytes from " << events[i].data.fd
                    << std::endl;
          // Echo back
          write(events[i].data.fd, buf, n);
        }
      }
    }
    // iterations++; // Commented out to let it run in a real test, or uncomment
    // to stop
  }

  close(server_fd);
  close(epoll_fd);
}

} // namespace OmniTrade::Network
