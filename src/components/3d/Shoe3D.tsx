"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";

interface Shoe3DProps {
  modelPath?: string;
  scrollProgress?: number; // 0.0 to 1.0
  mouseOffset?: { x: number; y: number }; // normalized -1 to 1
  scale?: number;
  onError?: () => void;
}

// Internal GLTF Model Loader with Center & Normalization
function ShoeModel({
  modelPath,
  scrollProgress = 0,
  mouseOffset = { x: 0, y: 0 },
  scale = 1,
}: {
  modelPath: string;
  scrollProgress?: number;
  mouseOffset?: { x: number; y: number };
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Enable shadows and physical materials on model meshes
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Scroll-based rotation progression:
    // 0%: 3/4 front (~20 deg / 0.35 rad)
    // 50%: side profile (~90 deg / 1.57 rad)
    // 100%: settled showcase (~160 deg / 2.8 rad)
    const targetRotY = 0.35 + scrollProgress * 2.5 + mouseOffset.x * 0.25;
    const targetRotX = mouseOffset.y * 0.15;

    // Smooth physical damping
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );

    // Subtle natural floating bob (amplitude 0.04)
    groupRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.04;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Center top={false}>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export function Shoe3D({
  modelPath = "/models/demonstation-shoe.glb",
  scrollProgress = 0,
  mouseOffset = { x: 0, y: 0 },
  scale = 1,
  onError,
}: Shoe3DProps) {
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);

  // Check if model exists on the server before mounting R3F
  useEffect(() => {
    let active = true;
    fetch(modelPath, { method: "HEAD" })
      .then((res) => {
        if (!active) return;
        if (res.ok && res.status !== 404) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
          onError?.();
        }
      })
      .catch(() => {
        if (!active) return;
        setModelAvailable(false);
        onError?.();
      });
    return () => {
      active = false;
    };
  }, [modelPath, onError]);

  if (!modelAvailable) {
    return null;
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.4, 3.2], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      className="w-full h-full"
    >
      {/* ── Soft Studio Lighting Setup ── */}
      {/* Warm Ambient Fill */}
      <ambientLight intensity={0.9} color="#FAF7F2" />

      {/* Primary Key Light (Upper Left, Warm Soft Studio Shadow) */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-bias={-0.0005}
      />

      {/* Rim / Fill Light (Lower Right, Neutral Highlight) */}
      <directionalLight position={[-4, -1, -3]} intensity={0.9} color="#DDE0E2" />

      {/* Top Overhead Light */}
      <directionalLight position={[0, 5, 0]} intensity={0.6} color="#FFFFFF" />

      {/* Gentle Studio Shadow Receiver Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.12} />
      </mesh>

      <Suspense fallback={null}>
        <ShoeModel
          modelPath={modelPath}
          scrollProgress={scrollProgress}
          mouseOffset={mouseOffset}
          scale={scale}
        />
      </Suspense>
    </Canvas>
  );
}
