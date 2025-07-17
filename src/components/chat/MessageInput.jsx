import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    onSend(text, image);
    setText('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSend} className="flex items-center p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 gap-2">
      <ImageUpload image={image} setImage={setImage} />
      <input
        type="text"
        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100"
        placeholder="Type a message..."
        value={text}
        onChange={e => setText(e.target.value)}
        aria-label="Type a message"
      />
      <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200">Send</button>
    </form>
  );
};

export default MessageInput; 