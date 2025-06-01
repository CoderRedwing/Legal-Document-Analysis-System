import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import NavLink from './NavLink';

export default function NavBar() {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 0 },
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.nav style={springs} className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LegalMate
            </span>
          </Link>
          <div className="flex space-x-4">
            <NavLink to="/" text="Home" />
            <NavLink to="/documents" text="Documents" />
          </div>
        </div>
      </div>
    </animated.nav>
  );
}