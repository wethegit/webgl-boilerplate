console.clear();

import { createRenderer } from "./lib";
import vert from "./shaders/main.vert";
import frag from "./shaders/main.frag";

const dpr = 2;

const c = document.createElement('canvas');
const gl = c.getContext('webgl2');

document.body.appendChild(c);

const resize = () => {
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
}
window.addEventListener('resize', resize);

const position = new Float32Array([
  -1, -1,
  3, -1,
  -1, 3
]);
const uvs = new Float32Array([
  0, 0,
  2, 0, 
  0, 2
]);

const scene = createRenderer(gl, {
  vert,
  frag,
  attributes: {
    position: { data: position, size: 2 },
    uv: { data: uvs, size: 2 }
  },
  count: 3
});

let playing = true;

const play = (delta) => {
  if(playing) requestAnimationFrame(play);

  scene.bindVAOs();

  scene.bindUniform("u_time", delta * .001);
  scene.bindUniform("u_resolution", [c.width, c.height]);

  scene.render();
}
requestAnimationFrame(play);

resize();