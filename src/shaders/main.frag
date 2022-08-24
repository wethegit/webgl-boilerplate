#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 color;

uniform float u_time;
uniform vec2 u_resolution;

vec2 getScreenSpace() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

  return uv;
}

void main() {
  vec2 uv = getScreenSpace();
  float field = length(uv);
  float circle = step(0.0, field-.25);

  color = vec4(vec3(circle),1);
}