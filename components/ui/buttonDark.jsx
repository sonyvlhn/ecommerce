'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Sincroniza estado com a classe 'dark' do HTML e com localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const hasDarkClass = document.documentElement.classList.contains('dark');
    if (stored === 'dark' || (!stored && hasDarkClass)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <div className="flex items-center justify-center scale-110">
      <button
        onClick={toggleTheme}
        className={`
          relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out
          bg-toggle-track
        `}
      >
        {/* A "Bolinha" do Toggle */}
        <div
          className={`
            bg-toggle-thumb w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center
            ${darkMode ? 'translate-x-6' : 'translate-x-0'}
          `}
        >
          {/* Ícones internos para um toque extra */}
          {darkMode ? (
            <MoonIcon className="w-3 h-3 text-toggle-moon" />
          ) : (
            <SunIcon className="w-3 h-3 text-toggle-sun" />
          )}
        </div>
        
        {/* Texto ou ícones de fundo (opcional) */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
           <SunIcon className={`w-3 h-3 text-toggle-thumb opacity-40 ${darkMode ? 'block' : 'hidden'}`} />
           <MoonIcon className={`w-3 h-3 text-toggle-thumb opacity-40 ${darkMode ? 'hidden' : 'block'}`} />
        </div>
      </button>
    </div>
  );
}