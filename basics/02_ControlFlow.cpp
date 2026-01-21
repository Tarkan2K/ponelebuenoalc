// ============================================================================
// LECCIÓN 02: CONTROL DE FLUJO Y FUNCIONES
// ============================================================================
//
// En esta lección aprenderemos a tomar decisiones (if/else), repetir tareas
// (bucles) y organizar código en funciones reutilizables.
//
// Compilar y ejecutar:
// ./run_lesson.sh basics/02_ControlFlow.cpp
// ============================================================================

#include <iostream>
#include <vector> // Para usar vectores (listas dinámicas)

// 1. FUNCIONES
// Las funciones nos permiten agrupar código.
// Estructura: tipo_retorno nombre_funcion(parametros) { ... }

// Función que suma dos enteros y devuelve el resultado
int sumar(int a, int b) { return a + b; }

// Función que no devuelve nada (void)
void saludar(std::string nombre) {
  std::cout << "Hola, " << nombre << "!" << std::endl;
}

// PASO POR VALOR VS PASO POR REFERENCIA
// - Por Valor (int x): Se hace una COPIA de la variable. Si cambias x dentro,
// no afecta afuera.
// - Por Referencia (int &x): Se pasa la variable ORIGINAL. Si cambias x dentro,
// cambia afuera.

void duplicar_por_valor(int numero) {
  numero = numero * 2;
  std::cout << "  [Dentro de valor] numero es: " << numero << std::endl;
}

void duplicar_por_referencia(int &numero) {
  numero = numero * 2;
  std::cout << "  [Dentro de referencia] numero es: " << numero << std::endl;
}

int main() {
  std::cout << "=== 1. FUNCIONES BÁSICAS ===" << std::endl;
  int resultado = sumar(10, 5);
  std::cout << "La suma de 10 + 5 es: " << resultado << std::endl;
  saludar("Padawan");

  std::cout << "\n=== 2. VALOR VS REFERENCIA ===" << std::endl;
  int mi_numero = 10;

  std::cout << "Original: " << mi_numero << std::endl;

  duplicar_por_valor(mi_numero);
  std::cout << "Después de por_valor: " << mi_numero << " (NO CAMBIÓ)"
            << std::endl;

  duplicar_por_referencia(mi_numero);
  std::cout << "Después de por_referencia: " << mi_numero << " (¡CAMBIÓ!)"
            << std::endl;

  std::cout << "\n=== 3. BUCLES (LOOPS) ===" << std::endl;

  // Bucle FOR: Para cuando sabes cuántas veces quieres repetir algo
  std::cout << "Contando con FOR:" << std::endl;
  for (int i = 0; i < 5; i++) {
    std::cout << i << " ";
  }
  std::cout << std::endl;

  // Bucle WHILE: Para cuando repites mientras una condición sea verdadera
  std::cout << "Contando con WHILE:" << std::endl;
  int contador = 5;
  while (contador > 0) {
    std::cout << contador << " ";
    contador--; // Restar 1
  }
  std::cout << std::endl;

  // RETO RÁPIDO:
  // Intenta crear una función que reciba un número y devuelva true si es par,
  // false si es impar. Pista: usa el operador módulo % (a % 2 == 0)

  return 0;
}
