// components/Hero/GlassScene.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlassSceneProps {
  onFlipComplete: () => void;
}

export default function GlassScene({ onFlipComplete }: GlassSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHoverTag, setShowHoverTag] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isFlipped) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a0033);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xb19cd9, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create curved glass (using LatheGeometry for a wine glass-like shape)
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.3, 0.1));
    points.push(new THREE.Vector2(0.5, 0.3));
    points.push(new THREE.Vector2(0.55, 0.6));
    points.push(new THREE.Vector2(0.5, 1));
    points.push(new THREE.Vector2(0.3, 1.3));
    points.push(new THREE.Vector2(0.1, 1.4));

    const glassGeometry = new THREE.LatheGeometry(points, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa78bfa,
      transmission: 0.95,
      thickness: 0.8,
      roughness: 0.08,
      metalness: 0.05,
      ior: 1.5,
      side: THREE.DoubleSide,
    });

    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.castShadow = true;
    glass.receiveShadow = true;
    glass.scale.set(1.2, 1.2, 1.2);
    glassRef.current = glass;
    scene.add(glass);

    // Add shadow plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.z = -2;
    scene.add(plane);

    // Animation state
    let frameId: number;
    let rotationY = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isFlipped) {
        rotationY += 0.005;
        if (glass) {
          glass.rotation.y = rotationY;
          glass.rotation.x = Math.sin(rotationY * 0.5) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Click handler
    const handleClick = () => {
      if (!isFlipped && glassRef.current) {
        let scaleProgress = 0;
        const scaleInterval = setInterval(() => {
          scaleProgress += 0.05;
          const scale = 1.2 * (1 - scaleProgress);
          glassRef.current!.scale.set(scale, scale, scale);
          glassRef.current!.material.opacity = 1 - scaleProgress;

          if (scaleProgress >= 1) {
            clearInterval(scaleInterval);
            setIsFlipped(true);
            onFlipComplete();
          }
        }, 16);
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Hover detection with raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(glass);
      setShowHoverTag(intersects.length > 0 && !isFlipped);
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
    };
  }, [isFlipped, onFlipComplete]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ cursor: showHoverTag ? 'pointer' : 'default' }}
      />
      {showHoverTag && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-bold text-lg animate-bounce shadow-2xl">
            ✨ Click me
          </div>
        </div>
      )}
    </div>
  );
}