#!/bin/bash
# Script simple para compilar y ejecutar una lección
# Uso: ./run_lesson.sh basics/01_HelloCpp.cpp

if [ -z "$1" ]; then
    echo "Uso: ./run_lesson.sh <archivo_cpp>"
    echo "Ejemplo: ./run_lesson.sh basics/01_HelloCpp.cpp"
    exit 1
fi

FILENAME=$(basename -- "$1")
NAME="${FILENAME%.*}"
DIR=$(dirname "$1")

echo "=== Compilando $1 ==="
g++ -std=c++20 -Wall -Wextra "$1" -o "$DIR/$NAME"

if [ $? -eq 0 ]; then
    echo "=== Ejecutando $NAME ==="
    echo "--------------------------------------------------"
    "$DIR/$NAME"
    echo "--------------------------------------------------"
else
    echo "❌ Error de compilación. Revisa tu código."
fi
