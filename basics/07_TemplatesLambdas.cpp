// ============================================================================
// LECCIÓN 07: TEMPLATES Y LAMBDAS
// ============================================================================
//
// 1. TEMPLATES: Permiten escribir código que funciona con CUALQUIER tipo de
// dato.
//    Es como decir "haz esto con T", donde T puede ser int, double, string...
//
// 2. LAMBDAS: Son funciones anónimas pequeñas que se escriben dentro de otras
// funciones.
//    Muy usadas en C++ moderno para callbacks o algoritmos.
// ============================================================================

#include <algorithm>
#include <iostream>
#include <vector>

// --- TEMPLATES ---

// Función genérica para imprimir cualquier cosa
template <typename T> void imprimir(const T &valor) {
  std::cout << "[Generico] " << valor << std::endl;
}

// Clase genérica: Caja que puede guardar cualquier cosa
template <typename T> class Caja {
  T contenido;

public:
  Caja(T item) : contenido(item) {}
  T obtener() { return contenido; }
};

// --- MAIN ---

int main() {
  std::cout << "=== TEMPLATES ===" << std::endl;
  imprimir(123);          // T es int
  imprimir(3.1416);       // T es double
  imprimir("Hola Mundo"); // T es const char*

  Caja<int> cajaInt(42);
  Caja<std::string> cajaTexto("Secreto");

  std::cout << "Caja Int: " << cajaInt.obtener() << std::endl;
  std::cout << "Caja Texto: " << cajaTexto.obtener() << std::endl;

  std::cout << "\n=== LAMBDAS ===" << std::endl;

  std::vector<int> numeros = {1, 5, 2, 8, 3};

  // Queremos contar cuántos números son mayores a 3.
  // Usamos std::count_if con una LAMBDA.
  // Sintaxis: [](parametros) { cuerpo }

  int umbral = 3;

  // [umbral] es la "captura". Permite usar variables de fuera dentro de la
  // lambda.
  int cantidad = std::count_if(numeros.begin(), numeros.end(),
                               [umbral](int n) { return n > umbral; });

  std::cout << "Números mayores a " << umbral << ": " << cantidad << std::endl;

  // Otra lambda para imprimir
  auto imprimir_bonito = [](int n) { std::cout << "-> " << n << std::endl; };

  std::cout << "Imprimiendo con lambda:" << std::endl;
  // for_each aplica la función a cada elemento
  std::for_each(numeros.begin(), numeros.end(), imprimir_bonito);

  return 0;
}
