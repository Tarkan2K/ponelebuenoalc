#include "omnitrade/engine/StandardOrderBook.h"
#include <iostream>

namespace OmniTrade::Engine {

bool StandardOrderBook::add_order(const Order &order) {
  if (order_lookup_.find(order.id) != order_lookup_.end()) {
    return false; // Duplicate ID
  }

  Order incoming = order;

  // 1. Try to match immediately
  match_order(incoming);

  // 2. If any quantity remains, add to book
  if (incoming.quantity > 0) {
    if (incoming.side == Side::Buy) {
      bids_[incoming.price].push_back(incoming);
      order_lookup_[incoming.id] = {true, incoming.price,
                                    --bids_[incoming.price].end()};
    } else {
      asks_[incoming.price].push_back(incoming);
      order_lookup_[incoming.id] = {false, incoming.price,
                                    --asks_[incoming.price].end()};
    }
  }

  return true;
}

void StandardOrderBook::match_order(Order &incoming) {
  while (incoming.quantity > 0) {
    if (incoming.side == Side::Buy) {
      // Buying: look at lowest Asks
      if (asks_.empty())
        break;

      auto best_ask_it = asks_.begin();
      Price best_price = best_ask_it->first;

      if (incoming.price < best_price)
        break; // No match possible

      auto &orders = best_ask_it->second;
      while (!orders.empty() && incoming.quantity > 0) {
        Order &match = orders.front();

        Quantity trade_qty = std::min(incoming.quantity, match.quantity);

        // Execute Trade (In real system, we'd emit an event here)
        // std::cout << "Trade! " << trade_qty << " @ " << best_price <<
        // std::endl;

        incoming.quantity -= trade_qty;
        match.quantity -= trade_qty;

        if (match.quantity == 0) {
          order_lookup_.erase(match.id);
          orders.pop_front();
        }
      }

      if (orders.empty()) {
        asks_.erase(best_ask_it);
      }

    } else {
      // Selling: look at highest Bids
      if (bids_.empty())
        break;

      auto best_bid_it = bids_.begin();
      Price best_price = best_bid_it->first;

      if (incoming.price > best_price)
        break; // No match possible

      auto &orders = best_bid_it->second;
      while (!orders.empty() && incoming.quantity > 0) {
        Order &match = orders.front();

        Quantity trade_qty = std::min(incoming.quantity, match.quantity);

        // Execute Trade
        // std::cout << "Trade! " << trade_qty << " @ " << best_price <<
        // std::endl;

        incoming.quantity -= trade_qty;
        match.quantity -= trade_qty;

        if (match.quantity == 0) {
          order_lookup_.erase(match.id);
          orders.pop_front();
        }
      }

      if (orders.empty()) {
        bids_.erase(best_bid_it);
      }
    }
  }
}

bool StandardOrderBook::cancel_order(OrderId order_id) {
  auto it = order_lookup_.find(order_id);
  if (it == order_lookup_.end())
    return false;

  OrderLocation &loc = it->second;
  if (loc.is_bid) {
    auto &list = bids_[loc.price];
    list.erase(loc.it);
    if (list.empty())
      bids_.erase(loc.price);
  } else {
    auto &list = asks_[loc.price];
    list.erase(loc.it);
    if (list.empty())
      asks_.erase(loc.price);
  }

  order_lookup_.erase(it);
  return true;
}

std::pair<Price, Price> StandardOrderBook::get_top_of_book() const {
  Price best_bid = bids_.empty() ? 0 : bids_.begin()->first;
  Price best_ask = asks_.empty() ? 0 : asks_.begin()->first;
  return {best_bid, best_ask};
}

Quantity StandardOrderBook::get_volume_at_price(Price price) const {
  // Check bids
  auto bit = bids_.find(price);
  if (bit != bids_.end()) {
    Quantity total = 0;
    for (const auto &o : bit->second)
      total += o.quantity;
    return total;
  }

  // Check asks
  auto ait = asks_.find(price);
  if (ait != asks_.end()) {
    Quantity total = 0;
    for (const auto &o : ait->second)
      total += o.quantity;
    return total;
  }

  return 0;
}

} // namespace OmniTrade::Engine
