import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Real photographic images of ingredients
const ingredientImages = [
  '/assets/curry_leaf.png'
];

const particles = Array.from({ length: 35 }).map((_, i) => ({
  id: `real-ingredient-${i}`,
  image: ingredientImages[0], // Only use leaves
  size: Math.random() * 55 + 25, // 25px to 80px size for better depth perception
  startX: Math.random() * 100,
  xOffset: (Math.random() - 0.5) * 40, // Wider sway
  duration: Math.random() * 25 + 20, // Falling slightly faster than floating up (20s to 45s)
  delay: Math.random() * -60,
  opacity: Math.random() * 0.4 + 0.3, // Make them a bit more visible since it's just leaves
  depth: Math.random() * 3 + 0.5, // 0.5 to 3.5 depth
  rotation: Math.random() * 360,
  rotationSpeed: (Math.random() - 0.5) * 180, // Smooth continuous rotation
  blur: Math.random() * 4.5 // 0px to 4.5px blur for cinematic depth of field
}));

const FallingLeaves = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      // Smoother mouse tracking by reducing the influence slightly
      const x = (e.clientX / window.innerWidth - 0.5) * 1.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 1.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            x: mousePos.x * 50 * particle.depth,
            y: mousePos.y * 50 * particle.depth,
          }}
          transition={{ type: 'spring', stiffness: 20, damping: 30 }} // Softer spring for mouse movement
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
        >
          <motion.div
            initial={{ y: '-20vh', x: `${particle.startX}vw`, opacity: 0, rotate: particle.rotation }}
            animate={{ 
              y: '120vh', // Ensure it falls completely down out of view
              x: `${particle.startX + particle.xOffset}vw`,
              opacity: [0, particle.opacity, particle.opacity, 0],
              rotate: particle.rotation + particle.rotationSpeed
            }}
            transition={{ 
              y: { duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'linear' },
              x: { duration: particle.duration / 2.5, repeat: Infinity, delay: particle.delay, ease: 'easeInOut', repeatType: 'mirror' },
              opacity: { duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' },
              rotate: { duration: particle.duration * 1.2, repeat: Infinity, delay: particle.delay, ease: 'linear' }
            }}
            style={{ 
              position: 'absolute', 
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              filter: `blur(${particle.blur}px)`, // Cinematic blur effect
              mixBlendMode: 'multiply' // Makes the white background of the images completely transparent
            }}
          >
            <img 
              src={particle.image} 
              alt="" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain'
              }} 
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
