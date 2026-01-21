#!/bin/bash
# Master Menu for C++ Zero to Hero Course

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

clear_screen() {
    printf "\033c"
}

print_header() {
    clear_screen
    echo -e "${BLUE}============================================================${NC}"
    echo -e "${BLUE}       C++ ZERO TO HERO: MASTERY COURSE v1.0       ${NC}"
    echo -e "${BLUE}============================================================${NC}"
    echo -e "Bienvenido, Padawan. Tu viaje hacia la maestría comienza aquí."
    echo ""
}

run_lesson() {
    LESSON_FILE=$1
    if [ ! -f "$LESSON_FILE" ]; then
        echo -e "${RED}Error: La lección $LESSON_FILE aún no ha sido creada.${NC}"
        read -p "Presiona Enter para volver..."
        return
    fi

    echo -e "${YELLOW}>>> Compilando lección...${NC}"
    ./run_lesson.sh "$LESSON_FILE"
    echo ""
    read -p "Presiona Enter para volver al menú..."
}

while true; do
    print_header
    echo -e "${GREEN}FASE 1: FUNDAMENTOS (JUNIOR)${NC}"
    echo " 1. Hola Mundo y Variables      (basics/01_HelloCpp.cpp)"
    echo " 2. Control de Flujo y Funciones(basics/02_ControlFlow.cpp)"
    echo " 3. Punteros y Memoria          (basics/03_Pointers.cpp)"
    echo " 4. Clases y Objetos            (basics/04_Classes.cpp)"
    echo ""
    echo -e "${GREEN}FASE 2: C++ MODERNO (MID-LEVEL)${NC}"
    echo " 5. Contenedores STL (Vector/Map)(basics/05_Containers.cpp)"
    echo " 6. Smart Pointers (No más new) (basics/06_SmartPointers.cpp)"
    echo " 7. Templates y Lambdas         (basics/07_TemplatesLambdas.cpp)"
    echo ""
    echo -e "${GREEN}FASE 3: SISTEMAS Y CONCURRENCIA (SENIOR)${NC}"
    echo " 8. Multithreading y Race Cond. (basics/08_Multithreading.cpp)"
    echo " 9. Networking Básico           (basics/09_Networking.cpp)"
    echo "10. Optimización Low-Latency    (basics/10_Optimization.cpp)"
    echo ""
    echo -e "${BLUE}------------------------------------------------------------${NC}"
    echo " q. Salir"
    echo ""
    read -p "Selecciona una lección: " choice

    case $choice in
        1) run_lesson "basics/01_HelloCpp.cpp" ;;
        2) run_lesson "basics/02_ControlFlow.cpp" ;;
        3) run_lesson "basics/03_Pointers.cpp" ;;
        4) run_lesson "basics/04_Classes.cpp" ;;
        5) run_lesson "basics/05_Containers.cpp" ;;
        6) run_lesson "basics/06_SmartPointers.cpp" ;;
        7) run_lesson "basics/07_TemplatesLambdas.cpp" ;;
        8) run_lesson "basics/08_Multithreading.cpp" ;;
        9) run_lesson "basics/09_Networking.cpp" ;;
        10) run_lesson "basics/10_Optimization.cpp" ;;
        q) exit 0 ;;
        *) echo -e "${RED}Opción inválida${NC}"; sleep 1 ;;
    esac
done
