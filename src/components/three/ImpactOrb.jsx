import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ImpactOrb = () => {
  const containerRef = useRef();
  const mealCount = 1000; // This will later come from state/props
  const maxMeals = 10000;

  useEffect(() => {
    if (!containerRef.current) return;

    // Layer 1.4: Three.js Visual System (Minimal, High-Impact)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Performance & Quality (Layer 1.4)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(400, 400); // Orbit is typically in stats section
    containerRef.current.appendChild(renderer.domElement);

    // Layer 3.7 Scene 4: Impact Orb Implementation
    const sphereGeometry = new THREE.SphereGeometry(1.6, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x3D6B1F, // green-500
      emissive: 0x4F8A2A, // green-400
      opacity: 0.8,
      transparent: true,
      shininess: 100,
      specular: 0xffffff
    });

    const orbMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(orbMesh);

    // One PointLight (saffron) orbiting the sphere (Layer 3.7 spec)
    const light = new THREE.PointLight(0xD4821A, 20, 50); // Saffron light
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 5;

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      // Pulse animation: Math.sin(time * 2) * 0.05 added to scale (Layer 3.7)
      const baseScale = 1.0 + (mealCount / maxMeals) * 0.3;
      const pulse = Math.sin(time * 1.5) * 0.05;
      orbMesh.scale.set(baseScale + pulse, baseScale + pulse, baseScale + pulse);
      
      // Rotating light (Layer 3.7)
      light.position.x = Math.sin(time) * 4;
      light.position.y = Math.cos(time) * 4;
      light.position.z = Math.sin(time * 0.5) * 4;

      // Slow rotation
      orbMesh.rotation.y += 0.005;
      orbMesh.rotation.x += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mealCount, maxMeals]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'transparent',
        filter: 'drop-shadow(0 0 40px rgba(79, 138, 42, 0.2))'
      }} 
      aria-hidden="true"
    />
  );
};

export default ImpactOrb;
