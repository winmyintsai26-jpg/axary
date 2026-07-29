export const waterVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMotion;
  varying vec2 vUv;
  varying float vRipple;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float ripple = sin((position.x + position.y) * 13.0 + uTime * 0.45) * 0.012;
    ripple += cos(position.x * 18.0 - uTime * 0.32) * 0.006;
    transformed.z += ripple * uMotion;
    vRipple = ripple;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

export const waterFragmentShader = /* glsl */ `
  uniform vec3 uDeepColor;
  uniform vec3 uLightColor;
  varying vec2 vUv;
  varying float vRipple;

  void main() {
    float edge = smoothstep(0.52, 0.12, distance(vUv, vec2(0.5)));
    vec3 color = mix(uDeepColor, uLightColor, vUv.y * 0.45 + vRipple * 4.0);
    gl_FragColor = vec4(color, 0.82 * edge);
  }
`
