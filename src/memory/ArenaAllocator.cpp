#include "omnitrade/memory/ArenaAllocator.h"
#include <cstdlib>
#include <iostream>
#include <memory>
#include <new>

namespace OmniTrade::Memory {

ArenaAllocator::ArenaAllocator(size_t size_bytes)
    : total_size_(size_bytes), offset_(0) {
  // In a real system, we might use mmap or aligned_alloc
  buffer_ = static_cast<std::byte *>(std::malloc(total_size_));
  if (!buffer_) {
    throw std::bad_alloc();
  }
}

ArenaAllocator::~ArenaAllocator() { std::free(buffer_); }

void *ArenaAllocator::allocate(size_t size, size_t alignment) {
  // Calculate current address
  void *current_ptr = buffer_ + offset_;

  // Determine how much padding is needed to satisfy alignment
  size_t space = total_size_ - offset_;
  void *aligned_ptr = current_ptr;

  // std::align adjusts 'aligned_ptr' and updates 'space'
  if (!std::align(alignment, size, aligned_ptr, space)) {
    throw std::bad_alloc(); // Out of memory in arena
  }

  // Calculate how many bytes we skipped for alignment
  size_t padding = static_cast<std::byte *>(aligned_ptr) -
                   static_cast<std::byte *>(current_ptr);

  // Update offset
  offset_ += padding + size;

  return aligned_ptr;
}

void ArenaAllocator::reset() {
  offset_ = 0;
  // Note: We do NOT call destructors here. This is for POD types or manual
  // management.
}

} // namespace OmniTrade::Memory
