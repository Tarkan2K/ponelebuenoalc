// ============================================================================
// LECCIÓN 06: SMART POINTERS (C++ MODERNO)
// ============================================================================
//
// En la Lección 03 vimos 'new' y 'delete'. Olvídalos.
// En C++ Moderno (C++11 en adelante), usamos Smart Pointers.
// Ellos hacen 'delete' automáticamente cuando ya no se usan.
//
// 1. std::unique_ptr: Dueño único. Nadie más puede tenerlo.
// 2. std::shared_ptr: Dueño compartido. Se borra cuando el ÚLTIMO dueño lo
// suelta.
// ============================================================================

#include <iostream>
#include <memory> // Necesario para smart pointers

class Recurso {
public:
  Recurso(int id) : id_(id) {
    std::cout << "  [Recurso " << id_ << "] Creado." << std::endl;
  }
  ~Recurso() {
    std::cout << "  [Recurso " << id_ << "] Destruido (Memoria liberada)."
              << std::endl;
  }
  void usar() {
    std::cout << "  [Recurso " << id_ << "] Siendo usado." << std::endl;
  }

private:
  int id_;
};

void demo_unique() {
  std::cout << "--- UNIQUE POINTER ---" << std::endl;
  // std::make_unique es la forma segura de crear un unique_ptr
  std::unique_ptr<Recurso> ptr1 = std::make_unique<Recurso>(1);

  ptr1->usar();

  // std::unique_ptr<Recurso> ptr2 = ptr1; // ¡ERROR! No se puede copiar.

  // Pero se puede MOVER (transferir propiedad)
  std::cout << "Moviendo propiedad de ptr1 a ptr2..." << std::endl;
  std::unique_ptr<Recurso> ptr2 = std::move(ptr1);

  if (!ptr1)
    std::cout << "ptr1 ahora está vacío (nullptr)." << std::endl;
  if (ptr2)
    ptr2->usar();

  std::cout << "Saliendo de demo_unique..." << std::endl;
  // Aquí ptr2 sale de ámbito y destruye el Recurso automáticamente.
}

void demo_shared() {
  std::cout << "\n--- SHARED POINTER ---" << std::endl;

  std::shared_ptr<Recurso> ptrA = std::make_shared<Recurso>(2);

  {
    std::cout << "Entrando a bloque interno..." << std::endl;
    std::shared_ptr<Recurso> ptrB = ptrA; // ¡OK! Ahora hay 2 dueños.

    std::cout << "Dueños actuales: " << ptrA.use_count() << std::endl;
    ptrB->usar();

    std::cout << "Saliendo de bloque interno..." << std::endl;
  }
  // ptrB muere aquí, pero el Recurso NO se destruye porque ptrA sigue vivo.

  std::cout << "Dueños actuales: " << ptrA.use_count() << std::endl;
  std::cout << "Saliendo de demo_shared..." << std::endl;
  // Aquí ptrA muere. El contador llega a 0. El Recurso se destruye.
}

int main() {
  demo_unique();
  demo_shared();
  return 0;
}
