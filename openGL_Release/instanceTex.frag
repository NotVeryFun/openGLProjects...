#version 330 core

out vec4 FragColor;
in vec3 crntPos;
in vec3 Normal;
in vec2 texCoord;
in vec3 Color;

uniform sampler2D tex0;

uniform vec4 lightColor;
uniform vec3 lightPos;
uniform vec3 camPos;


//the struct of PointLight
struct PointLight {    
    vec3 position;
    vec3 color;
};  
//define the number of the light
#define num 4
//array stored the pointLights
uniform PointLight pointLights[num];

float calcSingleLight();
vec3 calcPointLights();
float linerizeDepth(float depth);
float logisticDepth(float depth);


//shadows...
in vec4 fragPosLight;
uniform sampler2D shadowMap;

float calcSingleLight(){

    float ambient = 0.2f;
    vec3 normal = normalize(Normal);
    vec3 lightDirection = normalize(lightPos - crntPos);
    float diffuse = max(dot(normal,lightDirection),0);
    //the strength of the specular light
    float specularLight = 0.5f;
    vec3 viewDirection = normalize(camPos - crntPos);
    vec3 reflectedDirection = reflect(-lightDirection,normal);
    float specAmount = pow(max(dot(viewDirection,reflectedDirection),0.0f),8);
    float specular = specAmount * specularLight;
    return specular + specular + diffuse + ambient;

}
float shadow;
vec3 calcPointLights(){
    //shadow Calc
    float shadow = 0.0f;
    vec3 lightCoords = fragPosLight.xyz / fragPosLight.w;
    if(lightCoords.z <= 1.0f){
        lightCoords = (lightCoords + 1.0f) / 2.0f;
        float closestDepth = texture(shadowMap,lightCoords.xy).r;
        float currentDepth = lightCoords.z;
        float bias = 0.005f;
        if(currentDepth > closestDepth + bias){
            shadow = 1.0f;
        }
    }


    vec3 sum = vec3(0.0f,0.0f,0.0f);
    //the strength of the ambient light
    float ambient = 0.25f;
    for(int i = 0 ; i < num ; i ++){
        PointLight p = pointLights[i];
        vec3 lightDirection = p.position - crntPos;
        float dist = length(lightDirection);
        float a = 0.0002f;
        float b = 0.0001f;
        float inten = 1.0f/(a * dist * dist + b * dist + 1.0f);

        
        vec3 normal = normalize(Normal);
        lightDirection = normalize(lightDirection);

        float diffuse = max(dot(normal,lightDirection),0);
        //the strength of the specular light
        float specularLight = 0.8f;
        vec3 viewDirection = normalize(camPos - crntPos);
        vec3 reflectedDirection = reflect(-lightDirection,normal);
        float specAmount = pow(max(dot(viewDirection,reflectedDirection),0.0f),4);
        float specular = specAmount * specularLight;

        sum += p.color * (specular * (1-shadow) + diffuse * (1-shadow) + ambient) *inten;
    }
    


    return sum;
}



float near = 0.1f;
float far = 100.0f;

vec3 bcColor = vec3(0.1f,0.1f,0.15f);

uniform int useTexture;

void main(){
    vec3 lightSum = calcPointLights();
    vec4 texColor = texture(tex0,texCoord);
    if(texColor.a < 0.1){discard;}
    if(useTexture == 1){
        FragColor = logisticDepth(gl_FragCoord.z) * vec4(bcColor,1.0f) + (1 - logisticDepth(gl_FragCoord.z))* (texture(tex0,texCoord)) * vec4(Color * 0.6 + Color * lightSum,1.0f);
    }else{
        FragColor = logisticDepth(gl_FragCoord.z) * vec4(bcColor,1.0f) + (1 - logisticDepth(gl_FragCoord.z)) * vec4(Color * 0.6 + Color * lightSum ,1.0f);
    } 
}


float linerizeDepth(float depth){
    return (2.0f * near * far) / (far + near - (depth * 2.0f - 1.0f) * (far - near));
}

float logisticDepth(float depth)
{
    float steepness = 0.5f;
    float offset = 50.0f;
	float zVal = linerizeDepth(depth);
	return (1 / (1 + exp(-steepness * (zVal - offset))));
}