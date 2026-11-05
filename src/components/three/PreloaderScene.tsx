"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type PreloaderSceneApi = { exit: () => Promise<void> };

/**
 * The hive assembling itself: hexagonal cells fly in from the dark and lock into a
 * honeycomb as `progress` (0..1) rises. The centre cell turns brand red; on exit the
 * camera flies through it.
 */
export default function PreloaderScene({
  progress,
  apiRef,
  className = "",
}: {
  progress: React.RefObject<number>;
  apiRef: React.RefObject<PreloaderSceneApi | null>;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    const small = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 200);
    const camZ = small ? 30 : 24;
    camera.position.set(0, 0, camZ);

    scene.add(new THREE.AmbientLight(0x3a3f55, 1.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-6, 8, 12);
    scene.add(key);
    const red = new THREE.PointLight(0xf40040, 60, 18, 1.6);
    red.position.set(0, 0, 5);
    scene.add(red);

    // Honeycomb cluster: axial coordinates within radius R, ordered as a spiral from the centre.
    const R = 4;
    const size = 1;
    const cells: { q: number; r: number; d: number; a: number }[] = [];
    for (let q = -R; q <= R; q++)
      for (let r = Math.max(-R, -q - R); r <= Math.min(R, -q + R); r++) {
        const x = size * Math.sqrt(3) * (q + r / 2);
        const y = size * 1.5 * r;
        cells.push({ q, r, d: Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r)), a: Math.atan2(y, x) });
      }
    cells.sort((A, B) => A.d - B.d || A.a - B.a);
    const N = cells.length;

    const geo = new THREE.CylinderGeometry(size * 0.9, size * 0.9, 0.55, 6, 1);
    geo.rotateX(Math.PI / 2); // face the camera
    geo.rotateZ(Math.PI / 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.45, roughness: 0.32 });
    const mesh = new THREE.InstancedMesh(geo, mat, N);
    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);

    const target = cells.map((c) => new THREE.Vector3(size * Math.sqrt(3) * (c.q + c.r / 2), size * 1.5 * c.r, 0));
    const rnd = (a: number) => (Math.random() - 0.5) * a;
    const start = cells.map(() => new THREE.Vector3(rnd(40), rnd(26), -30 - Math.random() * 30));
    const spin = cells.map(() => new THREE.Euler(rnd(6), rnd(6), rnd(6)));
    const t = new Float32Array(N); // 0..1 arrival per cell
    const flash = new Float32Array(N);

    const dummy = new THREE.Object3D();
    const cBase = new THREE.Color(0x161b2e);
    const cEdge = new THREE.Color(0x232a45);
    const cRed = new THREE.Color(0xe1013b);
    const cHot = new THREE.Color(0xff5a7e);
    const col = new THREE.Color();

    const pointer = new THREE.Vector2();
    const onMove = (e: PointerEvent) => pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    addEventListener("pointermove", onMove, { passive: true });
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    addEventListener("resize", onResize);

    let exitT = -1; // <0 = not exiting
    let exitResolve: (() => void) | null = null;
    apiRef.current = {
      exit: () =>
        new Promise<void>((res) => {
          exitT = 0;
          exitResolve = res;
        }),
    };

    const clock = new THREE.Clock();
    let raf = 0;
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, clock.getDelta());
      const time = clock.elapsedTime;
      const p = Math.min(1, Math.max(0, progress.current ?? 0));
      const arrived = p * N;

      for (let i = 0; i < N; i++) {
        const goal = i < arrived ? 1 : 0;
        const before = t[i];
        t[i] += (goal - t[i]) * (1 - Math.pow(0.0009, dt)); // ~fast critically damped
        if (before < 0.9 && t[i] >= 0.9) flash[i] = 1;
        flash[i] *= Math.pow(0.04, dt);

        const k = ease(t[i]);
        const pos = dummy.position.copy(start[i]).lerp(target[i], k);
        // gentle breathing wave once assembled
        pos.z += Math.sin(time * 1.6 - cells[i].d * 0.7) * 0.18 * k;
        dummy.rotation.set(spin[i].x * (1 - k), spin[i].y * (1 - k), spin[i].z * (1 - k));
        const s = 0.25 + 0.75 * k;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        if (i === 0) col.copy(cBase).lerp(cRed, Math.min(1, p * 1.6));
        else col.copy(cells[i].d % 2 ? cEdge : cBase);
        col.lerp(cHot, flash[i] * 0.85);
        mesh.setColorAt(i, col);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      group.rotation.y += (pointer.x * 0.35 + Math.sin(time * 0.4) * 0.12 - group.rotation.y) * 0.05;
      group.rotation.x += (-pointer.y * 0.25 + 0.18 - group.rotation.x) * 0.05;
      red.position.x = Math.sin(time * 0.9) * 4;
      red.position.y = Math.cos(time * 0.7) * 3;

      if (exitT >= 0) {
        exitT = Math.min(1, exitT + dt / 1.05);
        const e = exitT * exitT * exitT;
        camera.position.z = camZ - (camZ - 0.4) * e;
        group.rotation.x *= 1 - e;
        group.rotation.y *= 1 - e;
        red.intensity = 60 + 400 * e;
        if (exitT >= 1 && exitResolve) {
          exitResolve();
          exitResolve = null;
        }
      }
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", onResize);
      apiRef.current = null;
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress, apiRef]);

  return <div ref={mountRef} aria-hidden className={className} />;
}
