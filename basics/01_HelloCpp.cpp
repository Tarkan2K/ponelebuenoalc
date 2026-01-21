// ============================================================================
// LECCIÓN 01: HOLA MUNDO Y VARIABLES
// ============================================================================
//
// Bienvenido a C++. Este es un lenguaje compilado, lo que significa que
// necesitamos traducir este texto a código máquina (binario) antes de
// ejecutarlo.
//
// Para compilar este archivo, usaremos el comando:
// g++ 01_HelloCpp.cpp -o leccion1
//
// Y para ejecutarlo:
// ./leccion1
// ============================================================================

// 1. INCLUDES
// En C++, para usar funciones básicas (como imprimir en pantalla), necesitamos
// incluir librerías. <iostream> significa "Input/Output Stream".
#include <iostream>

// 2. LA FUNCIÓN MAIN
// Todo programa en C++ comienza a ejecutarse en la función "main".
// "int" significa que esta función devuelve un número entero al sistema
// operativo cuando termina (0 suele significar "todo salió bien").
int main() {

  // 3. IMPRIMIR EN PANTALLA
  // std::cout significa "Standard Character Output".
  // << es el operador de inserción. Estamos "insertando" texto en la salida.
  // std::endl significa "End Line" (salto de línea).
  std::cout << "¡Hola, futuro experto en C++!" << std::endl;

  // 4. VARIABLES Y TIPOS
  // C++ es un lenguaje de "tipado estático". Debes decir qué tipo de dato
  // vas a guardar en cada variable.

  int edad = 25;             // int: Números enteros (sin decimales)
  double salario = 50000.50; // double: Números con decimales (precisión doble)
  char inicial = 'J';        // char: Un solo carácter (comillas simples)
  bool esta_aprendiendo = true; // bool: Verdadero (true) o Falso (false)

  // Imprimamos las variables
  std::cout << "Edad: " << edad << std::endl;
  std::cout << "Salario: " << salario << std::endl;
  std::cout << "Inicial: " << inicial << std::endl;

  // 5. OPERACIONES BÁSICAS
  int anio_nacimiento = 2024 - edad;
  std::cout << "Naciste aproximadamente en: " << anio_nacimiento << std::endl;

  // 6. CONDICIONALES (IF)
  // Tomamos decisiones basadas en valores.
  if (esta_aprendiendo) {
    std::cout << "¡Estás en el camino correcto!" << std::endl;
  } else {
    std::cout << "¿Qué esperas para empezar?" << std::endl;
  }

  // 7. RETORNO
  // Devolvemos 0 para indicar éxito.
  return 0;
}
