import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SuperObject = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const aspect = 1; // Square canvas
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    camera.position.z = 4.5;

    // Renderer (transparent background)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Compact size for the hero section
    const size = window.innerWidth < 768 ? 80 : 120;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Dynamic Geometry: Torus Knot for a "super" intricate look
    const geometry = new THREE.TorusKnotGeometry(1, 0.35, 128, 16);
    
    // Stylized glowing tech material
    const material = new THREE.MeshStandardMaterial({
      color: 0xD4821A,      // Saffron theme
      emissive: 0x4a2000,   // Low inner glow
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true       // Gives it an analytical tech/hologram look
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Complex, constant, "super moving" rotation
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      mesh.rotation.z += 0.005;
      
      // Gentle floating up and down
      mesh.position.y = Math.sin(Date.now() * 0.002) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="super-object-container"
      style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pointerEvents: 'none' // Don't block clicks from UI underneath
      }} 
    />
  );
};

export default SuperObject;
