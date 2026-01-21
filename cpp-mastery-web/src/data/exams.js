export const exams = [
    {
        id: 1,
        title: "Custom Smart Pointer Implementation",
        difficulty: "Hard",
        topics: ["Memory Management", "Templates", "Operator Overloading"],
        description: `
Implement a simplified version of \`std::shared_ptr\` called \`SharedPtr\`.
It must support:
1. Reference counting (thread-safety is optional but a plus).
2. Copy constructor and assignment operator.
3. Move constructor and assignment operator.
4. Dereference (*) and arrow (->) operators.
5. A destructor that correctly frees memory when the count reaches zero.

**Constraint:** Do not use \`std::shared_ptr\` or \`std::unique_ptr\` internally.
    `,
        starterCode: `template <typename T>
class SharedPtr {
private:
    T* ptr;
    int* refCount;

public:
    explicit SharedPtr(T* p = nullptr) {
        // TODO: Initialize
    }

    ~SharedPtr() {
        // TODO: Cleanup
    }

    // TODO: Implement Copy Semantics
    // TODO: Implement Move Semantics
    // TODO: Implement Operators
};`,
        solutionCode: `template <typename T>
class SharedPtr {
private:
    T* ptr;
    int* refCount;

    void release() {
        if (refCount) {
            (*refCount)--;
            if (*refCount == 0) {
                delete ptr;
                delete refCount;
                std::cout << "Resource destroyed\\n";
            }
        }
    }

public:
    explicit SharedPtr(T* p = nullptr) : ptr(p), refCount(p ? new int(1) : nullptr) {}

    ~SharedPtr() {
        release();
    }

    // Copy Constructor
    SharedPtr(const SharedPtr& other) : ptr(other.ptr), refCount(other.refCount) {
        if (refCount) {
            (*refCount)++;
        }
    }

    // Copy Assignment
    SharedPtr& operator=(const SharedPtr& other) {
        if (this != &other) {
            release();
            ptr = other.ptr;
            refCount = other.refCount;
            if (refCount) {
                (*refCount)++;
            }
        }
        return *this;
    }

    // Move Constructor
    SharedPtr(SharedPtr&& other) noexcept : ptr(other.ptr), refCount(other.refCount) {
        other.ptr = nullptr;
        other.refCount = nullptr;
    }

    // Move Assignment
    SharedPtr& operator=(SharedPtr&& other) noexcept {
        if (this != &other) {
            release();
            ptr = other.ptr;
            refCount = other.refCount;
            other.ptr = nullptr;
            other.refCount = nullptr;
        }
        return *this;
    }

    T& operator*() const { return *ptr; }
    T* operator->() const { return ptr; }
    
    int use_count() const { return refCount ? *refCount : 0; }
};`,
        explanation: `
### Key Concepts
1. **Reference Counting**: We use a heap-allocated \`int*\` shared among all instances pointing to the same object.
2. **Rule of Five**: We implemented Destructor, Copy Ctor, Copy Assign, Move Ctor, and Move Assign.
3. **Self-Assignment Check**: Crucial in assignment operators (\`if (this != &other)\`) to avoid premature deletion.
4. **Move Semantics**: We "steal" the pointer and set the source to \`nullptr\`, avoiding incrementing/decrementing the count.
5. **Memory Safety**: The destructor only deletes the resource when \`refCount\` hits zero.
    `
    },
    {
        id: 2,
        title: "Thread-Safe Queue (Producer-Consumer)",
        difficulty: "Expert",
        topics: ["Concurrency", "Synchronization", "Templates"],
        description: `
Implement a thread-safe queue \`SafeQueue<T>\` that can be used in a producer-consumer context.
Requirements:
1. \`push(T value)\`: Adds an element.
2. \`bool try_pop(T& value)\`: Non-blocking pop. Returns false if empty.
3. \`void wait_and_pop(T& value)\`: Blocking pop. Waits until an element is available.
4. Use \`std::mutex\` and \`std::condition_variable\`.

**Challenge:** Ensure no race conditions occur and that waiting threads are notified correctly.
    `,
        starterCode: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class SafeQueue {
private:
    std::queue<T> q;
    // TODO: Add synchronization primitives

public:
    void push(T value) {
        // TODO
    }

    bool try_pop(T& value) {
        // TODO
        return false;
    }

    void wait_and_pop(T& value) {
        // TODO
    }
};`,
        solutionCode: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class SafeQueue {
private:
    std::queue<T> q;
    mutable std::mutex mtx;
    std::condition_variable cv;

public:
    void push(T value) {
        std::lock_guard<std::mutex> lock(mtx);
        q.push(std::move(value));
        cv.notify_one(); // Notify a waiting consumer
    }

    bool try_pop(T& value) {
        std::lock_guard<std::mutex> lock(mtx);
        if (q.empty()) {
            return false;
        }
        value = std::move(q.front());
        q.pop();
        return true;
    }

    void wait_and_pop(T& value) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this] { return !q.empty(); }); // Handle spurious wakeups
        value = std::move(q.front());
        q.pop();
    }
    
    bool empty() const {
        std::lock_guard<std::mutex> lock(mtx);
        return q.empty();
    }
};`,
        explanation: `
### Key Concepts
1. **Mutex Protection**: All accesses to the internal \`std::queue\` must be protected by \`std::mutex\`.
2. **Condition Variable**: Used in \`wait_and_pop\` to sleep the thread until data is available.
3. **Spurious Wakeups**: The \`cv.wait(lock, predicate)\` loop handles cases where the OS wakes the thread without a signal.
4. **Lock Granularity**: \`push\` uses \`lock_guard\` (RAII) and notifies *after* the data is pushed.
5. **Move Semantics**: We use \`std::move\` to efficiently transfer ownership of data out of the queue.
    `
    },
    {
        id: 3,
        title: "Small String Optimization (SSO) Simulation",
        difficulty: "Expert",
        topics: ["Memory Layout", "Unions", "Optimization"],
        description: `
Simulate a String class that uses **Small String Optimization (SSO)**.
- If the string length is < 16 bytes, store it directly in a local buffer (stack).
- If the string is longer, allocate memory on the heap.
- Implement the constructor and destructor to handle both cases.

**Goal:** Minimize heap allocations for small strings.
    `,
        starterCode: `class SSOString {
private:
    static const size_t SSO_THRESHOLD = 15;
    
    // TODO: Define a union or structure to hold either:
    // 1. A local buffer (char buf[16])
    // 2. A pointer, size, and capacity for heap storage

public:
    SSOString(const char* s) {
        // TODO: Implement logic
    }

    ~SSOString() {
        // TODO: Free memory ONLY if allocated on heap
    }
    
    const char* c_str() const {
        // TODO: Return correct pointer
        return nullptr;
    }
};`,
        solutionCode: `class SSOString {
private:
    static const size_t SSO_THRESHOLD = 15;
    size_t size;
    
    union {
        char localBuf[SSO_THRESHOLD + 1];
        struct {
            char* ptr;
            size_t capacity;
        } heap;
    };

    bool isLocal() const {
        return size <= SSO_THRESHOLD;
    }

public:
    SSOString(const char* s) {
        size = 0;
        while (s[size]) size++; // strlen

        if (isLocal()) {
            for (size_t i = 0; i < size; ++i) localBuf[i] = s[i];
            localBuf[size] = '\\0';
        } else {
            heap.capacity = size;
            heap.ptr = new char[size + 1];
            for (size_t i = 0; i < size; ++i) heap.ptr[i] = s[i];
            heap.ptr[size] = '\\0';
        }
    }

    ~SSOString() {
        if (!isLocal()) {
            delete[] heap.ptr;
        }
    }

    const char* c_str() const {
        return isLocal() ? localBuf : heap.ptr;
    }
};`,
        explanation: `
### Key Concepts
1. **Union**: Allows sharing memory between the local buffer and the heap structure. This saves space (sizeof(SSOString) remains small).
2. **Data Locality**: Small strings stay on the stack, improving cache locality and avoiding \`new/delete\` overhead.
3. **Conditional Destructor**: We only call \`delete[]\` if we are in "Heap Mode".
4. **Performance**: This optimization is used in modern \`std::string\` implementations (libc++, libstdc++) to speed up common string operations.
    `
    }
];
