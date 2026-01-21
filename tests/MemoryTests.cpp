#include "omnitrade/memory/ArenaAllocator.h"
#include <cassert>
#include <iostream>

void test_simple_allocation() {
  std::cout << "Running test_simple_allocation..." << std::endl;
  OmniTrade::Memory::ArenaAllocator arena(1024);

  int *a = arena.alloc<int>();
  *a = 42;

  double *b = arena.alloc<double>();
  *b = 3.14;

  assert(*a == 42);
  assert(*b == 3.14);
  assert(arena.used_bytes() >= sizeof(int) + sizeof(double));
  std::cout << "PASSED" << std::endl;
}

void test_reset() {
  std::cout << "Running test_reset..." << std::endl;
  OmniTrade::Memory::ArenaAllocator arena(1024);

  void *p1 = arena.allocate(100);
  size_t used_before = arena.used_bytes();

  assert(used_before > 0);
  arena.reset();

  assert(arena.used_bytes() == 0);

  void *p2 = arena.allocate(100);
  // In a simple linear allocator, resetting and allocating same size should
  // give same pointer
  assert(p1 == p2);
  std::cout << "PASSED" << std::endl;
}

int main() {
  test_simple_allocation();
  test_reset();
  std::cout << "All Memory Tests Passed!" << std::endl;
  return 0;
}
