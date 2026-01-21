# Module 1: Memory Management

## The Problem with `new` and `malloc`
In high-frequency trading (HFT) or game engines, calling `new` or `malloc` is too slow because:
1.  **Syscalls**: It may trigger a context switch to the kernel.
2.  **Fragmentation**: It searches for a free block in the heap, which takes variable time.
3.  **Cache Misses**: Objects are scattered across memory.

## The Solution: Arena Allocation
An **Arena Allocator** (or Linear Allocator) solves this by:
1.  **Pre-allocating** a huge chunk of contiguous memory at startup.
2.  **Allocating** by simply moving a pointer forward. This is an O(1) operation.
3.  **Cache Locality**: Objects allocated sequentially sit next to each other in RAM, improving CPU cache hits.

## Implementation Details
Our `ArenaAllocator` class:
- Takes a size in bytes.
- Uses `std::align` to ensure hardware alignment requirements are met (crucial for SIMD and preventing crashes).
- `reset()` simply moves the pointer back to 0. It does **not** call destructors. This is intended for "Plain Old Data" (POD) types or short-lived frames where we don't care about destruction.

## Interview Key Points
- **Stack vs Heap**: Stack is fast (pointer move), Heap is slow (search). Arena makes the Heap act like a Stack.
- **Alignment**: Accessing unaligned memory can be slow or crash on some architectures (ARM).
- **Fragmentation**: Standard allocators suffer from external fragmentation. Arenas do not (until reset).
