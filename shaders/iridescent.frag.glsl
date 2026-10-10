uniform float uTime;
uniform float uHover;
uniform float uTheme;
// Palette uniforms are filled from CSS tokens by components/landing/HeroObject.tsx.
uniform vec3 uAccent;
uniform vec3 uSky;
uniform vec3 uWarm;
uniform vec3 uDeep;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 3.0);

  float t = sin(uTime * (0.5 + uHover * 1.6) + vPosition.y * 2.0) * 0.5 + 0.5;
  vec3 color = mix(mix(uAccent, uSky, t), uWarm, fresnel * 0.65);
  color = mix(uDeep, color, 0.82 + uHover * 0.12);
  color += fresnel * uSky * 0.22 * (0.4 + uHover);
  color = mix(color, color * 0.62, uTheme * 0.45);

  float alpha = mix(0.84, 1.0, fresnel);
  gl_FragColor = vec4(color, alpha);
}
