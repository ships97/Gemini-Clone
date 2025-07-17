import React from 'react';
import CopyToClipboard from '../common/CopyToClipboard';
import PropTypes from 'prop-types';

const MessageItem = ({ message, onDelete }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 items-end group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center mr-2 text-blue-700 dark:text-blue-100 font-bold text-lg select-none">
          G
        </div>
      )}
      <div className={`relative max-w-xs p-3 rounded-2xl shadow-md ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'} transition-all`}>
        {message.image && (
          <img src={message.image} alt="uploaded" className="mb-2 max-h-32 rounded-lg" />
        )}
        <span>{message.text}</span>
        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <CopyToClipboard text={message.text} />
        </div>
        {/* <button
          className="absolute top-2 right-2 text-red-400 hover:text-red-700 bg-white dark:bg-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs border border-red-200 dark:border-red-700"
          style={{zIndex: 10}}
          onClick={() => onDelete(message.id)}
          aria-label="Delete message"
        >
          ✕
        </button> */}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 text-white font-bold text-lg select-none">
          U
        </div>
      )}
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MessageItem; 