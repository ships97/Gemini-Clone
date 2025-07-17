import React, { useState } from 'react';
import ChatRoomList from '../components/chat/ChatRoomList';
import SearchBar from '../components/common/SearchBar';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const chatrooms = useSelector(state => state.chat.chatrooms);
  const [filteredChatrooms, setFilteredChatrooms] = useState(chatrooms);

  React.useEffect(() => {
    setFilteredChatrooms(chatrooms);
  }, [chatrooms]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-2">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl mt-8 shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center tracking-tight">Your Chatrooms</h1>
        <SearchBar chatrooms={chatrooms} setFilteredChatrooms={setFilteredChatrooms} />
        <ChatRoomList chatrooms={filteredChatrooms} />
      </div>
    </div>
  );
};

export default DashboardPage; 