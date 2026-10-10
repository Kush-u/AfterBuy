uniform float uTheme;
// Filled from CSS tokens (--accent-soft-rgb, --accent-rgb) by components/landing/ParticleField.tsx.
uniform vec3 uGlow;
uniform vec3 uGlowDeep;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.05, d);
  vec3 color = mix(uGlow, uGlowDeep, uTheme);
  gl_FragColor = vec4(color, glow * vAlpha * mix(0.85, 0.55, uTheme));
}
