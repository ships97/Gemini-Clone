import { createSlice } from '@reduxjs/toolkit';

const savedChat = JSON.parse(localStorage.getItem('chatState') || 'null');

const initialState = savedChat || {
  chatrooms: [],
  messages: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatrooms: (state, action) => { state.chatrooms = action.payload; },
    addChatroom: (state, action) => { state.chatrooms.push(action.payload); },
    deleteChatroom: (state, action) => {
      state.chatrooms = state.chatrooms.filter(room => room.id !== action.payload);
    },
    setMessages: (state, action) => {
      const { chatroomId, messages } = action.payload;
      state.messages[chatroomId] = messages;
    },
    addMessage: (state, action) => {
      const { chatroomId, message } = action.payload;
      state.messages[chatroomId] = [...(state.messages[chatroomId] || []), message];
    },
    deleteMessage: (state, action) => {
      const { chatroomId, messageId } = action.payload;
      state.messages[chatroomId] = (state.messages[chatroomId] || []).filter(msg => msg.id !== messageId);
    },
  },
});

export const { setChatrooms, addChatroom, deleteChatroom, setMessages, addMessage, deleteMessage } = chatSlice.actions;

const chatReducer = (state, action) => {
  const newState = chatSlice.reducer(state, action);
  localStorage.setItem('chatState', JSON.stringify({
    chatrooms: newState.chatrooms,
    messages: newState.messages,
    loading: false,
    error: null,
  }));
  return newState;
};

export default chatReducer; 