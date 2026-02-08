import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import type { UserState } from "../../types/types";
import { initialState } from "../../types/types";

export const loginUser = createAsyncThunk<
  UserState,
  { username: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    const data: UserState = {
      id: response.data.userId,
      name: response.data.userName,
      token: response.data.access_token,
    };

    localStorage.setItem("token", data.token || "");
    localStorage.setItem("userId", String(data.id));

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk<
  { username: string; userId?: number },
  { username: string; password: string },
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/users/register", credentials);
    return {
      username: response.data.username,
      userId: response.data.id,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});


const tokenFromStorage = localStorage.getItem("token");
const userIdFromStorage = localStorage.getItem("userId");

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
    token: tokenFromStorage || null,
    id: userIdFromStorage ? Number(userIdFromStorage) : null,
  },
  reducers: {
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
        localStorage.removeItem("token");
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ username: string; userId?: number }>) => {
        state.id = action.payload.userId || null;
        state.name = action.payload.username;
        state.token = null;
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
