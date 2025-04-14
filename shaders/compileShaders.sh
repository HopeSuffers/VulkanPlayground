unameOut="$(uname -s)"
case "${unameOut}" in
    Linux)     machine=x86_64;;
    Darwin)    machine=macOS;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo ${machine}

#!/bin/bash
~/VulkanSDK/1.4.309.0/${machine}/bin/glslc shader.vert -o vert.spv
echo "compiled vertex shader"
~/VulkanSDK/1.4.309.0/${machine}/bin/glslc shader.frag -o frag.spv
echo "compiled fragment shader"
