import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages, addMessage, deleteMessage } from '../../features/chat/chatSlice';
import { showToast } from '../../features/ui/uiSlice';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import SkeletonLoader from '../common/SkeletonLoader';
import { MESSAGES_PER_PAGE, FAKE_AI_DELAY, FAKE_TYPING_DELAY } from '../../utils/constants';

const dummyMessages = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  sender: i % 2 === 0 ? 'user' : 'ai',
  text: i % 2 === 0 ? `User message ${i + 1}` : `Gemini reply ${i + 1}`,
  timestamp: Date.now() - (100 - i) * 60000,
})).reverse();

const ChatWindow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allMessages = dummyMessages; // Use all messages for pagination
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(allMessages.length / MESSAGES_PER_PAGE);

  // Get messages for current page
  const paginatedMessages = allMessages.slice(
    (page - 1) * MESSAGES_PER_PAGE,
    page * MESSAGES_PER_PAGE
  );

  // Load messages for current page
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setMessages({ chatroomId: id, messages: paginatedMessages }));
      setLoading(false);
    }, 300);
  }, [id, page, paginatedMessages, dispatch]);

  const messages = useSelector((state) => state.chat.messages[id] || []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // Handle sending a message
  const handleSend = (text, image) => {
    const msg = {
      id: Date.now(),
      sender: 'user',
      text,
      image,
      timestamp: Date.now(),
    };
    dispatch(addMessage({ chatroomId: id, message: msg }));
    dispatch(showToast('Message sent!'));
    // Simulate AI typing and reply
    setAiTyping(true);
    setTimeout(() => {
      setAiTyping(false);
      setTimeout(() => {
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'This is a simulated Gemini AI reply.',
          timestamp: Date.now(),
        };
        dispatch(addMessage({ chatroomId: id, message: aiMsg }));
      }, FAKE_AI_DELAY);
    }, FAKE_TYPING_DELAY);
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId) => {
    dispatch(deleteMessage({ chatroomId: id, messageId }));
  };

  // Pagination controls
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[70vh] max-h-[80vh] border border-gray-200 dark:border-gray-700 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-hidden">
      <div
        className="flex-1 overflow-y-auto p-6"
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        <div ref={messagesEndRef} />
        {loading && <SkeletonLoader count={4} />}
        {messages.slice().reverse().map(msg => (
          <MessageItem key={msg.id} message={msg} onDelete={handleDeleteMessage} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-6 py-2 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-1 rounded-lg font-semibold transition-all ${page === 1 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-1 rounded-lg font-semibold transition-all ${page === totalPages ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
      {/* Prominent Typing Indicator */}
      {aiTyping && (
        <div className="flex items-center justify-start px-8 py-3">
          <div className="bg-blue-100 dark:bg-blue-800 border border-blue-300 dark:border-blue-700 rounded-2xl px-5 py-3 shadow-md flex items-center gap-3 animate-pulse">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-200">G</span>
            <span className="text-base font-semibold text-blue-700 dark:text-blue-100">Gemini is typing<span className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span><span className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span><span className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>...</span>
          </div>
        </div>
      )}
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow; 