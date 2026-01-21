# Module 2: OOD and Data Layout

## Data-Oriented Design vs Object-Oriented Design
In high-performance C++, "Everything is an Object" can hurt performance. We mix **OOD** (interfaces) with **Data-Oriented Design** (struct layout).

## Struct Layout & Padding
CPUs fetch memory in **Cache Lines** (typically 64 bytes).
- If your struct is 33 bytes, an array of them will straddle cache lines, causing double fetches.
- We padded our `Order` struct to exactly **32 bytes**.
- This means 2 Orders fit exactly in 1 Cache Line.

```cpp
struct Order {
    uint64_t id;      // 8 bytes
    uint64_t price;   // 8 bytes
    uint64_t quantity;// 8 bytes
    uint8_t side;     // 1 byte
    uint8_t type;     // 1 byte
    uint8_t padding[6]; // 6 bytes -> Total 32
};
```

## Polymorphism
We use an abstract base class `IOrderBook`.
- **Pros**: Decouples the interface from the implementation (e.g., `MapOrderBook` vs `VectorOrderBook`).
- **Cons**: Virtual function calls have a small overhead (vtable lookup). In extreme HFT, we might use CRTP (Curiously Recurring Template Pattern) to avoid this, but for this level, `virtual` is acceptable and cleaner.
