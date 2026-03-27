import { useEffect, useRef } from 'react';

/**
 * A simple hook for Three.js animation frames
 * @param {Function} callback - The function to call on each frame
 */
export const useFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(time, deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
