#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
varying vec2 vPos;

// Thsse are passed in as a uniform from the sketch.js file
uniform vec2 p;
uniform float r;
const int I = 750;

void main(){
    
    // fractal code
    vec2 c = p + vPos * r, z = c;
    float n = 0.0;
    
    for (int i = I; i > 0; i --) { 
      if(z.x*z.x+z.y*z.y > 4. ) { 
        n = float(i)/float(I); 
        break;
      } 
      z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c; 
    } 
    gl_FragColor=vec4(0.5-cos(n*140.0)/2.0,0.5-cos(n* 120.0)/2.0,0.5-cos(n*165.0)/2.0,1.0);
}