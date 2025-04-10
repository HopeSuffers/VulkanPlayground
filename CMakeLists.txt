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

# Define resource directories
set(SHADERS_DIR ${CMAKE_SOURCE_DIR}/shaders)
set(TEXTURES_DIR ${CMAKE_SOURCE_DIR}/textures)
set(MODELS_DIR  ${CMAKE_SOURCE_DIR}/models)

# Copy resources to the output directory after build
add_custom_command(TARGET VulkanPlayground POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_directory ${SHADERS_DIR} $<TARGET_FILE_DIR:VulkanPlayground>/shaders
        COMMAND ${CMAKE_COMMAND} -E copy_directory ${TEXTURES_DIR} $<TARGET_FILE_DIR:VulkanPlayground>/textures
        COMMAND ${CMAKE_COMMAND} -E copy_directory ${MODELS_DIR}  $<TARGET_FILE_DIR:VulkanPlayground>/models
)
