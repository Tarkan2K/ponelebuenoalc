#include "omnitrade/engine/StandardOrderBook.h"
#include <chrono>
#include <iostream>
#include <random>
#include <vector>

using namespace OmniTrade::Core;
using namespace OmniTrade::Engine;

int main() {
  StandardOrderBook book;
  const int NUM_ORDERS = 100000;

  std::vector<Order> orders;
  orders.reserve(NUM_ORDERS);

  std::mt19937 rng(42);
  std::uniform_int_distribution<uint64_t> price_dist(90, 110);
  std::uniform_int_distribution<uint64_t> qty_dist(1, 100);
  std::uniform_int_distribution<int> side_dist(0, 1);

  for (int i = 0; i < NUM_ORDERS; ++i) {
    Order o;
    o.id = i + 1;
    o.price = price_dist(rng);
    o.quantity = qty_dist(rng);
    o.side = side_dist(rng) == 0 ? Side::Buy : Side::Sell;
    o.type = OrderType::Limit;
    orders.push_back(o);
  }

  std::cout << "Benchmarking " << NUM_ORDERS << " orders..." << std::endl;

  auto start = std::chrono::high_resolution_clock::now();

  for (const auto &o : orders) {
    book.add_order(o);
  }

  auto end = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> diff = end - start;

  std::cout << "Time: " << diff.count() << " s" << std::endl;
  std::cout << "Throughput: " << NUM_ORDERS / diff.count() << " orders/sec"
            << std::endl;

  return 0;
}
