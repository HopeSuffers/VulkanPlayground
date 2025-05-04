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
    vec4 Ka;        // ambient                (Ka.rgba)
    vec4 Kd;        // diffuse                (Kd.rgba)
    vec4 Ks;        // specular               (Ks.rgba)
    vec4 Ke;        // emissive               (Ke.rgba)
    vec4 Tf_Ni;     // xyz = transmittance Tf, w = Ni (IOR)
    vec4 params;    // x = Ns (shininess)
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
    vec3 ambient = mat.Ka.rgb * lightAmbient;

    // Diffuse
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = mat.Kd.rgb * diff * lightDiffuse;

    // Specular
    vec3 reflectDir = reflect(-lightDir, norm);
    float specFactor = pow(max(dot(viewDir, reflectDir), 0.0), mat.params.x);
    vec3 specular = mat.Ks.rgb * specFactor * lightSpecular;

    vec3 emissive = mat.Ke.rgb;
    float alpha = mat.params.y;
    float illum = mat.params.z;

    vec3 final = ambient + diffuse + specular + emissive;

    outColor = vec4(final, alpha);
}
