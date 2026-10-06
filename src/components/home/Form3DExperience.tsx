"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Form3DExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4, 0.8], ["40px", "0px", "-30px"]);

  // Lazy initialize scene when intersecting
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Warm Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf5efe6, 2.5);
    dirLight1.position.set(5, 8, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4d8db, 1.4);
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    // Sculptural Monolithic Garment Form (Brutalist draped toroid/cloak curve)
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.48, 128, 32, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x141312,
      roughness: 0.85,
      metalness: 0.1,
      bumpScale: 0.05,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      if (!prefersReducedMotion) {
        // Derive scroll-based rotation
        const scrollVal = scrollYProgress.get();
        targetRotationY = scrollVal * Math.PI * 2.2 + mouseX;
        targetRotationX = scrollVal * 0.8 + mouseY;

        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isIntersecting, prefersReducedMotion, scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] lg:min-h-[110vh] bg-[#F3F4F3]/50 border-t border-[#E5E5E3] overflow-hidden flex items-center justify-center py-20"
    >
      {/* 3D Canvas Viewport */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-[1200px] max-h-[850px] cursor-grab active:cursor-grabbing"
          data-cursor="drag"
        />
      </div>

      {/* Floating Architectural Narrative Overlay */}
      <Container className="relative z-10 pointer-events-none">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-xl mx-auto text-center space-y-5"
        >
          <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#767674] block">
            [SCULPTURAL STUDY // FORM IN MOTION]
          </span>

          <h2
            className="text-[#0D0D0D] font-light leading-[0.92] tracking-[-0.03em] uppercase"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)" }}
          >
            FORM
            <br />
            IN MOTION.
          </h2>

          <p className="text-sm text-[#767674] font-light max-w-sm mx-auto leading-relaxed">
            Engineered silhouettes sculpted in space. Interact to inspect volumetric proportion, weave density, and dynamic drape.
          </p>

          <div className="pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#0D0D0D]">
            DRAG TO ROTATE // SCROLL TO PROGRESS
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
