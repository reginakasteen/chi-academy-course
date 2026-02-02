import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../api/axiosInstance';
import type { UserState } from '../../types/types';
import { initialState } from '../../types/types';

export const loginUser = createAsyncThunk<
  UserState,
  { email: string; password: string }, 
  { rejectValue: string }
>('user/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const data: UserState = response.data;

      localStorage.setItem('token', data.token || '');
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<
  UserState,
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  'user/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/register', credentials);
      const data: UserState = response.data;

      localStorage.setItem('token', data.token || '');
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state) => {
        state.id = null;
        state.name = null;
        state.token = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state) => {
        state.id = null;
        state.name = null;
        state.token = null;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;