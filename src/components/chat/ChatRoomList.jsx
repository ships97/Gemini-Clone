import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChatroom, deleteChatroom } from '../../features/chat/chatSlice';
import { showToast } from '../../features/ui/uiSlice';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = ({ chatrooms }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newRoom = { id: Date.now().toString(), title: newTitle };
    dispatch(addChatroom(newRoom));
    dispatch(showToast('Chatroom created!'));
    setNewTitle('');
  };

  const handleDelete = (id) => {
    dispatch(deleteChatroom(id));
    dispatch(showToast('Chatroom deleted!'));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col h-[60vh] max-h-[60vh] min-w-0">
      {/* Fixed top: Search and Create */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pb-2">
        <form onSubmit={handleCreate} className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="New chatroom title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 rounded-lg font-semibold shadow transition-all duration-200">Create</button>
        </form>
      </div>
      {/* Scrollable chatroom list */}
      <div className="flex-1 overflow-auto max-h-full max-w-full">
        <ul className="space-y-2 min-w-[350px]">
          {chatrooms.map(room => (
            <ChatRoomItem key={room.id} room={room} onDelete={handleDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoomList; 