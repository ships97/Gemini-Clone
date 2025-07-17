import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../features/ui/uiSlice';

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-600',
};
const typeIcons = {
  success: '✔️',
  error: '❌',
  info: 'ℹ️',
};

const Toast = () => {
  const toast = useSelector((state) => state.ui.toast);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  let message = '';
  let type = 'info';
  if (typeof toast === 'string') {
    message = toast;
    type = 'info';
  } else if (typeof toast === 'object' && toast !== null && 'message' in toast) {
    message = toast.message;
    type = toast.type || 'info';
  } else {
    // fallback for invalid payloads
    message = String(toast);
    type = 'info';
  }

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-white flex items-center gap-3 animate-fade-in-up ${typeStyles[type] || typeStyles.info}`}
      style={{ minWidth: 220 }}
      role="alert"
      aria-live="assertive"
    >
      <span className="text-xl">{typeIcons[type] || typeIcons.info}</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast; 