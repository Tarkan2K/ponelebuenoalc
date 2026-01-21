# Create the core library
add_library(OmniTradeCore
    memory/ArenaAllocator.cpp
)

target_include_directories(OmniTradeCore PUBLIC ${CMAKE_SOURCE_DIR}/include)

# Create the main executable
add_executable(OmniTrade main.cpp)
target_link_libraries(OmniTrade PRIVATE OmniTradeCore)
