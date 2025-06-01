import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

export default function NavLink({ to, text }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const underlineStyles = useSpring({
    width: isHovered ? '100%' : '0%',
    config: { tension: 300, friction: 20 }
  });

  return (
    <Link 
      to={to}
      className="relative px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <animated.div
        style={{
          ...underlineStyles,
          height: '2px',
          backgroundColor: '#7c3aed',
          position: 'absolute',
          bottom: 0,
          left: 0
        }}
      />
    </Link>
  );
}