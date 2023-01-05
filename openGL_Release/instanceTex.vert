#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTex;
layout (location = 3) in mat4 instanceMatrix;
out vec3 Normal;
out vec3 crntPos;
out vec2 texCoord;

uniform mat4 camMatrix;
uniform mat4 model;

//shadow...
uniform mat4 lightProj;
out vec4 fragPosLight;

void main(){
    crntPos = vec3(instanceMatrix * vec4(aPos,1.0f));

    gl_Position = camMatrix * vec4(crntPos,1.0f);//* vec4(crntPos,1.0f);
    Normal = mat3(transpose(inverse(instanceMatrix))) * aNormal;
    texCoord = aTex;

    //shadows...
    fragPosLight = lightProj * vec4(crntPos,1.0f);
}