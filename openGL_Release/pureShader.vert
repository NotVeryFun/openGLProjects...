#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;
layout (location = 3) in mat4 modelMatrix;

out vec3 color;

uniform mat4 camMatrix;

void main(){
    gl_Position = camMatrix * modelMatrix * vec4(aPos,1.0f);
    color = aColor;
}