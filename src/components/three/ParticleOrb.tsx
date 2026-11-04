"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixel;
  attribute float aRand;
  varying float vGlow;

  // cheap 3D noise
  vec3 hash3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
  float noise(vec3 p){
    vec3 i = floor(p); vec3 f = fract(p); vec3 u = f*f*(3.0-2.0*f);
    return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)), dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
                   mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)), dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
               mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)), dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
                   mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)), dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
  }

  void main(){
    vec3 p = position;
    float n = noise(p * 1.6 + uTime * 0.35);
    float pull = 0.28 * dot(normalize(p.xy), uMouse);
    p *= 1.0 + n * 0.32 + pull;
    vGlow = smoothstep(-0.2, 0.6, n + pull);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aRand * 2.4 + vGlow * 2.0) * uPixel * (6.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  varying float vGlow;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 deep = vec3(0.55, 0.0, 0.05);
    vec3 hot = vec3(1.0, 0.25, 0.42);
    gl_FragColor = vec4(mix(deep, hot, vGlow), a * (0.35 + vGlow * 0.65));
  }
`;

/** A breathing sphere of red particles that leans toward the pointer. */
export default function ParticleOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 50);
    camera.position.z = 6;

    const N = window.innerWidth < 768 ? 4500 : 9000;
    const positions = new Float32Array(N * 3);
    const rand = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      // Fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      positions[i * 3] = Math.cos(th) * r * 1.6;
      positions[i * 3 + 1] = y * 1.6;
      positions[i * 3 + 2] = Math.sin(th) * r * 1.6;
      rand[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uPixel: { value: dpr },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(() => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(mouse.clone().clampLength(0, 1), 0.06);
      points.rotation.y = t * 0.12 + uniforms.uMouse.value.x * 0.4;
      points.rotation.x = -uniforms.uMouse.value.y * 0.3;
      renderer.render(scene, camera);
    };
    tick();
    if (reduce) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} aria-hidden className={className} />;
}
