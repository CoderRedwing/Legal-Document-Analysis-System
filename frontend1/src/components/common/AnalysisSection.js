import React from 'react';
import { useSpring, animated } from '@react-spring/web';

export default function AnalysisSection({ title, icon, content }) {
  const springs = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 }
  });

  return (
    <animated.div style={springs} className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          {React.cloneElement(icon, { className: "w-6 h-6 text-purple-600" })}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {typeof content === 'string' ? (
        <p className="text-gray-600 leading-relaxed">{content}</p>
      ) : (
        <div className="h-64">{content}</div>
      )}
    </animated.div>
  );
}