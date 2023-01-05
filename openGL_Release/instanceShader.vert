#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 3) in mat4 instanceMatrix;
out vec3 Normal;
out vec3 crntPos;

uniform mat4 camMatrix;
uniform mat4 model;

void main(){
    crntPos = vec3(instanceMatrix * vec4(aPos,1.0f));

    gl_Position = camMatrix * vec4(crntPos,1.0f);//* vec4(crntPos,1.0f);
    Normal = mat3(transpose(inverse(instanceMatrix))) * aNormal;
}