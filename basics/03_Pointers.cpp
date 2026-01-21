// ============================================================================
// LECCIÓN 03: PUNTEROS Y MEMORIA (LO MÁS IMPORTANTE)
// ============================================================================
//
// C++ es poderoso porque te deja tocar la memoria directamente.
// - Una VARIABLE es una cajita con un valor.
// - La DIRECCIÓN DE MEMORIA es dónde está esa cajita (ej. 0x7ffee4...).
// - Un PUNTERO es una variable que guarda una dirección de memoria.
//
// Compilar y ejecutar:
// ./run_lesson.sh basics/03_Pointers.cpp
// ============================================================================

#include <iostream>

int main() {
  std::cout << "=== 1. DIRECCIONES DE MEMORIA ===" << std::endl;
  int numero = 42;

  // El operador & (ampersand) nos da la dirección de una variable
  std::cout << "Valor de numero: " << numero << std::endl;
  std::cout << "Dirección de numero (&numero): " << &numero << std::endl;

  std::cout << "\n=== 2. PUNTEROS ===" << std::endl;
  // Un puntero se declara con *
  int *puntero = &numero; // 'puntero' guarda la dirección de 'numero'

  std::cout << "Valor del puntero: " << puntero
            << " (Debe ser igual a la dirección de arriba)" << std::endl;

  // DESREFERENCIAR: Acceder al valor al que apunta el puntero usando *
  std::cout << "Valor apuntado (*puntero): " << *puntero << std::endl;

  // Si cambiamos el valor a través del puntero...
  *puntero = 100;
  std::cout << "Nuevo valor de numero: " << numero << " (¡Magia!)" << std::endl;

  std::cout << "\n=== 3. STACK VS HEAP ===" << std::endl;
  // STACK (Pila): Memoria automática, rápida, se borra al salir de la función.
  int variable_stack = 10;

  // HEAP (Montón): Memoria manual, grande, tú controlas cuándo se borra.
  // 'new' reserva memoria en el Heap y devuelve un puntero.
  int *variable_heap = new int(500);

  std::cout << "Valor en el Heap: " << *variable_heap << std::endl;

  // ¡IMPORTANTE! En C++ tradicional, si usas 'new', DEBES usar 'delete'.
  // Si no lo haces, esa memoria se queda ocupada para siempre (Memory Leak).
  delete variable_heap;
  variable_heap =
      nullptr; // Buena práctica: anular el puntero después de borrar

  std::cout << "Memoria liberada." << std::endl;

  // En C++ Moderno (lo que usaremos en el proyecto), usaremos Smart Pointers
  // para no tener que hacer 'delete' manualmente. Pero es vital entender esto
  // primero.

  return 0;
}
