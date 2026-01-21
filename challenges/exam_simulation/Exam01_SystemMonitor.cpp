/**
 * ======================================================================================
 * EXAMEN 1: SYSTEM MONITOR (45 Minutos)
 * ======================================================================================
 *
 * OBJETIVO:
 * Diseñar e implementar un sistema de monitoreo de recursos simple pero
 * robusto. Este ejercicio evalúa tu conocimiento en:
 * 1. RAII (Resource Acquisition Is Initialization)
 * 2. Singleton Pattern (Thread-safe)
 * 3. STL Containers
 * 4. Manejo de errores
 *
 * REQUISITOS:
 *
 * 1. Clase `Resource`:
 *    - Representa un recurso del sistema (ej. archivo, socket, memoria).
 *    - Debe tener un ID único y un nombre.
 *    - Debe imprimir en consola cuando se adquiere (constructor) y libera
 * (destructor).
 *    - NO debe ser copiable (delete copy constructor/assignment).
 *    - DEBE ser movible (implementar move constructor/assignment).
 *
 * 2. Clase `SystemMonitor` (Singleton):
 *    - Debe ser un Singleton Thread-Safe (Meyers Singleton recomendado).
 *    - Mantiene un registro de todos los `Resource` activos actualmente.
 *    - Métodos:
 *      - `void registerResource(const Resource& res)`: Registra un recurso.
 *      - `void unregisterResource(int resourceId)`: Elimina un recurso del
 * registro.
 *      - `void printStatus()`: Imprime cuántos recursos hay activos y sus
 * nombres.
 *
 * 3. `main`:
 *    - Simular la creación y destrucción de recursos en diferentes scopes.
 *    - Demostrar que el Monitor rastrea correctamente los recursos.
 *    - Demostrar que los recursos se liberan automáticamente al salir del
 * scope.
 *
 * PUNTOS EXTRA:
 * - Usar `std::unique_ptr` o `std::shared_ptr` donde sea apropiado.
 * - Hacer que `SystemMonitor` sea thread-safe usando `std::mutex`.
 *
 * ======================================================================================
 */

#include <algorithm>
#include <iostream>
#include <memory>
#include <mutex>
#include <string>
#include <vector>

// TODO: Implementar clase Resource

// TODO: Implementar clase SystemMonitor (Singleton)

int main() {
  std::cout << "Iniciando Examen 1: System Monitor..." << std::endl;

  // TODO: Escribir código de prueba aquí
  // 1. Obtener instancia del monitor
  // 2. Crear recursos en diferentes scopes
  // 3. Verificar output

  return 0;
}
