// ============================================================================
// LECCIÓN 04: CLASES Y OBJETOS
// ============================================================================
//
// La Programación Orientada a Objetos (OOP) nos permite modelar cosas del mundo
// real. Una CLASE es el plano (blueprint). Un OBJETO es la casa construida con
// ese plano.
//
// Compilar y ejecutar:
// ./run_lesson.sh basics/04_Classes.cpp
// ============================================================================

#include <iostream>
#include <string>

// Definición de la Clase
class Libro {
private:
  // Datos privados: Solo la clase puede verlos (Encapsulamiento)
  std::string titulo;
  std::string autor;
  int paginas;

public:
  // Constructor: Se llama automáticamente al crear el objeto
  Libro(std::string t, std::string a, int p) {
    titulo = t;
    autor = a;
    paginas = p;
    std::cout << "Constructor: Creando libro '" << titulo << "'" << std::endl;
  }

  // Destructor: Se llama automáticamente al destruir el objeto
  ~Libro() {
    std::cout << "Destructor: Eliminando libro '" << titulo << "'" << std::endl;
  }

  // Métodos (Funciones de la clase)
  void abrir() {
    std::cout << "Abriendo '" << titulo << "' por " << autor << "..."
              << std::endl;
  }

  // Getters (para leer datos privados)
  int obtener_paginas() const { return paginas; }
};

int main() {
  std::cout << "=== INICIO DEL PROGRAMA ===" << std::endl;

  {
    // Creamos un objeto en el Stack (ámbito local)
    std::cout << "--- Creando objeto local ---" << std::endl;
    Libro mi_libro("El Señor de los Anillos", "J.R.R. Tolkien", 1200);

    mi_libro.abrir();
    std::cout << "Páginas: " << mi_libro.obtener_paginas() << std::endl;

    std::cout << "--- Fin del ámbito local ---" << std::endl;
    // Aquí se llama automáticamente al Destructor de mi_libro
  }

  std::cout << "--- Fuera del ámbito ---" << std::endl;

  // Creamos un objeto en el Heap
  std::cout << "--- Creando objeto en Heap ---" << std::endl;
  Libro *libro_heap = new Libro("C++ Primer", "Stanley Lippman", 900);
  libro_heap->abrir(); // Usamos -> para punteros

  // Debemos borrarlo manualmente
  delete libro_heap;

  std::cout << "=== FIN DEL PROGRAMA ===" << std::endl;
  return 0;
}
