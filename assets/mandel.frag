#ifdef GL_ES
precision highp float;
#endif

uniform vec2 canvasResolution;
uniform float minI;
uniform float maxI;
uniform float minR;
uniform float maxR;
varying float color;
varying vec2 vPos;

// These are passed in as a uniform from the sketch.js file
uniform vec2 p;
uniform float r;
const float MAX_ITERATION = 500.;
const float offset = 2.0;

float map(float value, float in_min, float in_max, float out_min, float out_max){
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main(){
    
    // fractal code
    vec2 vPos = vec2(
		gl_FragCoord.x * (maxR - minR) / canvasResolution.x + minR,
		gl_FragCoord.y * (maxI - minI) / canvasResolution.y + minI
	);
    vec2 c = p + (vPos) * r, z = c;

    float n = 0.0;
    
    for (float i = MAX_ITERATION; i > 0.; i -= 1.) { 
      if(z.x*z.x+z.y*z.y > 16. ) { 
        n = i/MAX_ITERATION; 
        //n = n + 1.0 - log(log(abs(z.x)))/log(2.0); 
        break;
      } 
      z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c; 
    } 

    //gl_FragColor=vec4(n + 0.5 - log(log(abs(z.x)))/log(3.0),n + 1.0 - log(log(abs(z.y)))/log(5.0),n + 0.5 - log(log(abs(z.x)))/log(7.0),1.0);
    gl_FragColor=vec4(0.5-cos(n*n*75.0)/2.0,0.5-cos(n* 120.0)/2.0,0.5-cos(sqrt(n)*165.0)/2.0,1.0);
}