export const longExams = [
    {
        id: 'easy',
        title: 'Nivel 1: Fundamentos de C++',
        difficulty: 'Easy',
        duration: '40 min',
        description: '20 preguntas para validar tus bases: Sintaxis, Memoria Básica, Punteros y Clases.',
        parts: [
            // --- BLOQUE 1: TEORÍA BÁSICA ---
            {
                type: 'theory',
                question: '¿Cuál es el tipo de retorno obligatorio de la función `main` en C++ estándar?',
                options: ['void', 'int', 'float', 'bool'],
                correctAnswer: 1,
                explanation: 'El estándar de C++ dicta que `main` debe retornar `int`. Un retorno de 0 indica éxito.'
            },
            {
                type: 'theory',
                question: '¿Cuál es la diferencia principal entre `float` y `double`?',
                options: ['No hay diferencia', 'Float tiene más precisión', 'Double tiene doble precisión (usualmente 64 bits) que Float (32 bits)', 'Double es para enteros grandes'],
                correctAnswer: 2,
                explanation: '`double` ofrece mayor precisión y rango que `float` al usar más bits (64 vs 32 en arquitecturas típicas).'
            },
            {
                type: 'theory',
                question: '¿Qué palabra clave se usa para declarar una variable que no puede ser modificada después de su inicialización?',
                options: ['static', 'volatile', 'const', 'mutable'],
                correctAnswer: 2,
                explanation: '`const` asegura que el valor de la variable no cambie a lo largo de su vida útil.'
            },
            {
                type: 'theory',
                question: '¿Qué sucede si intentas acceder al índice 10 de un array de tamaño 5 (`int arr[5]`)?',
                options: ['Lanza una excepción', 'Retorna 0', 'Undefined Behavior (Comportamiento Indefinido)', 'Error de compilación'],
                correctAnswer: 2,
                explanation: 'C++ no realiza chequeo de límites en arrays crudos. Acceder fuera de los límites es Undefined Behavior y puede causar crashes o corrupción de datos.'
            },
            {
                type: 'theory',
                question: '¿Cuál es la diferencia entre `++i` y `i++`?',
                options: ['Son idénticos', '++i incrementa y luego retorna el valor; i++ retorna el valor original y luego incrementa', 'i++ es más rápido', '++i es solo para bucles for'],
                correctAnswer: 1,
                explanation: '`++i` (pre-incremento) incrementa y devuelve el nuevo valor. `i++` (post-incremento) devuelve una copia del valor antiguo y luego incrementa.'
            },

            // --- BLOQUE 2: PUNTEROS Y REFERENCIAS ---
            {
                type: 'theory',
                question: '¿Qué almacena un puntero?',
                options: ['El valor de una variable', 'La dirección de memoria de una variable', 'Una referencia a un objeto', 'Un array'],
                correctAnswer: 1,
                explanation: 'Un puntero es una variable que almacena la dirección de memoria de otra variable.'
            },
            {
                type: 'theory',
                question: '¿Puede una referencia (`int&`) ser nula?',
                options: ['Sí, igual que un puntero', 'No, debe inicializarse al declararse y referir a un objeto válido', 'Solo si es const', 'Depende del compilador'],
                correctAnswer: 1,
                explanation: 'Las referencias deben estar ligadas a un objeto válido desde su creación y no pueden ser nulas.'
            },
            {
                type: 'code',
                question: 'Corrige este código para que `ptr` apunte a `val`.',
                starterCode: `int val = 10;
int* ptr = val; // Error`,
                solutionCode: `int val = 10;
int* ptr = &val; // Usamos el operador & (address-of)`,
                explanation: 'Para asignar la dirección de una variable a un puntero, se usa el operador `&`.'
            },
            {
                type: 'open',
                question: 'Explica la diferencia entre pasar por valor y pasar por referencia en una función.',
                solution: 'Pasar por valor copia el dato; cambios dentro de la función no afectan al original. Pasar por referencia pasa la dirección/alias; cambios dentro de la función afectan al original y evita copias costosas.',
                explanation: 'Es fundamental para la performance y para funciones que necesitan modificar sus argumentos.'
            },
            {
                type: 'code',
                question: 'Implementa una función `swap` que intercambie dos enteros usando punteros.',
                starterCode: `void swap(int* a, int* b) {
    // TODO
}`,
                solutionCode: `void swap(int* a, int* b) {
    if (a && b) {
        int temp = *a;
        *a = *b;
        *b = temp;
    }
}`,
                explanation: 'Dereferenciamos los punteros con `*` para acceder y modificar los valores reales.'
            },

            // --- BLOQUE 3: ESTRUCTURAS DE CONTROL Y FUNCIONES ---
            {
                type: 'code',
                question: 'Escribe un bucle `for` que sume los números del 1 al 100.',
                starterCode: `int sum = 0;
// TODO: Bucle for`,
                solutionCode: `int sum = 0;
for (int i = 1; i <= 100; ++i) {
    sum += i;
}`,
                explanation: 'Un bucle estándar desde 1 hasta 100 inclusive.'
            },
            {
                type: 'code',
                question: 'Crea una función que reciba un `std::string` y retorne `true` si está vacío.',
                starterCode: `#include <string>
// TODO: Función isEmpty`,
                solutionCode: `#include <string>
bool isEmpty(const std::string& s) {
    return s.empty();
}`,
                explanation: 'Usamos `const string&` para evitar copias innecesarias y el método `.empty()`.'
            },
            {
                type: 'theory',
                question: '¿Qué hace la sentencia `break` en un bucle?',
                options: ['Reinicia el bucle', 'Salta a la siguiente iteración', 'Termina el bucle inmediatamente', 'Termina el programa'],
                correctAnswer: 2,
                explanation: '`break` sale del bucle más interno inmediatamente.'
            },
            {
                type: 'theory',
                question: '¿Qué es un "header file" (.h / .hpp)?',
                options: ['Donde va el código compilado', 'Donde se declaran funciones y clases para compartir entre archivos', 'Un archivo de texto', 'Una librería dinámica'],
                correctAnswer: 1,
                explanation: 'Los headers permiten declarar interfaces (declaraciones) separadas de la implementación (.cpp), facilitando la compilación modular.'
            },
            {
                type: 'open',
                question: '¿Por qué es mala práctica usar `using namespace std;` en un archivo de cabecera (.h)?',
                solution: 'Porque contamina el namespace global de cualquier archivo que incluya ese header, pudiendo causar conflictos de nombres (name clashes) difíciles de depurar.',
                explanation: 'Es mejor usar `std::` explícitamente o `using` dentro de scopes limitados (funciones o .cpp).'
            },

            // --- BLOQUE 4: CLASES Y OBJETOS ---
            {
                type: 'theory',
                question: 'En una `class`, ¿cuál es la visibilidad por defecto de los miembros?',
                options: ['public', 'private', 'protected', 'friend'],
                correctAnswer: 1,
                explanation: 'En `class` es `private` por defecto. En `struct` es `public`.'
            },
            {
                type: 'code',
                question: 'Define una clase `Person` con un constructor que inicialice `name` y `age`.',
                starterCode: `#include <string>
class Person {
    std::string name;
    int age;
public:
    // TODO: Constructor
};`,
                solutionCode: `#include <string>
class Person {
    std::string name;
    int age;
public:
    Person(std::string n, int a) : name(n), age(a) {}
};`,
                explanation: 'Usamos la lista de inicialización de miembros `: name(n), age(a)` que es más eficiente.'
            },
            {
                type: 'theory',
                question: '¿Qué es el destructor de una clase?',
                options: ['Una función que borra el código', 'Un método especial llamado cuando el objeto sale de scope', 'Un método para liberar memoria manualmente', 'No existe en C++'],
                correctAnswer: 1,
                explanation: 'El destructor (`~Clase()`) se invoca automáticamente para realizar limpieza cuando el objeto es destruido.'
            },
            {
                type: 'code',
                question: 'Añade un método `const` llamado `getName` que retorne el nombre.',
                starterCode: `class Person {
    std::string name;
public:
    // TODO: getName
};`,
                solutionCode: `class Person {
    std::string name;
public:
    std::string getName() const {
        return name;
    }
};`,
                explanation: 'Marcar el método como `const` promete que no modificará el estado del objeto.'
            },
            {
                type: 'open',
                question: 'Explica qué es la encapsulación y por qué es útil.',
                solution: 'Es el principio de ocultar los detalles internos de implementación (private) y exponer solo una interfaz segura (public). Protege la integridad de los datos y permite cambiar la implementación sin romper el código que usa la clase.',
                explanation: 'Permite mantener invariantes (ej. age nunca es negativo) controlando el acceso a los datos.'
            }
        ]
    },
    {
        id: 'medium',
        title: 'Nivel 2: C++ Moderno y OOD',
        difficulty: 'Medium',
        duration: '60 min',
        description: '20 preguntas sobre STL, RAII, Herencia, Polimorfismo y Smart Pointers.',
        parts: [
            // --- BLOQUE 1: STL (Standard Template Library) ---
            {
                type: 'theory',
                question: '¿Cuál es la complejidad temporal promedio de búsqueda en `std::vector` vs `std::map`?',
                options: ['O(1) vs O(n)', 'O(n) vs O(log n)', 'O(log n) vs O(1)', 'Ambos O(n)'],
                correctAnswer: 1,
                explanation: 'En `vector` (desordenado) es búsqueda lineal O(n). En `map` (árbol balanceado) es O(log n).'
            },
            {
                type: 'code',
                question: 'Usa `std::sort` con una lambda para ordenar un vector de enteros en orden descendente.',
                starterCode: `#include <vector>
#include <algorithm>
void sortDesc(std::vector<int>& v) {
    // TODO
}`,
                solutionCode: `#include <vector>
#include <algorithm>
void sortDesc(std::vector<int>& v) {
    std::sort(v.begin(), v.end(), [](int a, int b) {
        return a > b;
    });
}`,
                explanation: 'La lambda `[](int a, int b) { return a > b; }` define el criterio de comparación.'
            },
            {
                type: 'theory',
                question: '¿Qué contenedor usarías si necesitas inserciones rápidas al principio y al final?',
                options: ['std::vector', 'std::deque', 'std::stack', 'std::array'],
                correctAnswer: 1,
                explanation: '`std::deque` (Double Ended Queue) está optimizado para inserciones en ambos extremos.'
            },
            {
                type: 'code',
                question: 'Elimina los duplicados de un `std::vector<int>` usando `std::unique` y `erase`.',
                starterCode: `void removeDups(std::vector<int>& v) {
    std::sort(v.begin(), v.end());
    // TODO
}`,
                solutionCode: `void removeDups(std::vector<int>& v) {
    std::sort(v.begin(), v.end());
    auto last = std::unique(v.begin(), v.end());
    v.erase(last, v.end());
}`,
                explanation: 'Este es el idioma "Erase-Remove". `unique` mueve los duplicados al final y retorna un iterador al nuevo final lógico; `erase` borra físicamente.'
            },
            {
                type: 'open',
                question: '¿Por qué `std::vector` suele ser más rápido que `std::list` incluso para inserciones en el medio en hardware moderno?',
                solution: 'Por la localidad de caché. Vector almacena datos contiguos, lo que aprovecha las líneas de caché de la CPU. List son nodos dispersos que causan cache misses.',
                explanation: 'La CPU prefiere datos contiguos. El overhead de recorrer punteros en una lista suele superar el costo de mover elementos en un vector pequeño/mediano.'
            },

            // --- BLOQUE 2: SMART POINTERS Y RAII ---
            {
                type: 'theory',
                question: '¿Qué smart pointer modela propiedad exclusiva?',
                options: ['std::shared_ptr', 'std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr'],
                correctAnswer: 2,
                explanation: '`std::unique_ptr` no se puede copiar, solo mover. Garantiza que solo hay un dueño.'
            },
            {
                type: 'theory',
                question: '¿Para qué sirve `std::weak_ptr`?',
                options: ['Para punteros que no importan', 'Para romper referencias circulares en shared_ptr', 'Es una versión antigua de unique_ptr', 'Para punteros a constantes'],
                correctAnswer: 1,
                explanation: '`std::weak_ptr` observa un objeto gestionado por `shared_ptr` sin aumentar el contador de referencias, evitando ciclos que causarían memory leaks.'
            },
            {
                type: 'code',
                question: 'Crea un `unique_ptr` para un entero con valor 42 usando `std::make_unique`.',
                starterCode: `#include <memory>
void create() {
    // TODO
}`,
                solutionCode: `#include <memory>
void create() {
    auto ptr = std::make_unique<int>(42);
}`,
                explanation: '`make_unique` es la forma preferida (C++14) por seguridad (exception safety) y limpieza.'
            },
            {
                type: 'open',
                question: 'Explica el concepto de RAII y da un ejemplo que no sea memoria.',
                solution: 'RAII (Resource Acquisition Is Initialization) liga recursos al ciclo de vida de un objeto. Ejemplo: `std::lock_guard` adquiere un mutex en el constructor y lo libera en el destructor.',
                explanation: 'Garantiza liberación determinista. Otros ejemplos: Archivos (`fstream`), Sockets, Conexiones a BD.'
            },
            {
                type: 'code',
                question: 'Implementa una clase `FileHandler` simple que cierre el archivo automáticamente (RAII).',
                starterCode: `#include <cstdio>
class FileHandler {
    FILE* file;
public:
    FileHandler(const char* name) { file = fopen(name, "r"); }
    // TODO: Destructor
};`,
                solutionCode: `#include <cstdio>
class FileHandler {
    FILE* file;
public:
    FileHandler(const char* name) { file = fopen(name, "r"); }
    ~FileHandler() {
        if (file) fclose(file);
    }
};`,
                explanation: 'El destructor asegura que `fclose` se llame siempre que el objeto `FileHandler` se destruya.'
            },

            // --- BLOQUE 3: HERENCIA Y POLIMORFISMO ---
            {
                type: 'theory',
                question: '¿Qué palabra clave permite que una función sea sobreescrita (overridden) en una clase derivada?',
                options: ['static', 'virtual', 'inline', 'friend'],
                correctAnswer: 1,
                explanation: '`virtual` habilita el despacho dinámico (dynamic dispatch) necesario para el polimorfismo.'
            },
            {
                type: 'theory',
                question: '¿Por qué el destructor de una clase base debe ser virtual?',
                options: ['Para que compile', 'Para poder instanciarla', 'Para asegurar que se llame al destructor de la clase derivada al borrar por un puntero base', 'Es opcional'],
                correctAnswer: 2,
                explanation: 'Si borras `Base* b = new Derived();` y el destructor base no es virtual, solo se ejecuta el destructor base, causando leak de los recursos de Derived.'
            },
            {
                type: 'code',
                question: 'Implementa una clase `Shape` con método virtual puro `area`.',
                starterCode: `class Shape {
public:
    // TODO: Pure virtual area
};`,
                solutionCode: `class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() {} // Importante: Destructor virtual
};`,
                explanation: '`= 0` la hace puramente virtual, convirtiendo a `Shape` en una clase abstracta (interfaz).'
            },
            {
                type: 'code',
                question: 'Sobreescribe `area` en una clase `Circle`.',
                starterCode: `class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    // TODO: override area
};`,
                solutionCode: `class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override {
        return 3.14159 * r * r;
    }
};`,
                explanation: 'Usar `override` ayuda al compilador a verificar que realmente estamos sobreescribiendo.'
            },
            {
                type: 'open',
                question: '¿Qué es la "V-Table" (Virtual Table)?',
                solution: 'Es una tabla de punteros a funciones creada por el compilador para clases con métodos virtuales. Cada objeto tiene un puntero (vptr) a esta tabla, permitiendo resolver qué función llamar en tiempo de ejecución.',
                explanation: 'Es el mecanismo bajo el capó del polimorfismo dinámico. Añade un pequeño overhead de memoria y una indirección en la llamada.'
            },

            // --- BLOQUE 4: TEMPLATES Y EXCEPCIONES ---
            {
                type: 'code',
                question: 'Escribe una función template `max` que retorne el mayor de dos valores.',
                starterCode: `// TODO: Template max`,
                solutionCode: `template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}`,
                explanation: 'Permite usar la función con `int`, `float`, `double`, etc.'
            },
            {
                type: 'theory',
                question: '¿Qué es la especialización de templates?',
                options: ['Crear un template nuevo', 'Definir una implementación específica para un tipo de dato concreto', 'Borrar un template', 'Usar templates en clases'],
                correctAnswer: 1,
                explanation: 'Permite optimizar o cambiar el comportamiento para tipos específicos (ej. `vector<bool>`).'
            },
            {
                type: 'code',
                question: 'Lanza una excepción `std::runtime_error` si el argumento es negativo.',
                starterCode: `#include <stdexcept>
void check(int x) {
    // TODO
}`,
                solutionCode: `#include <stdexcept>
void check(int x) {
    if (x < 0) {
        throw std::runtime_error("Negative value");
    }
}`,
                explanation: 'Mecanismo estándar de reporte de errores en C++.'
            },
            {
                type: 'code',
                question: 'Captura la excepción anterior en un bloque try-catch.',
                starterCode: `void run() {
    // TODO
}`,
                solutionCode: `void run() {
    try {
        check(-1);
    } catch (const std::exception& e) {
        // Manejar error
    }
}`,
                explanation: 'Capturar por referencia `const std::exception&` es la buena práctica para evitar slicing.'
            },
            {
                type: 'open',
                question: '¿Qué significa "Exception Safety Guarantee"? Menciona los niveles.',
                solution: 'Garantías sobre el estado del programa si ocurre una excepción. Niveles: Basic (sin leaks, estado válido pero desconocido), Strong (transaccional, commit or rollback), No-throw (nunca falla).',
                explanation: 'Crucial para escribir código robusto, especialmente en librerías.'
            }
        ]
    },
    {
        id: 'hard',
        title: 'Nivel 3: Systems & Optimization',
        difficulty: 'Hard',
        duration: '90 min',
        description: '20 preguntas de nivel Experto: Concurrencia, Memoria Avanzada, Lock-free y Diseño de Sistemas.',
        parts: [
            // --- BLOQUE 1: MEMORIA AVANZADA ---
            {
                type: 'theory',
                question: '¿Qué es "Move Semantics" y qué problema resuelve?',
                options: ['Mover código de archivo', 'Transferir propiedad de recursos en lugar de copiar (performance)', 'Mover memoria al disco', 'Renombrar variables'],
                correctAnswer: 1,
                explanation: 'Evita copias profundas costosas (ej. copiar un vector gigante) transfiriendo los punteros internos del objeto temporal al nuevo objeto.'
            },
            {
                type: 'code',
                question: 'Implementa un Move Constructor para una clase `Buffer`.',
                starterCode: `class Buffer {
    int* data;
    size_t size;
public:
    // TODO: Move Constructor
};`,
                solutionCode: `class Buffer {
    int* data;
    size_t size;
public:
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
};`,
                explanation: 'Importante: 1. Robar recursos. 2. Dejar `other` en estado válido (null/0). 3. Marcar `noexcept`.'
            },
            {
                type: 'theory',
                question: '¿Qué es `std::forward` y cuándo se usa?',
                options: ['Para avanzar iteradores', 'Para Perfect Forwarding en templates', 'Para mover objetos', 'Para forward declaration'],
                correctAnswer: 1,
                explanation: 'Se usa en templates variádicos para preservar la categoría de valor (lvalue vs rvalue) de los argumentos al pasarlos a otra función.'
            },
            {
                type: 'open',
                question: 'Explica "Small String Optimization" (SSO).',
                solution: 'Optimización donde strings cortos se almacenan directamente en el objeto (stack) usando una unión, evitando asignación dinámica en el heap. Solo strings largos van al heap.',
                explanation: 'Mejora drásticamente la performance por localidad de caché y evitar `new/delete`.'
            },
            {
                type: 'code',
                question: 'Escribe un Custom Allocator mínimo (esqueleto) que herede de `std::allocator`.',
                starterCode: `template <typename T>
struct MyAlloc {
    // TODO: typedefs y allocate/deallocate
};`,
                solutionCode: `template <typename T>
struct MyAlloc {
    using value_type = T;
    T* allocate(size_t n) { return static_cast<T*>(::operator new(n * sizeof(T))); }
    void deallocate(T* p, size_t n) { ::operator delete(p); }
};`,
                explanation: 'Los allocators permiten controlar la estrategia de memoria de los contenedores STL (ej. usar un Pool o Stack memory).'
            },

            // --- BLOQUE 2: CONCURRENCIA Y MULTITHREADING ---
            {
                type: 'theory',
                question: '¿Qué es un "Data Race"?',
                options: ['Dos hilos compitiendo por velocidad', 'Acceso concurrente a la misma memoria donde al menos uno escribe, sin sincronización', 'Un deadlock', 'Condición de carrera lógica'],
                correctAnswer: 1,
                explanation: 'Es Undefined Behavior en C++. Se evita con Mutexes o Atomics.'
            },
            {
                type: 'code',
                question: 'Usa `std::lock_guard` para proteger una sección crítica.',
                starterCode: `#include <mutex>
std::mutex mtx;
void critical() {
    // TODO
}`,
                solutionCode: `#include <mutex>
std::mutex mtx;
void critical() {
    std::lock_guard<std::mutex> lock(mtx);
    // Sección segura
}`,
                explanation: 'RAII para mutexes. Desbloquea automáticamente al salir, incluso con excepciones.'
            },
            {
                type: 'theory',
                question: '¿Qué es un "Deadlock"?',
                options: ['Un hilo que termina', 'Dos o más hilos esperando recursos que el otro tiene, bloqueándose mutuamente', 'Un crash del sistema', 'Un lock roto'],
                correctAnswer: 1,
                explanation: 'Ciclo de espera. Hilo A tiene Lock 1, quiere Lock 2. Hilo B tiene Lock 2, quiere Lock 1.'
            },
            {
                type: 'code',
                question: 'Implementa un Spinlock usando `std::atomic_flag`.',
                starterCode: `#include <atomic>
class Spinlock {
    std::atomic_flag flag = ATOMIC_FLAG_INIT;
public:
    void lock() { /* TODO */ }
    void unlock() { /* TODO */ }
};`,
                solutionCode: `class Spinlock {
    std::atomic_flag flag = ATOMIC_FLAG_INIT;
public:
    void lock() {
        while (flag.test_and_set(std::memory_order_acquire));
    }
    void unlock() {
        flag.clear(std::memory_order_release);
    }
};`,
                explanation: 'Uso básico de atomics para sincronización de bajo nivel (busy wait).'
            },
            {
                type: 'open',
                question: 'Explica la diferencia entre `std::memory_order_relaxed` y `std::memory_order_seq_cst`.',
                solution: 'Relaxed solo garantiza atomicidad, no orden. Seq_cst (por defecto) garantiza un orden global total de operaciones visible para todos los hilos. Relaxed es más rápido pero más difícil de razonar.',
                explanation: 'Crucial en programación lock-free para optimizar performance en CPUs modernas.'
            },

            // --- BLOQUE 3: SISTEMAS Y BAJO NIVEL ---
            {
                type: 'theory',
                question: '¿Qué es "False Sharing"?',
                options: ['Compartir variables falsas', 'Hilos modificando variables independientes que residen en la misma línea de caché', 'Compartir memoria entre procesos', 'Error de linker'],
                correctAnswer: 1,
                explanation: 'Degrada el rendimiento porque los núcleos invalidan constantemente la línea de caché del otro ("ping-pong"). Se soluciona con padding/alineación.'
            },
            {
                type: 'code',
                question: 'Usa `alignas` para alinear una estructura a la línea de caché (64 bytes).',
                starterCode: `struct Node {
    int data;
    // TODO: Alinear
};`,
                solutionCode: `struct alignas(64) Node {
    int data;
};`,
                explanation: 'Evita False Sharing asegurando que cada Node ocupe su propia línea de caché.'
            },
            {
                type: 'theory',
                question: '¿Qué es `volatile` en C++?',
                options: ['Para concurrencia', 'Indica al compilador que no optimice lecturas/escrituras (ej. Memory Mapped I/O)', 'Variable rápida', 'Variable temporal'],
                correctAnswer: 1,
                explanation: 'NO sirve para concurrencia (no es atómico). Sirve para interactuar con hardware o memoria externa que cambia fuera del control del programa.'
            },
            {
                type: 'open',
                question: '¿Cómo funciona `mmap` (Memory Mapped Files)?',
                solution: 'Mapea un archivo o dispositivo directamente al espacio de direcciones virtual del proceso. Permite tratar archivos como arrays en memoria, delegando la carga/paginación al OS.',
                explanation: 'Muy eficiente para leer archivos grandes o IPC (memoria compartida).'
            },
            {
                type: 'code',
                question: 'Simula una operación SIMD conceptual (vectorización).',
                starterCode: `// Sumar 4 floats a la vez (pseudocódigo o intrínsecos)`,
                solutionCode: `// Ejemplo conceptual
void add4(float* a, float* b, float* res) {
    // En realidad usarías intrínsecos como _mm_add_ps
    for(int i=0; i<4; ++i) res[i] = a[i] + b[i]; 
    // El compilador auto-vectoriza esto a instrucciones SIMD
}`,
                explanation: 'Single Instruction, Multiple Data. Procesa múltiples datos en un solo ciclo de CPU.'
            },

            // --- BLOQUE 4: OPTIMIZACIÓN Y DISEÑO ---
            {
                type: 'theory',
                question: '¿Qué es SFINAE?',
                options: ['Substitution Failure Is Not An Error', 'Un error de compilación', 'Una librería', 'Un patrón de diseño'],
                correctAnswer: 0,
                explanation: 'Técnica de metaprogramación donde si un template falla al sustituir tipos, se descarta silenciosamente en lugar de dar error, permitiendo sobrecarga condicional.'
            },
            {
                type: 'code',
                question: 'Calcula el factorial en tiempo de compilación usando `constexpr`.',
                starterCode: `constexpr int factorial(int n) {
    // TODO
}`,
                solutionCode: `constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}`,
                explanation: 'Permite calcular constantes complejas durante la compilación, reduciendo tiempo de ejecución.'
            },
            {
                type: 'open',
                question: 'Diseña un Logger de baja latencia para HFT (High Frequency Trading).',
                solution: 'El hilo principal (hot path) solo debe escribir en un Ring Buffer lock-free (o con spinlock muy ligero). Un hilo secundario en background consume del buffer y escribe a disco/red. Nunca bloquear el hilo principal con I/O.',
                explanation: 'Separar la generación del evento de la persistencia es clave para latencia determinista.'
            },
            {
                type: 'theory',
                question: '¿Qué es Branch Prediction y cómo afecta el rendimiento?',
                options: ['Predicción del clima', 'La CPU adivina qué camino tomará un `if`. Si falla, debe vaciar el pipeline (costoso).', 'Optimización del compilador', 'No afecta'],
                correctAnswer: 1,
                explanation: 'Un fallo de predicción (branch misprediction) cuesta muchos ciclos. Ordenar datos o usar `likely/unlikely` ayuda.'
            },
            {
                type: 'code',
                question: 'Optimiza este bucle eliminando el condicional (Branchless programming).',
                starterCode: `int maxVal(int a, int b) {
    if (a > b) return a;
    else return b;
}`,
                solutionCode: `int maxVal(int a, int b) {
    // El compilador suele optimizar esto a instrucción CMOV (Conditional Move)
    return a > b ? a : b; 
    // Manualmente: return a * (a > b) + b * (b >= a);
}`,
                explanation: 'Eliminar saltos (jumps) mantiene lleno el pipeline de instrucciones.'
            }
        ]
    }
];
