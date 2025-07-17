import { createSlice } from '@reduxjs/toolkit';

const savedAuth = JSON.parse(localStorage.getItem('authState') || 'null');

const initialState = savedAuth || {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => { state.loading = true; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

const authReducer = (state, action) => {
  const newState = authSlice.reducer(state, action);
  localStorage.setItem('authState', JSON.stringify({
    user: newState.user,
    isAuthenticated: newState.isAuthenticated,
    loading: false,
    error: null,
  }));
  return newState;
};

export default authReducer; 