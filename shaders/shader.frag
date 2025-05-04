#version 460

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
    vec4 lightPos;
    vec4 viewPos;
} ubo;

layout(binding = 1) uniform sampler2D texSampler;

struct Material {
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    float shininess;
    vec3  padding;      // keep for alignment
};

layout(std430, binding = 2) readonly buffer MaterialBlock {
    Material materials[];
};

layout(location = 0) in  vec3 fragPosition;
layout(location = 1) in  vec3 fragNormal;
layout(location = 2) in  vec2 fragTexCoord;
layout(location = 3) flat in int  fragMaterialIndex;

layout(location = 0) out vec4 outColor;


void main() {
    Material mat = materials[fragMaterialIndex];

    vec3 norm = normalize(fragNormal);
    vec3 lightDir = normalize(ubo.lightPos.xyz - fragPosition);
    vec3 viewDir = normalize(ubo.viewPos .xyz - fragPosition);

    // simple white point light (scale as you like)
    vec3 lightAmbient = vec3(0.2);
    vec3 lightDiffuse = vec3(0.8);
    vec3 lightSpecular = vec3(1.0);

    // Ambient
    vec3 ambient  = mat.ambient .rgb * lightAmbient;

    // Diffuse
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = mat.diffuse.rgb * diff * lightDiffuse;

    // Specular
    vec3 reflectDir = reflect(-lightDir, norm);
    float specFactor = pow(max(dot(viewDir, reflectDir), 0.0), mat.shininess);
    vec3 specular = mat.specular.rgb * specFactor * lightSpecular;

    outColor = vec4(ambient + diffuse + specular, mat.diffuse.a);
}
