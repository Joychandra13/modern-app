'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authUtils } from '@/lib/auth';
import { FiMail, FiPhone, FiGlobe } from 'react-icons/fi';

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authUtils.isLoggedIn());
  }, []);

  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-white rounded-lg rotate-12"></div>
                <div className="absolute inset-0 w-8 h-8 bg-gray-300 rounded-lg -rotate-12 opacity-80"></div>
                <div className="absolute inset-1.5 w-5 h-5 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">ModernApp</h3>
                <p className="text-xs text-gray-400">Math Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Master mathematics with our comprehensive collection of math topics and solutions for every level.
            </p>
            {isLoggedIn && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                You are logged in
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/items" className="text-gray-300 hover:text-white transition-colors">
                  Math Topics
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/add-item" className="text-gray-300 hover:text-white transition-colors">
                    Add Topic
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FiMail className="text-white" />
                support@modernapp.com
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-white" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <FiGlobe className="text-white" />
                www.modernapp.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ModernApp. All rights reserved. Built with Next.js
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}