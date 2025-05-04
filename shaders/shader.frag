#version 460

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

struct LightInfo {
    vec3 lightPosition;
    vec3 viewPosition;
    vec3 ambientColor;
    vec3 diffuseColor;
    vec3 specularColor;
};

void main() {
    // Hardcoded lighting parameters wrapped in LightInfo struct
    LightInfo light = LightInfo(
        vec3(0.0, 4.0, 4.0),   // lightPosition
        vec3(0.0, 2.0, 5.0),   // viewPosition (camera position)
        vec3(0.2, 0.2, 0.2),   // ambientColor
        vec3(0.8, 0.8, 0.8),   // diffuseColor
        vec3(1.0, 1.0, 1.0)    // specularColor
    );


    Material mat = materials[fragMaterialIndex];

    // Normalize vectors
    vec3 norm = normalize(fragNormal);
    vec3 lightDir = normalize(light.lightPosition - fragPosition);
    vec3 viewDir = normalize(light.viewPosition - fragPosition);

    // Ambient lighting
    vec3 ambient = mat.ambient.rgb * light.ambientColor;

    // Diffuse lighting
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = mat.diffuse.rgb * diff * light.diffuseColor;

    // Specular lighting
    vec3 reflectDir = reflect(-lightDir, norm);
    float specFactor = pow(max(dot(viewDir, reflectDir), 0.0), mat.shininess);
    vec3 specular = mat.specular.rgb * specFactor * light.specularColor;

    // Final combined color
    vec3 finalColor = ambient + diffuse + specular;

    outColor = vec4(finalColor, mat.diffuse.a);
}
