cd shaders
./compileShaders.sh
cd ..
cmake -B cmake-build-debug -DRT64_BUILD_EXAMPLES=1 -DCMAKE_EXPORT_COMPILE_COMMANDS=1 -DCMAKE_BUILD_TYPE=Debug --fresh
cmake --build cmake-build-debug/ -j 18
mv cmake-build-debug/compile_commands.json .

./cmake-build-debug/VulkanPlayground
