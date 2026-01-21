#pragma once

#include <atomic>
#include <memory>
#include <optional>

namespace OmniTrade::Network {

/**
 * @brief A simple Single-Producer Single-Consumer (SPSC) Lock-Free Queue.
 *
 * Uses a ring buffer and atomic indices.
 * This is the standard pattern for passing data between a network thread and a
 * matching engine thread.
 */
template <typename T, size_t Capacity> class LockFreeQueue {
public:
  LockFreeQueue() : head_(0), tail_(0) {}

  // Non-copyable
  LockFreeQueue(const LockFreeQueue &) = delete;
  LockFreeQueue &operator=(const LockFreeQueue &) = delete;

  /**
   * @brief Push an item into the queue.
   * @return true if successful, false if full.
   * Called by Producer.
   */
  bool push(const T &item) {
    size_t current_tail = tail_.load(std::memory_order_relaxed);
    size_t next_tail = (current_tail + 1) % Capacity;

    if (next_tail == head_.load(std::memory_order_acquire)) {
      return false; // Full
    }

    buffer_[current_tail] = item;
    tail_.store(next_tail, std::memory_order_release);
    return true;
  }

  /**
   * @brief Pop an item from the queue.
   * @return std::optional<T> containing item if success.
   * Called by Consumer.
   */
  std::optional<T> pop() {
    size_t current_head = head_.load(std::memory_order_relaxed);

    if (current_head == tail_.load(std::memory_order_acquire)) {
      return std::nullopt; // Empty
    }

    T item = buffer_[current_head];
    head_.store((current_head + 1) % Capacity, std::memory_order_release);
    return item;
  }

private:
  std::array<T, Capacity> buffer_;
  std::atomic<size_t> head_;
  std::atomic<size_t> tail_;
};

} // namespace OmniTrade::Network
