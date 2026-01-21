#pragma once

#include <cstddef>
#include <cstdint>
#include <stdexcept>
#include <vector>

namespace OmniTrade::Memory {

/**
 * @brief A simple Arena Allocator (Linear Allocator).
 *
 * This allocator pre-allocates a large block of memory and hands out pointers
 * by simply advancing an offset. This is extremely fast (O(1)) and
 * cache-friendly.
 *
 * It does NOT support freeing individual allocations. The entire arena is reset
 * at once.
 */
class ArenaAllocator {
public:
  explicit ArenaAllocator(size_t size_bytes);
  ~ArenaAllocator();

  // Delete copy/move to prevent accidental double-free logic issues for this
  // simple version
  ArenaAllocator(const ArenaAllocator &) = delete;
  ArenaAllocator &operator=(const ArenaAllocator &) = delete;

  /**
   * @brief Allocate a block of memory of the given size.
   *
   * @param size Size in bytes.
   * @param alignment Alignment requirement (default 8 bytes).
   * @return void* Pointer to the allocated memory.
   */
  void *allocate(size_t size, size_t alignment = 8);

  /**
   * @brief Helper to allocate a specific type T.
   */
  template <typename T> T *alloc() {
    return static_cast<T *>(allocate(sizeof(T), alignof(T)));
  }

  /**
   * @brief Reset the allocator, invalidating all previous allocations.
   * Does NOT free the underlying memory back to the OS, just resets the offset.
   */
  void reset();

  size_t used_bytes() const { return offset_; }
  size_t total_bytes() const { return total_size_; }

private:
  std::byte *buffer_;
  size_t total_size_;
  size_t offset_;
};

} // namespace OmniTrade::Memory
