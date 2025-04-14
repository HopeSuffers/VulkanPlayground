#version 450

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) flat in int fragMaterialIndex;

layout(location = 0) out vec4 outColor;

void main() {
    vec4 color;
    switch (fragMaterialIndex) {
        case 0:
        color = vec4(1.0, 0.0, 0.0, 1.0); // Red
        break;
        case 1:
        color = vec4(0.0, 1.0, 0.0, 1.0); // Green
        break;
        case 2:
        color = vec4(0.0, 0.0, 1.0, 1.0); // Blue
        break;
        case 3:
        color = vec4(1.0, 1.0, 0.0, 1.0); // Yellow
        break;
        case 4:
        color = vec4(1.0, 0.0, 1.0, 1.0); // Magenta
        break;
        case 5:
        color = vec4(0.0, 1.0, 1.0, 1.0); // Cyan
        break;
        case 6:
        color = vec4(0.0, 1.0, 1.0, 1.0); // Cyan
        break;
        case 7:
        color = vec4(0.0, 1.0, 1.0, 1.0); // Cyan
        break;
        case 8:
        color = vec4(0.0, 1.0, 1.0, 1.0); // Cyan
        break;
        case 9:
        color = vec4(0.0, 1.0, 1.0, 1.0); // Cyan
        break;
        default:
        color = vec4(0.0, 0.0, 0.0, 1.0); // Black for any undefined indices
        break;
    }
    outColor = color;
}
