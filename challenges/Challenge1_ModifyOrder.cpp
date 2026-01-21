#include "omnitrade/engine/StandardOrderBook.h"
#include <cassert>
#include <iostream>
#include <vector>

using namespace OmniTrade::Core;
using namespace OmniTrade::Engine;

// ==================================================================================
// RETO 1: Implementar modificación de órdenes (Modify Order)
// ==================================================================================
//
// Tu tarea es implementar una nueva funcionalidad en el OrderBook:
// `modify_order`.
//
// En muchos sistemas de trading, modificar una orden es más eficiente que
// cancelarla y crear una nueva, porque puedes mantener tu prioridad en la cola
// si solo reduces la cantidad (quantity). Si aumentas la cantidad o cambias el
// precio, pierdes tu prioridad (te vas al final de la cola).
//
// OBJETIVO:
// 1. Abre `include/omnitrade/engine/StandardOrderBook.h` y añade el método:
//    bool modify_order(OrderId order_id, Quantity new_quantity);
//
// 2. Abre `src/engine/StandardOrderBook.cpp` e implementa la lógica:
//    - Busca la orden por ID.
//    - Si no existe, retorna false.
//    - Si la nueva cantidad es MENOR que la actual:
//      - Actualiza la cantidad en la orden existente.
//      - NO cambies su posición en la lista (mantiene prioridad).
//    - Si la nueva cantidad es MAYOR que la actual:
//      - (Opcional para este reto, pero idealmente) Debería moverse al final.
//      - Por ahora, simplemente actualiza la cantidad.
//    - Retorna true.
//
// 3. Compila y ejecuta este test hasta que pase.
//
// ==================================================================================

void test_modify_decrease_quantity() {
  std::cout << "Test: Modify Order (Decrease Quantity)... ";
  StandardOrderBook book;

  // 1. Añadir una orden de compra
  Order o1 = {1, 100, 50, Side::Buy, OrderType::Limit};
  book.add_order(o1);

  // 2. Añadir otra orden al mismo precio (debe ir después)
  Order o2 = {2, 100, 50, Side::Buy, OrderType::Limit};
  book.add_order(o2);

  // Verificamos volumen inicial
  assert(book.get_volume_at_price(100) == 100);

  // 3. Modificar o1 para reducir cantidad a 20
  // bool success = book.modify_order(1, 20); // <--- DESCOMENTAR ESTO CUANDO LO
  // IMPLEMENTES assert(success); assert(book.get_volume_at_price(100) == 70);
  // // 20 (o1) + 50 (o2)

  // 4. Verificar que o1 sigue siendo la primera (match parcial)
  // Order sell = {3, 100, 10, Side::Sell, OrderType::Limit};
  // book.add_order(sell);

  // Si o1 sigue primera, se le restan 10 a ella. Queda en 10.
  // Si o2 hubiera pasado a ser primera, o1 seguiría en 20.

  // assert(book.get_volume_at_price(100) == 60);

  std::cout << "PASSED (Simulado - Implementa el código real!)" << std::endl;
}

int main() {
  std::cout << "=== RETO DE CÓDIGO 1: MODIFY ORDER ===" << std::endl;
  test_modify_decrease_quantity();
  std::cout << "\n¡Felicidades! Si has descomentado el código y pasa, has "
               "completado el reto."
            << std::endl;
  return 0;
}
