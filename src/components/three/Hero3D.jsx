import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let nodes = [];

    // Minimal Setup (Reduced from 300 to 120 for an elegant, uncluttered background)
    const nodeCount = 120;
    const nodeGeometry = new THREE.IcosahedronGeometry(0.25, 1);
    
    // Core Saffron Theme Color
    const nodeColor = new THREE.Color(0xD4821A);

    for (let i = 0; i < nodeCount; i++) {
        const nodeMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: true,
            opacity: 0.6
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30
        );
        node.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.04,
            (Math.random() - 0.5) * 0.04,
            (Math.random() - 0.5) * 0.04
        );
        node.rotationSpeed = (Math.random() - 0.5) * 0.02;
        nodes.push(node);
        scene.add(node);
    }

    // Connections Line Material - Muted Saffron
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xD4821A,
        transparent: true,
        opacity: 0.15
    });
    const connections = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(connections);

    // Subtle background dust particles (White to match text)
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositions[i] = (Math.random() - 0.5) * 80;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.2
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Ambient Lighting
    const light1 = new THREE.PointLight(0xD4821A, 2, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    let targetCameraPos = new THREE.Vector3(0, 0, 25);

    const onMouseMove = (event) => {
        // Subtle Parallax effect on mouse move
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        targetCameraPos.x = mouse.x * 6;
        targetCameraPos.y = mouse.y * 6;
    };
    
    window.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
        if (!containerRef.current) return;
        const nw = containerRef.current.clientWidth;
        const nh = containerRef.current.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
        frameId = requestAnimationFrame(animate);

        // Slow camera pan lerping
        camera.position.lerp(targetCameraPos, 0.02);
        camera.lookAt(0, 0, 0);

        // Animate nodes and restrict to boundary box
        nodes.forEach(node => {
            node.position.add(node.velocity);
            node.rotation.x += node.rotationSpeed;
            node.rotation.y += node.rotationSpeed;
            
            // Keep nodes within a spherical radius
            if (node.position.length() > 35) {
                node.velocity.multiplyScalar(-1); // Reverse direction if out of bounds
            }
        });

        // Compute Network Euclidean distances & Build connection lines
        const positions = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                if (dist < 9) {
                    positions.push(
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    );
                }
            }
        }
        connections.geometry.dispose();
        connections.geometry = new THREE.BufferGeometry();
        connections.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        // Rotate background particle dust slowly
        particleSystem.rotation.y += 0.0005;

        renderer.render(scene, camera);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(frameId);
        
        nodeGeometry.dispose();
        lineMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        nodes.forEach(n => n.material.dispose());
        
        renderer.dispose();
        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
        }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hero-3d-bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
};

export default Hero3D;
