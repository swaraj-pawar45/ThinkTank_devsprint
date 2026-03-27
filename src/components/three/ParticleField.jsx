import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from './threeUtils'; // We'll create a simple hook for this

const ParticleField = () => {
  const containerRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Layer 3.4 Performance Check
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 480 : 800; // Layer 3.7 spec
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Layer 1.4 Performance & Quality
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Layer 3.7 Particle Setup
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLE_COUNT * 3);
    const initialPosArray = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      // Map-like distribution roughly (Layer 3.7)
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 5;
      posArray[i] = x;
      initialPosArray[i] = x;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Layer 1.4 Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.08,
      color: 0xD4821A, // Saffron
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Layer 3.7 Drift and Interaction Logic
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        
        // Gentle drift (Layer 3.7 spec)
        positions[i3] += Math.sin(Date.now() * 0.001 + i) * 0.002;
        positions[i3 + 1] += Math.cos(Date.now() * 0.001 + i) * 0.002;

        // Interaction with mouse/scroll (Layer 3.2 specification)
        // Lerp toward center/points based on scroll
        const scrollFactor = Math.min(scrollY.current / 500, 1);
        positions[i3] *= (1 - scrollFactor * 0.01);
        positions[i3 + 1] *= (1 - scrollFactor * 0.01);
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      particlesMesh.rotation.y += 0.0003; // Constant slow drift
      particlesMesh.rotation.x += mouse.current.y * 0.05;
      particlesMesh.rotation.y += mouse.current.x * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      // Layer 1.4: Disposal
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none',
        opacity: 0.4
      }} 
      aria-hidden="true"
    />
  );
};

export default ParticleField;
