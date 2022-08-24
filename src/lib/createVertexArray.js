const createBuffer = (
  gl,
  data,
  usage = gl.STATIC_DRAW,
  type = gl.ARRAY_BUFFER
) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, usage);
  return buffer;
}

const createVertexArray = (gl, program, attributes) => {
  const vao = gl.createVertexArray();
  const names = Object.keys(attributes);

  gl.bindVertexArray(vao);

  for(let i = 0; i < names.length; i++) {
    let {
      size = 1,
      type = gl.FLOAT,
      normalize = false,
      stride = 0,
      offset = 0,
      buffer,
      data
    } = attributes[names[i]];

    if(data && !buffer) buffer = createBuffer(gl, data);

    gl.bindAttribLocation(program, i, names[i]);
    gl.enableVertexAttribArray(i);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(i, size, type, normalize, stride, offset);
  }

  return vao;
}

export { createVertexArray }