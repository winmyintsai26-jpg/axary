export const starVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uAwakened;
  uniform float uMotion;
  uniform float uTravel;

  attribute float aSize;
  attribute float aPhase;
  attribute float aWarmth;

  varying float vGlow;
  varying float vWarmth;
  varying float vTravel;

  void main() {
    vec3 starPosition = position;
    float drift = uTime * 0.012 * uMotion;
    starPosition.x += sin(aPhase * 3.0 + drift) * 0.018;
    starPosition.y += cos(aPhase * 2.0 + drift) * 0.012;
    starPosition.z = mod(starPosition.z + uTime * uTravel * 8.0 + 14.0, 28.0) - 14.0;

    vec4 viewPosition = modelViewMatrix * vec4(starPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float twinkle = 0.68 + sin(uTime * (0.24 + aWarmth * 0.16) * uMotion + aPhase) * 0.22;
    vGlow = twinkle + uAwakened * 0.14;
    vWarmth = aWarmth;
    vTravel = uTravel;

    float perspective = 32.0 / max(1.0, -viewPosition.z);
    gl_PointSize = aSize * uPixelRatio * perspective * (0.9 + uAwakened * 0.12);
    gl_PointSize *= 1.0 + uTravel * 2.6;
  }
`

export const starFragmentShader = /* glsl */ `
  varying float vGlow;
  varying float vWarmth;
  varying float vTravel;

  void main() {
    vec2 streakPoint = gl_PointCoord - vec2(0.5);
    streakPoint.x *= 1.0 + vTravel * 4.5;
    streakPoint.y /= 1.0 + vTravel * 1.7;
    float distanceToCenter = length(streakPoint);
    float core = 1.0 - smoothstep(0.0, 0.48, distanceToCenter);
    float halo = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);

    vec3 moonlight = vec3(0.73, 0.82, 1.0);
    vec3 lantern = vec3(1.0, 0.78, 0.48);
    vec3 color = mix(moonlight, lantern, vWarmth * 0.42);

    float alpha = (core * 0.72 + halo * 0.28) * vGlow;
    gl_FragColor = vec4(color, alpha);
  }
`
