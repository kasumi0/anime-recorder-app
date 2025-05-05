"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./particle.module.css";
const { particlesArea } = styles;

const randomPastelColor = () => {
  const hue = Math.random() * 120;
  return `hsl(${hue + 160}, 70%, 70%)`;
};

const Box = ({ click }: { click: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const maxRange = 9;
  const initialPosition = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * maxRange * 2,
      (Math.random() - 0.5) * maxRange * 2,
      (Math.random() - 0.5) * maxRange * 2
    )
  );
  const [time] = useState(() => new THREE.Clock());
  const color = useRef(randomPastelColor()).current;
  const isWireframe = useRef(Math.random() < 0.5).current;
  const geometryArgs = useRef<[number, number, number]>([2, 2, 2]).current;

  const direction = useRef(Math.random() < 0.5 ? 1 : -1).current;
  const rotationSpeed = useRef(0.005 * direction).current;

  useEffect(() => {
    if (ref.current) {
      ref.current.position.copy(initialPosition.current);
    }
  }, []);

  useFrame(() => {
    if (ref.current) {
      if (click) {
        velocity.current.set(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        );
      }
      ref.current.position.add(velocity.current);
      velocity.current.multiplyScalar(0.99);

      ref.current.rotation.y += rotationSpeed;

      const floatSpeed = 0.7;
      const floatAmplitude = 0.008;
      ref.current.position.y +=
        Math.sin(time.getElapsedTime() * floatSpeed) * floatAmplitude;

      ref.current.position.x = Math.max(
        Math.min(ref.current.position.x, maxRange),
        -maxRange
      );
      ref.current.position.y = Math.max(
        Math.min(ref.current.position.y, maxRange),
        -maxRange
      );
      ref.current.position.z = Math.max(
        Math.min(ref.current.position.z, maxRange),
        -maxRange
      );
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={geometryArgs} />
      <meshStandardMaterial wireframe={isWireframe} color={color} />
    </mesh>
  );
};

export const ParticleBG = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    setTimeout(() => setClick(false), 100);
  };

  return (
    <div onClick={handleClick} className={particlesArea}>
      <Canvas camera={{ position: [0, 0, 16] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2.6} />
        {Array.from({ length: 30 }).map((_, i) => (
          <Box key={i} click={click} />
        ))}
      </Canvas>
    </div>
  );
};
