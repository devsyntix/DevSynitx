"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for interactive rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core: Glowing Dodecahedron / Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d2ff,
      emissive: 0x0047ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Wireframe Cage around Core
    const cageGeometry = new THREE.IcosahedronGeometry(1.75, 1);
    const cageWireframe = new THREE.WireframeGeometry(cageGeometry);
    const cageMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.55,
      linewidth: 1.5,
    });
    const cageMesh = new THREE.LineSegments(cageWireframe, cageMaterial);
    mainGroup.add(cageMesh);

    // 3. Outer Orbiting Gyroscope Rings (Cyan & Violet)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6366f1,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 4. Floating Data Nodes / Satellites
    const nodeCount = 14;
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
    });
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const theta = (i / nodeCount) * Math.PI * 2;
      const radius = 2.1 + (i % 3) * 0.2;
      mesh.position.set(
        Math.cos(theta) * radius,
        (Math.sin(theta * 2) * radius) / 3,
        Math.sin(theta) * radius
      );
      nodeGroup.add(mesh);
    }
    mainGroup.add(nodeGroup);

    // 5. Starfield / Cyber Particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Mix cyan and violet
      const isCyan = Math.random() > 0.5;
      particleColors[i * 3] = isCyan ? 0.0 : 0.54;
      particleColors[i * 3 + 1] = isCyan ? 0.82 : 0.36;
      particleColors[i * 3 + 2] = isCyan ? 1.0 : 0.96;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a0a20, 2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0066ff, 15, 20);
    blueLight.position.set(-4, 3, 4);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 15, 20);
    cyanLight.position.set(4, -3, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 12, 20);
    violetLight.position.set(0, 4, -2);
    scene.add(violetLight);

    // Mouse Tracking with smooth Lerp
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Group rotation (auto + mouse lerp)
      mainGroup.rotation.y = elapsedTime * 0.25 + currentX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + currentY;

      // Individual object internal movements
      coreMesh.rotation.y = elapsedTime * -0.3;
      coreMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;

      cageMesh.rotation.y = elapsedTime * 0.4;
      cageMesh.rotation.x = elapsedTime * 0.2;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.3;

      nodeGroup.rotation.y = elapsedTime * -0.5;

      // Subtle particle float
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Pulsing lights
      blueLight.intensity = 12 + Math.sin(elapsedTime * 2) * 3;
      cyanLight.intensity = 12 + Math.cos(elapsedTime * 2) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-85"
      aria-hidden="true"
    />
  );
}
