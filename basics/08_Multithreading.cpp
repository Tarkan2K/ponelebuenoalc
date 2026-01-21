// ============================================================================
// LECCIÓN 08: MULTITHREADING Y RACE CONDITIONS
// ============================================================================
//
// Bienvenido al nivel SENIOR.
// Aquí las cosas ocurren en paralelo.
//
// PROBLEMA: Si dos hilos tocan la misma variable a la vez, ocurre un DESASTRE.
// Esto se llama "Race Condition" (Condición de Carrera).
//
// SOLUCIÓN: Mutex (Mutual Exclusion). Un candado que solo un hilo puede tener.
// ============================================================================

#include <chrono>
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

int contador_compartido = 0;
std::mutex candado; // El guardián del contador

// Función que incrementa el contador 1000 veces
void incrementar(int id, bool usar_candado) {
  for (int i = 0; i < 1000; ++i) {
    if (usar_candado) {
      candado.lock(); // Pido permiso
      contador_compartido++;
      candado.unlock(); // Libero permiso
    } else {
      // SIN CANDADO: ¡PELIGRO!
      // Leer, sumar y guardar no es atómico. Otro hilo puede interrumpir.
      contador_compartido++;

      // Simulamos un poco de carga para provocar el fallo más fácilmente
      if (i % 100 == 0)
        std::this_thread::yield();
    }
  }
  // std::cout << "Hilo " << id << " terminó." << std::endl;
}

void correr_prueba(bool segura) {
  contador_compartido = 0;
  std::vector<std::thread> hilos;

  std::cout << "Lanzando 10 hilos (Cada uno suma 1000)..." << std::endl;
  std::cout << "Modo: "
            << (segura ? "SEGURO (Con Mutex)" : "INSEGURO (Sin Mutex)")
            << std::endl;

  for (int i = 0; i < 10; ++i) {
    hilos.emplace_back(incrementar, i, segura);
  }

  // Esperar a que todos terminen
  for (auto &t : hilos) {
    t.join();
  }

  std::cout << "Resultado Final: " << contador_compartido
            << " (Esperado: 10000)" << std::endl;

  if (contador_compartido == 10000) {
    std::cout << "✅ ¡CORRECTO!" << std::endl;
  } else {
    std::cout << "❌ ¡FALLO! (Race Condition detectada)" << std::endl;
  }
  std::cout << "--------------------------------------------------"
            << std::endl;
}

int main() {
  std::cout << "=== DEMOSTRACIÓN DE RACE CONDITIONS ===" << std::endl;

  // 1. Prueba INSEGURA
  correr_prueba(false);

  // 2. Prueba SEGURA
  correr_prueba(true);

  return 0;
}
