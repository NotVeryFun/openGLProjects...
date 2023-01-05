#version 330 core

layout (location = 0) in vec2 aPos;

uniform mat4 camMatrix;
uniform mat4 model;
void main(){
    gl_Position = camMatrix * model * vec4(aPos.x,0.0f,aPos.y,1.0f);
}