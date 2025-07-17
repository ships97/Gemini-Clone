import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatRoomItem = ({ room, onDelete }) => {
  const navigate = useNavigate();
  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer group focus-within:ring-2 focus-within:ring-blue-400">
      <span
        onClick={() => navigate(`/chat/${room.id}`)}
        className="flex-1 font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate"
        tabIndex={0}
        role="button"
        aria-label={`Open chatroom ${room.title}`}
      >
        {room.title}
      </span>
      <button
        className="ml-4 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900 px-3 py-1 rounded-lg font-semibold transition-all"
        onClick={() => onDelete(room.id)}
        aria-label="Delete chatroom"
      >
        Delete
      </button>
    </li>
  );
};

export default ChatRoomItem; 