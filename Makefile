CXX = g++
CXXFLAGS = -std=c++20 -I include -Wall -Wextra -pthread

all: memory_test benchmark network_test client tutorial

memory_test: src/memory/ArenaAllocator.cpp tests/MemoryTests.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@

benchmark: src/engine/StandardOrderBook.cpp tests/Benchmark.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@

network_test: src/network/TcpServer.cpp tests/NetworkTest.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@

client: src/network/TcpClient.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@

tutorial: src/Tutorial.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@

clean:
	rm -f memory_test benchmark network_test client tutorial
