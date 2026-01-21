/**
 * ======================================================================================
 * EXAMEN 2: THREAD POOL (60 Minutos)
 * ======================================================================================
 *
 * OBJETIVO:
 * Implementar un Thread Pool básico para ejecutar tareas de forma concurrente.
 * Este ejercicio evalúa tu conocimiento en:
 * 1. `std::thread` y gestión de hilos.
 * 2. `std::mutex`, `std::unique_lock` y `std::condition_variable`.
 * 3. Funciones Lambda y `std::function`.
 * 4. Sincronización y prevención de Race Conditions.
 *
 * REQUISITOS:
 *
 * 1. Clase `ThreadPool`:
 *    - Constructor: Recibe el número de hilos a crear.
 *    - Destructor: Debe detener todos los hilos correctamente (join).
 *    - Método `enqueue(std::function<void()> task)`: Añade una tarea a la cola.
 *
 * 2. Comportamiento:
 *    - Los hilos deben estar esperando (dormidos) cuando no hay tareas.
 *    - Cuando llega una tarea, un hilo debe despertar y ejecutarla.
 *    - Debe ser Thread-Safe: Múltiples hilos pueden llamar a `enqueue`
 * simultáneamente.
 *
 * 3. `main`:
 *    - Crear un ThreadPool con 4 hilos.
 *    - Enviar 20 tareas que impriman su ID y el ID del hilo que las ejecuta.
 *    - Simular trabajo con `std::this_thread::sleep_for`.
 *
 * PUNTOS EXTRA:
 * - Implementar un mecanismo de `shutdown` explícito para que los hilos
 * terminen.
 * - Usar `std::future` para retornar valores de las tareas (Avanzado).
 *
 * ======================================================================================
 */

#include <atomic>
#include <condition_variable>
#include <functional>
#include <iostream>
#include <mutex>
#include <queue>
#include <thread>
#include <vector>

class ThreadPool {
public:
  ThreadPool(size_t numThreads);
  ~ThreadPool();

  void enqueue(std::function<void()> task);

private:
  // TODO: Definir miembros privados (vector de threads, cola de tareas, mutex,
  // cv, flag de stop)
};

// TODO: Implementar métodos de ThreadPool

int main() {
  std::cout << "Iniciando Examen 2: Thread Pool..." << std::endl;

  // TODO: Escribir código de prueba aquí

  return 0;
}
