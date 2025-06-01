import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FiShield, FiSearch, FiFilePlus } from 'react-icons/fi';

export default function FeatureGrid() {
  const features = [
    {
      icon: <FiShield className="w-8 h-8 text-purple-600" />,
      title: "Risk Detection",
      description: "Automatically identify potential legal risks and problematic clauses"
    },
    {
      icon: <FiSearch className="w-8 h-8 text-blue-600" />,
      title: "Entity Recognition",
      description: "Extract key entities like organizations, people, and dates"
    },
    {
      icon: <FiFilePlus className="w-8 h-8 text-green-600" />,
      title: "Smart Summary",
      description: "Generate concise document summaries using AI"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <animated.div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          style={useSpring({
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0 },
            delay: index * 100
          })}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-opacity-20 rounded-lg mr-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
          </div>
          <p className="text-gray-600">{feature.description}</p>
        </animated.div>
      ))}
    </div>
  );
}