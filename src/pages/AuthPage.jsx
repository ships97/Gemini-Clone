import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
    <AuthForm />
  </div>
);

export default AuthPage; 