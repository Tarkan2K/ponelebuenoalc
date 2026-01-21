#pragma once

#include <cstdint>
#include <limits>

namespace OmniTrade::Core {

using OrderId = uint64_t;
using Price = uint64_t; // Represented in ticks (e.g., cents or smaller)
using Quantity = uint64_t;

enum class Side : uint8_t { Buy = 0, Sell = 1 };

enum class OrderType : uint8_t { Limit = 0, Market = 1 };

/**
 * @brief Order struct optimized for size and alignment.
 *
 * Layout analysis:
 * - id: 8 bytes
 * - price: 8 bytes
 * - quantity: 8 bytes
 * - side: 1 byte
 * - type: 1 byte
 * - padding: 6 bytes (to reach 32 bytes alignment)
 *
 * Total size: 32 bytes. Fits perfectly in half a cache line (64 bytes).
 */
struct Order {
  OrderId id;
  Price price;
  Quantity quantity;
  Side side;
  OrderType type;
  // Explicit padding is good practice for binary protocols,
  // though compiler adds it automatically for alignment.
  uint8_t _padding[6];
};

static_assert(sizeof(Order) == 32,
              "Order struct must be 32 bytes for performance");

} // namespace OmniTrade::Core
