import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
      loading: true,
      error: null,
    };

    Cookies.set("token", data.token || "");
    Cookies.set("userId", String(data.id));

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


const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      token: null,
      id: null,
    };
  }

  const Cookies = require("js-cookie");

  return {
    token: Cookies.get("token") || null,
    id: Cookies.get("userId")
      ? Number(Cookies.get("userId"))
      : null,
  };
};


const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
    ...getInitialAuthState(),
  },

  reducers: {
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      Cookies.remove("token");
      Cookies.remove("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.loading = false;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.id = null;
        state.name = null;
        state.token = null;

        Cookies.remove("token");
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ username: string; userId?: number }>) => {
          state.loading = false;
          state.id = action.payload.userId || null;
          state.name = action.payload.username;
          state.token = null;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.id = null;
        state.name = null;
        state.token = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
