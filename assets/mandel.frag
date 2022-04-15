#ifdef GL_ES
precision highp float;
#endif

uniform vec2 canvasResolution;
uniform float minI;
uniform float maxI;
uniform float minR;
uniform float maxR;
varying vec2 vPos;

// These are passed in as a uniform from the sketch.js file
uniform vec2 p;
uniform float r;
const int I = 500;
const float offset = 2.0;

void main(){
    
    // fractal code
    vec2 vPos = vec2(
		gl_FragCoord.x * (maxR - minR) / canvasResolution.x + minR,
		gl_FragCoord.y * (maxI - minI) / canvasResolution.y + minI
	);
    vec2 c = p + (vPos) * r, z = c;

    float n = 0.0;
    
    for (int i = 0; i < I; i++) { 
      if(z.x*z.x+z.y*z.y > 4. ) { 
        n = (float(i)/(float(I)*1.5)); 
        break;
      } 
      z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c; 
    } 
    gl_FragColor=vec4(0.5-cos(n* 75.0)/3.0,0.5-cos(n* 75.0)/3.0,0.5-cos(n* 75.0)/3.0,1.0);
}