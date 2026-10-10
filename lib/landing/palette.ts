/**
 * @file lib/landing/palette.ts
 *
 * Reads AfterBuy colour tokens from CSS custom properties for WebGL code.
 *
 * Three.js cannot consume `var(--x)` directly, but the brand rule is that every
 * colour lives in app/globals.css. These helpers resolve the `*-rgb` channel
 * tokens (for example `--accent-rgb: 45 212 191`) at runtime so shaders and
 * materials follow the active dark/light theme without any hardcoded hex.
 * Used by the landing crystal, backdrop, and the studio-lit 3D scenes.
 *
 * @module Landing
 */

import * as THREE from 'three';

/** Fallback used only if a token is missing (e.g. during isolated tests): a neutral mid grey. */
const MISSING_TOKEN_CHANNELS: readonly [number, number, number] = [128, 128, 128];

const CHANNEL_SPLIT = /[\s,/]+/;

/**
 * Reads a space-separated `r g b` channel token as 0–255 integers.
 *
 * @param tokenName - Custom property name including leading dashes, e.g. `--accent-rgb`.
 * @returns The three channels; a neutral grey if the token is absent or malformed.
 */
function readChannels(tokenName: string): readonly [number, number, number] {
  if (typeof document === 'undefined') {
    return MISSING_TOKEN_CHANNELS;
  }
  const raw = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  const parts = raw.split(CHANNEL_SPLIT).map(Number);
  const [red, green, blue] = parts;
  if (
    parts.length < 3 ||
    red === undefined ||
    green === undefined ||
    blue === undefined ||
    [red, green, blue].some((channel) => Number.isNaN(channel))
  ) {
    return MISSING_TOKEN_CHANNELS;
  }
  return [red, green, blue];
}

/**
 * Resolves a channel token into a colour for Three.js materials and lights.
 *
 * The channels are authored as sRGB, so they are converted into the renderer's
 * linear working space the same way a CSS colour would be.
 *
 * @param tokenName - Channel token such as `--accent-rgb`.
 * @returns A new THREE.Color in the working colour space.
 */
export function readTokenColor(tokenName: string): THREE.Color {
  const [red, green, blue] = readChannels(tokenName);
  return new THREE.Color().setRGB(red / 255, green / 255, blue / 255, THREE.SRGBColorSpace);
}

/**
 * Resolves a channel token into raw 0–1 values for custom GLSL uniforms.
 *
 * Our ShaderMaterials write straight to the framebuffer (`toneMapped: false`),
 * so they expect the sRGB numbers as authored, with no linear conversion.
 *
 * @param tokenName - Channel token such as `--sky-rgb`.
 * @param target - Existing colour to overwrite so uniforms keep a stable reference.
 * @returns The same `target`, updated in place.
 */
export function writeTokenUniform(tokenName: string, target: THREE.Color): THREE.Color {
  const [red, green, blue] = readChannels(tokenName);
  // INVARIANT: LinearSRGBColorSpace is the working space, so setRGB stores the values unmodified.
  return target.setRGB(red / 255, green / 255, blue / 255, THREE.LinearSRGBColorSpace);
}
