import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <motion.img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-90 object-contain cursor-pointer" 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button 
              className="text-white focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`sm:flex sm:space-x-6 sm:items-center fixed sm:static top-16 left-0 w-full sm:w-auto bg-black/80 sm:bg-transparent p-6 sm:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
            {['Events', 'Contact Us', 'About Us'].map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-[rgba(255,255,255,0.77)] transition-colors block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* Register Button */}
            <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0">
              <motion.button
                className="px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { window.location.href = '/registration'; setIsOpen(false); }}
              >
                Register 
              </motion.button>
              {/* Update Details Button */}
              <motion.button
                className="px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { window.location.href = '/update-user'; setIsOpen(false); }}
              >
                Update Details
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
