// ============================================================================
// LECCIÓN 10: OPTIMIZACIÓN LOW-LATENCY (CACHE FRIENDLINESS)
// ============================================================================
//
// En HFT, cada nanosegundo cuenta.
// El mayor cuello de botella moderno no es la CPU, es la MEMORIA (RAM).
//
// La CPU lee memoria en bloques llamados "Cache Lines" (usualmente 64 bytes).
// Si lees datos contiguos (uno tras otro), es rapidísimo.
// Si saltas aleatoriamente por la memoria (Linked List, Punteros), es
// lentísimo.
//
// Vamos a demostrarlo.
// ============================================================================

#include <chrono>
#include <iostream>
#include <list>
#include <numeric>
#include <random>
#include <vector>

const int NUM_ELEMENTOS = 10000000; // 10 Millones

void test_vector() {
  std::cout << "--- TEST VECTOR (Memoria Contigua) ---" << std::endl;
  // Un vector guarda los datos uno al lado del otro en memoria.
  std::vector<int> vec(NUM_ELEMENTOS, 1);

  auto start = std::chrono::high_resolution_clock::now();

  long long suma = 0;
  for (int n : vec) {
    suma += n;
  }

  auto end = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> diff = end - start;

  std::cout << "Suma: " << suma << std::endl;
  std::cout << "Tiempo: " << diff.count() << " s" << std::endl;
}

void test_list() {
  std::cout << "\n--- TEST LIST (Nodos Dispersos) ---" << std::endl;
  // Una lista guarda cada nodo en un lugar aleatorio del Heap, unidos por
  // punteros. Esto causa muchos "Cache Misses".
  std::list<int> lista(NUM_ELEMENTOS, 1);

  auto start = std::chrono::high_resolution_clock::now();

  long long suma = 0;
  for (int n : lista) {
    suma += n;
  }

  auto end = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> diff = end - start;

  std::cout << "Suma: " << suma << std::endl;
  std::cout << "Tiempo: " << diff.count() << " s" << std::endl;
}

int main() {
  std::cout << "Comparando iteración de " << NUM_ELEMENTOS << " elementos.\n"
            << std::endl;

  test_vector();
  test_list();

  std::cout << "\nCONCLUSIÓN:" << std::endl;
  std::cout << "El vector debería ser MUCHO más rápido (10x - 50x)."
            << std::endl;
  std::cout
      << "Moraleja: Usa std::vector por defecto. Evita punteros si puedes."
      << std::endl;

  return 0;
}
