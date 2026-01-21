# Module 4: Concurrency and Systems

## Lock-Free Programming
In HFT, **Mutexes are evil**.
- A mutex puts a thread to sleep if it can't get the lock.
- Waking up takes microseconds (eternity).

### The Solution: Atomics
We use `std::atomic` and a **Ring Buffer** (Circular Buffer).
- **Producer** (Network Thread) writes to `tail`.
- **Consumer** (Matching Engine) reads from `head`.
- Since `head` and `tail` are modified by different threads, we only need atomic loads/stores, not complex CAS (Compare-And-Swap) loops for this SPSC (Single-Producer Single-Consumer) case.
- **Memory Ordering**: We use `memory_order_acquire` and `memory_order_release` to ensure the data is visible before the index update.

## System Programming: Epoll
We use Linux `epoll` instead of `select` or `poll`.
- **O(1)**: `epoll` tells us exactly which sockets are ready. `select` requires scanning all of them (O(N)).
- **Edge Triggered (EPOLLET)**: Notifies us only when state *changes* (e.g., data arrived). This is more efficient but requires careful non-blocking I/O handling.
- **Non-blocking I/O**: We set `O_NONBLOCK` so `read`/`write` never freeze the thread.
