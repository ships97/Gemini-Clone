import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/auth', label: 'Auth' },
  { to: '/chat/:id', label: 'Chat' },
];

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full flex justify-center py-4 bg-white/80 dark:bg-gray-900/80 shadow-sm sticky top-0 z-40 backdrop-blur">
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold transition-all duration-150 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800/60 hover:text-blue-700 dark:hover:text-blue-300 ${
                isActive || location.pathname === item.to ? 'bg-blue-500 text-white dark:bg-blue-600' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header; 