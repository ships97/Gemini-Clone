import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode; },
    showToast: (state, action) => {
      if (typeof action.payload === 'string') {
        state.toast = { message: action.payload, type: 'info' };
      } else {
        state.toast = action.payload;
      }
    },
    hideToast: (state) => { state.toast = null; },
  },
});

export const { toggleDarkMode, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer; 