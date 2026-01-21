#pragma once

#include "omnitrade/core/Types.h"
#include <optional>
#include <vector>

namespace OmniTrade::Core {

/**
 * @brief Abstract base class for an OrderBook.
 *
 * Demonstrates:
 * 1. Pure virtual functions (Interface).
 * 2. Separation of concerns.
 */
class IOrderBook {
public:
  virtual ~IOrderBook() = default;

  /**
   * @brief Add an order to the book.
   * @return true if added, false if rejected.
   */
  virtual bool add_order(const Order &order) = 0;

  /**
   * @brief Cancel an order.
   */
  virtual bool cancel_order(OrderId order_id) = 0;

  /**
   * @brief Get current best bid and ask.
   */
  virtual std::pair<Price, Price> get_top_of_book() const = 0;

  /**
   * @brief Get total volume at a specific price level.
   */
  virtual Quantity get_volume_at_price(Price price) const = 0;
};

} // namespace OmniTrade::Core
