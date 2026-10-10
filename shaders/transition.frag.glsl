uniform float uProgress;
uniform float uTime;
// Filled from CSS tokens (--void-rgb, --accent-rgb, --sky-rgb) by components/landing/WipeCanvas.tsx.
uniform vec3 uInk;
uniform vec3 uRimA;
uniform vec3 uRimB;
varying vec2 vUv;

void main() {
  float wave = sin(vUv.x * 9.0 + uTime * 1.3) * 0.04 + sin(vUv.x * 21.0 - uTime * 0.8) * 0.015;
  float y = vUv.y + wave;
  float edge = abs(y - (1.0 - uProgress));
  float rim = smoothstep(0.07, 0.0, edge);
  float haze = smoothstep(0.28, 0.0, edge);
  float shift = 0.5 + 0.5 * sin(vUv.x * 8.0 + uTime);
  vec3 color = mix(uInk, mix(uRimA, uRimB, shift), rim);
  float alpha = haze * 0.18 + rim * 0.92;
  alpha *= smoothstep(0.0, 0.06, uProgress) * smoothstep(1.0, 0.94, uProgress);
  gl_FragColor = vec4(color, alpha);
}
