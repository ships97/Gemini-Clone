import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../features/ui/uiSlice';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  // On mount, sync with localStorage and system preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      if (saved === 'true' && !darkMode) dispatch(toggleDarkMode());
      if (saved === 'false' && darkMode) dispatch(toggleDarkMode());
    } else {
      // If no preference, use system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark && !darkMode) dispatch(toggleDarkMode());
    }
    // eslint-disable-next-line
  }, []);

  // Apply/remove dark class and persist to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <button
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded shadow z-50"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label="Toggle dark mode"
      type="button"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle; 