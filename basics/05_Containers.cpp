// ============================================================================
// LECCIÓN 05: CONTENEDORES STL (STANDARD TEMPLATE LIBRARY)
// ============================================================================
//
// Un programador Senior no reinventa la rueda. Usa la STL.
// La STL provee estructuras de datos optimizadas y probadas.
//
// Veremos los dos más importantes:
// 1. std::vector: Array dinámico (crece solo).
// 2. std::map: Diccionario clave-valor (árbol binario ordenado).
// ============================================================================

#include <algorithm> // Para std::sort
#include <iostream>
#include <map>
#include <string>
#include <vector>

void demo_vector() {
  std::cout << "--- DEMO VECTOR (Array Dinámico) ---" << std::endl;

  // Crear un vector de enteros
  std::vector<int> precios = {100, 50, 75, 200};

  // Añadir elementos al final (push_back)
  std::cout << "Añadiendo precio 99..." << std::endl;
  precios.push_back(99);

  // Acceso directo (como un array normal)
  std::cout << "El primer precio es: " << precios[0] << std::endl;

  // Iterar (Recorrer)
  std::cout << "Lista de precios: ";
  for (int p : precios) {
    std::cout << p << " ";
  }
  std::cout << std::endl;

  // Ordenar (usando algoritmo de la STL)
  std::cout << "Ordenando precios..." << std::endl;
  std::sort(precios.begin(), precios.end());

  std::cout << "Precios ordenados: ";
  for (int p : precios)
    std::cout << p << " ";
  std::cout << std::endl;
}

void demo_map() {
  std::cout << "\n--- DEMO MAP (Diccionario / OrderBook) ---" << std::endl;

  // Mapa: Clave (String) -> Valor (Double)
  // Simula una cartera de inversiones
  std::map<std::string, double> cartera;

  cartera["BTC"] = 45000.50;
  cartera["ETH"] = 3200.00;
  cartera["SOL"] = 110.25;

  // Acceder o Modificar
  std::cout << "Precio de BTC: " << cartera["BTC"] << std::endl;

  // Si accedemos a una clave que no existe, se crea con valor 0 (¡Cuidado!)
  std::cout << "Precio de DOGE (no existía): " << cartera["DOGE"] << std::endl;

  // Iterar (El mapa ordena automáticamente por Clave alfabéticamente)
  std::cout << "Cartera Completa:" << std::endl;
  for (auto const &[moneda, precio] : cartera) {
    std::cout << "  " << moneda << ": $" << precio << std::endl;
  }

  // Buscar sin crear
  if (cartera.find("ADA") == cartera.end()) {
    std::cout << "ADA no está en la cartera." << std::endl;
  }
}

int main() {
  demo_vector();
  demo_map();
  return 0;
}
