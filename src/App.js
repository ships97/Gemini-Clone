import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ChatRoomPage from './pages/ChatRoomPage';
import DarkModeToggle from './components/common/DarkModeToggle';
import Toast from './components/common/Toast';
import Header from './components/common/Header';

function App() {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle />
      <Header />
      <Toast />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App; 