#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 3) in mat4 model;
uniform mat4 lightProj;

void main(){

    gl_Position = lightProj * model * vec4(aPos,1.0f);

}