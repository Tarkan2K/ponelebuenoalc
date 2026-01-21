# Module 3: Algorithms and Complexity

## The Matching Algorithm
The core of any exchange is the **Matching Engine**. It must follow strict rules:
1.  **Price Priority**: Better prices execute first. (Higher bids, Lower asks).
2.  **Time Priority**: At the same price, earlier orders execute first (FIFO).

## Data Structures
We used `std::map` and `std::list`.

### Why `std::map`?
- **Ordered**: Keys (Prices) are always sorted. `begin()` gives us the best price immediately.
- **Complexity**: Insertion/Search is O(log N).
- **Custom Comparators**:
    - Bids: `std::greater<Price>` (Descending: 100, 99, 98...)
    - Asks: `std::less<Price>` (Ascending: 101, 102, 103...)

### Why `std::list`?
- **Stable References**: Iterators to list elements remain valid even if we add/remove other elements. This is crucial for our `order_lookup_` map to support O(1) cancellation.
- **FIFO**: `push_back` and `pop_front` are O(1).

### Why `std::unordered_map` for Lookup?
- **Cancellation**: To cancel an order by ID, we need to find it. Searching the entire book is O(N).
- **Hash Map**: Gives us O(1) access to the exact location (iterator) of the order in the list.

## Performance Considerations
- **Cache Misses**: `std::list` and `std::map` are node-based. Nodes are allocated separately on the heap, causing cache misses.
- **Optimization**: A `std::vector`-based Flat Map or a pre-allocated array (using our `ArenaAllocator`) would be faster but harder to implement. This is a classic trade-off.
