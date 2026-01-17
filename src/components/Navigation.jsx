'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authUtils } from '@/lib/auth';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authUtils.isLoggedIn());
  }, []);

  const handleLogout = () => {
    authUtils.logout();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group logo-container" onClick={closeMobileMenu}>
          <div className="relative">
            {/* Modern geometric logo - black and white */}
            <div className="w-10 h-10 bg-black rounded-xl rotate-12 transition-transform duration-300 logo-primary"></div>
            <div className="absolute inset-0 w-10 h-10 bg-gray-800 rounded-xl -rotate-12 transition-transform duration-300 opacity-80 logo-secondary"></div>
            <div className="absolute inset-2 w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">
              ModernApp
            </h2>
            <p className="text-xs text-gray-600 -mt-1">Math Solutions</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/items" className="nav-link">
            Math Topics
          </Link>
          {isLoggedIn && (
            <Link href="/add-item" className="nav-link">
              Add Topic
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-5 border-gray-200 shadow-lg">
          <nav className="container py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/items" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Math Topics
            </Link>
            {isLoggedIn && (
              <Link 
                href="/add-item" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Add Topic
              </Link>
            )}
            
            {/* Mobile Auth Button */}
            <div className="pt-2 border-t border-gray-200 mt-2">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="block px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}