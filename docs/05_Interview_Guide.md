# Guía de Entrevistas y Exámenes C++

Esta guía está diseñada para simular un proceso de entrevista técnica riguroso para roles de C++ (Systems, HFT, Game Dev).

## Estructura de la Entrevista

Una entrevista típica se divide en tres partes:

1.  **Conceptos Teóricos (15-20 min)**: Preguntas profundas sobre el lenguaje y sistemas.
2.  **Live Coding / System Design (45-60 min)**: Resolver un problema complejo en tiempo real.
3.  **Revisión y Optimización (10-15 min)**: Analizar complejidad (Big O), memoria y posibles mejoras.

## Banco de Preguntas (Teoría)

### Gestión de Memoria
*   ¿Cuál es la diferencia exacta entre `std::unique_ptr` y `std::shared_ptr` a nivel de implementación? (Control block, overhead).
*   Explica el concepto de RAII y cómo previene memory leaks.
*   ¿Qué es la fragmentación de memoria y cómo un `Pool Allocator` ayuda a mitigarla?
*   ¿Cuándo usarías memoria en el Stack vs Heap?

### Object-Oriented Design (OOD)
*   ¿Qué es el "Diamond Problem" en herencia múltiple y cómo lo soluciona la herencia virtual?
*   Explica el polimorfismo en tiempo de compilación (Templates) vs tiempo de ejecución (Virtual functions). Ventajas y desventajas de cada uno (vtable overhead).
*   ¿Qué significa que un destructor sea virtual? ¿Por qué es importante?

### Concurrencia y Sistemas
*   Diferencia entre Proceso y Hilo.
*   ¿Qué es un "Race Condition" y cómo se evita? (Mutex, Atomics).
*   Explica el modelo de memoria de C++ (Memory Order: relaxed, acquire, release).
*   ¿Qué es un Deadlock y cuáles son las condiciones necesarias para que ocurra?

## Simulaciones de Examen (Coding Challenges)

Los exámenes se realizan en el directorio `challenges/exam_simulation`.

### Examen 1: System Monitor (45 min)
**Objetivo**: Crear una clase `SystemMonitor` que rastree el uso de "recursos" simulados.
**Requisitos**:
*   Uso de RAII para gestión de recursos.
*   Singleton thread-safe para el logger.
*   Uso de STL containers eficientes.

### Examen 2: Thread Pool (60 min)
**Objetivo**: Implementar un Thread Pool básico.
**Requisitos**:
*   Cola de tareas thread-safe.
*   Workers que consumen tareas.
*   Sincronización correcta (condition variables).
*   Graceful shutdown.

## Rúbrica de Evaluación

| Criterio | Junior | Mid-Level | Senior |
| :--- | :--- | :--- | :--- |
| **Correctitud** | Funciona casos base | Maneja edge cases | Maneja errores robustamente |
| **Memoria** | Algunos leaks | Sin leaks (valgrind) | Optimizado (moves, no copias) |
| **Estilo** | Inconsistente | Limpio, legible | Idiomático (Modern C++) |
| **Concurrencia** | No aplica / Errores | Básico (mutex) | Lock-free / Granularidad fina |
