"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D honeycomb: a field of hexagonal columns that ripple on their own,
 * rise and glow red around the pointer, and tilt as the page scrolls.
 */
export default function HiveScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the CSS background behind the canvas still shows.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x00020a, 10, 26);

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    const camBase = new THREE.Vector3(0, 9.5, 11.5);
    camera.position.copy(camBase);
    camera.lookAt(0, 0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0x2a1020, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(-6, 12, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe1013b, 2.2);
    rim.position.set(8, 3, -8);
    scene.add(rim);
    const glow = new THREE.PointLight(0xf40040, 40, 7, 1.6);
    glow.position.set(0, 2.2, 0);
    scene.add(glow);

    // Hex grid
    const R = 0.5;
    const cols = small ? 20 : 36;
    const rows = small ? 26 : 24;
    const count = cols * rows;
    const geo = new THREE.CylinderGeometry(R * 0.9, R * 0.9, 1, 6, 1);
    geo.translate(0, 0.5, 0); // grow from the floor
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.42 });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const w = Math.sqrt(3) * R;
    const h = 1.5 * R;
    const pos = new Float32Array(count * 2);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[i * 2] = (c - cols / 2) * w + (r % 2 ? w / 2 : 0);
        pos[i * 2 + 1] = (r - rows / 2) * h;
        i++;
      }
    }

    const dummy = new THREE.Object3D();
    const cDark = new THREE.Color(0x161a2a);
    const cMid = new THREE.Color(0x4a0819);
    const cRed = new THREE.Color(0xe1013b);
    const cHot = new THREE.Color(0xff2a5f);
    const tmp = new THREE.Color();
    const heights = new Float32Array(count).fill(0.2);

    // Pointer → ground plane
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2(9, 9);
    const target = new THREE.Vector3(999, 0, 999);
    const hover = new THREE.Vector3(999, 0, 999);
    let pointerActive = false;
    const camOffset = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerActive = e.clientY >= rect.top && e.clientY <= rect.bottom;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let scrollP = 0;
    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      scrollP = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      const { clientWidth: cw, clientHeight: ch } = mount;
      if (!cw || !ch) return;
      renderer.setSize(cw, ch);
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(0.1, clock.getDelta());
      const t = clock.elapsedTime;
      const ease = (rate: number) => 1 - Math.pow(1 - rate, dt * 60);

      // Pointer target (or an idle wandering point on touch / idle)
      if (pointerActive) {
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(plane, target);
      } else {
        target.set(Math.sin(t * 0.35) * 5, 0, Math.cos(t * 0.27) * 3);
      }
      hover.lerp(target, ease(0.08));
      glow.position.set(hover.x, 2.2, hover.z);

      for (let k = 0; k < count; k++) {
        const x = pos[k * 2];
        const z = pos[k * 2 + 1];
        const dx = x - hover.x;
        const dz = z - hover.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        const wave = Math.sin(x * 0.55 + t * 1.1) * Math.cos(z * 0.6 - t * 0.8) * 0.28 + 0.38;
        const lift = Math.max(0, 1 - d / 3.6);
        const ripple = Math.sin(d * 2.4 - t * 4) * 0.12 * lift;
        const goal = wave + lift * lift * 2.6 + ripple;
        heights[k] += (goal - heights[k]) * ease(0.12);
        const hh = Math.max(0.05, heights[k]);

        dummy.position.set(x, -0.6, z);
        dummy.scale.set(1, hh, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);

        const heat = Math.min(1, Math.max(0, (hh - 0.5) / 1.6));
        if (heat < 0.35) tmp.copy(cDark).lerp(cMid, heat / 0.35);
        else if (heat < 0.75) tmp.copy(cMid).lerp(cRed, (heat - 0.35) / 0.4);
        else tmp.copy(cRed).lerp(cHot, (heat - 0.75) / 0.25);
        mesh.setColorAt(k, tmp);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      // Camera: gentle parallax with the pointer + tilt with scroll
      camOffset.x += ((pointerActive ? ndc.x : 0) * 1.2 - camOffset.x) * ease(0.04);
      camOffset.y += ((pointerActive ? ndc.y : 0) * 0.6 - camOffset.y) * ease(0.04);
      camera.position.set(
        camBase.x + camOffset.x,
        camBase.y - scrollP * 4 + camOffset.y,
        camBase.z - scrollP * 3,
      );
      camera.lookAt(0, -scrollP * 2, -scrollP * 2);
      mesh.rotation.y = t * 0.02 + scrollP * 0.4;

      renderer.render(scene, camera);
    };

    if (reduce) {
      // Single static frame
      clock.start();
      frame();
      cancelAnimationFrame(raf);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className={className} />;
}
