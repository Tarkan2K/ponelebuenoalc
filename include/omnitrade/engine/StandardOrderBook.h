#pragma once

#include "omnitrade/core/OrderBook.h"
#include <list>
#include <map>
#include <unordered_map>

namespace OmniTrade::Engine {

using namespace OmniTrade::Core;

/**
 * @brief Standard implementation of an Order Book using std::map.
 *
 * Data Structures:
 * - Bids: std::map<Price, std::list<Order>, std::greater<Price>> (Highest price
 * first)
 * - Asks: std::map<Price, std::list<Order>, std::less<Price>> (Lowest price
 * first)
 * - OrderMap: std::unordered_map<OrderId, Iterator> for O(1) cancellation.
 */
class StandardOrderBook : public IOrderBook {
public:
  bool add_order(const Order &order) override;
  bool cancel_order(OrderId order_id) override;
  std::pair<Price, Price> get_top_of_book() const override;
  Quantity get_volume_at_price(Price price) const override;

private:
  // We use std::list for O(1) insertion/deletion at the ends, preserving time
  // priority. std::map keeps prices ordered.
  using OrderList = std::list<Order>;
  using BidsMap = std::map<Price, OrderList, std::greater<Price>>;
  using AsksMap = std::map<Price, OrderList, std::less<Price>>;

  BidsMap bids_;
  AsksMap asks_;

  // For O(1) cancellation, we need to track where each order is.
  // This adds memory overhead but is required for fast cancels.
  struct OrderLocation {
    bool is_bid;
    Price price;
    OrderList::iterator it;
  };
  std::unordered_map<OrderId, OrderLocation> order_lookup_;

  void match_order(Order &incoming_order);
};

} // namespace OmniTrade::Engine
