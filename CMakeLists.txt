cmake_minimum_required(VERSION 3.28)
project(VulkanPlayground)

set(CMAKE_CXX_STANDARD 23)

# Define the executable target once
add_executable(VulkanPlayground main.cpp)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Add GLFW and GLM subdirectories
add_subdirectory(lib/glfw)
SET(GLM_TEST_ENABLE OFF CACHE BOOL "GLM Build unit tests")
add_subdirectory(lib/glm EXCLUDE_FROM_ALL)
add_subdirectory(lib/tinyobjloader)

# Include directories for tinyobjloader
target_include_directories(VulkanPlayground PRIVATE ${CMAKE_SOURCE_DIR}/lib/tinyobjloader)

# Link libraries to the executable target
target_link_libraries(VulkanPlayground glfw ${GLFW_LIBRARIES} Vulkan::Vulkan glm::glm tinyobjloader)
