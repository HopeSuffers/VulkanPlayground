#version 450

struct Material {
    vec4 baseColor;
};

layout(binding = 1) uniform sampler2D texSampler;

layout(std140, binding = 2) uniform MaterialBlock {
    Material materials[9];
};

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) flat in int fragMaterialIndex;

layout(location = 0) out vec4 outColor;

void main() {
    outColor = materials[fragMaterialIndex].baseColor;
}
