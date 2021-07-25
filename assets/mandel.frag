#ifdef GL_ES
precision highp float;
#endif

uniform vec2 iResolution;
varying vec2 vPos;

// These are passed in as a uniform from the sketch.js file
uniform vec2 p;
uniform float r;
const int I = 500;
const float offset = 2.0;

void main(){
    
    // fractal code
    vec2 vPos = offset*gl_FragCoord.xy/iResolution.xy - vec2(offset/2.0);
    vec2 c = p + vPos * r, z = c;

    float n = 0.0;
    
    for (int i = I; i > 0; i --) { 
      if(z.x*z.x+z.y*z.y > 4. ) { 
        n = float(i)/float(I); 
        break;
      } 
      z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c; 
    } 
    gl_FragColor=vec4(0.5-cos(n*75.0)/2.0,0.5-cos(n* 120.0)/2.0,0.5-cos(n*165.0)/2.0,1.0);
}