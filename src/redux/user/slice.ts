import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  getUser,
  loginThunk,
  logoutUser,
  registerThunk,
  updateUser,
} from "./operations";

interface IUser {
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  token: string | null;
  noticesFavorites: [];
  noticesViewed: [];
  isLoggedIn: boolean;
  isComfirmLogout: boolean;
  pets: [];
  isLoading: boolean;
  isError: boolean;
}

const user: IUser = {
  name: null,
  email: null,
  phone: null,
  avatar: null,
  token: null,
  noticesFavorites: [],
  noticesViewed: [],
  pets: [],
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isComfirmLogout: false,
};

const handlePending = (user: IUser) => {
  user.isLoading = true;
  user.isError = false;
};

const handleRejected = (user: IUser) => {
  user.isLoading = false;
  user.isError = true;
};

const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    },

  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, handlePending)
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerThunk.rejected, handleRejected)
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        if (action.payload === 401) {
          state.name = null;
          state.email = null;
          state.token = null;
          state.isLoggedIn = false;
        }
      })
      .addCase(currentUser.pending, handlePending)
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.noticesFavorites = payload.noticesFavorites;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        if (payload === 401) {
          state.token = null;
          state.isLoggedIn = false;
        }
      })
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.phone = payload.phone;
        state.token = payload.token;
        state.noticesFavorites = payload.noticesFavorites;
        state.noticesViewed = payload.noticesViewed;
        state.pets = payload.pets;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
      })
      .addCase(updateUser.rejected, handleRejected);
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
