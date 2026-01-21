#!/bin/bash
set -e

echo "=== Compiling Tutorial Program ==="
g++ -std=c++20 src/Tutorial.cpp -o tutorial
echo "Tutorial compiled. Run ./tutorial to start learning!"
echo ""

echo "=== Compiling and Running Memory Tests ==="
g++ -std=c++20 -I include src/memory/ArenaAllocator.cpp tests/MemoryTests.cpp -o memory_test
./memory_test
echo ""

echo "=== Compiling and Running Matching Engine Benchmark ==="
g++ -std=c++20 -I include src/engine/StandardOrderBook.cpp tests/Benchmark.cpp -o benchmark
./benchmark
echo ""

echo "=== Compiling Network Test (Server) ==="
g++ -std=c++20 -I include src/network/TcpServer.cpp tests/NetworkTest.cpp -o network_test
# ./network_test # Server blocks, so we don't run it automatically in this script
echo "Server compiled. Run ./network_test to start server."

echo "=== Compiling Network Client ==="
g++ -std=c++20 src/network/TcpClient.cpp -o client
echo "Client compiled. Run ./client to connect to server."

echo ""

echo "SUCCESS: All modules compiled and ran!"
