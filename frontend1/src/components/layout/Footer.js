import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer 
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f8f0ff 100%)',
      }}
      className="border-t border-gray-200 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          {/* Contact Information */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Us</h3>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/ratanyadav3" 
                className="text-gray-600 hover:text-purple-600"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/"
                className="text-gray-600 hover:text-purple-600"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:contact@legalmate.com"
                className="text-gray-600 hover:text-purple-600"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} LegalMate. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Developed by Group-04, REC Bijnor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;