import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteThunk,
  currentUser,
  getUser,
  loginThunk,
  logoutUserThunk,
  registerThunk,
  removeFavoriteThunk,
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
  favorites: string[];
  isLoggedIn: boolean;
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
  favorites: [],
  noticesFavorites: [],
  noticesViewed: [],
  pets: [],
  isLoggedIn: false,
  isLoading: false,
  isError: false,
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
  reducers: {},

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
      .addCase(logoutUserThunk.pending, handlePending)
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isLoggedIn = false;
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
        state.favorites = payload.noticesFavorites.map(
          ({ _id }: { _id: string }) => _id
        );
        state.noticesViewed = payload.noticesViewed;
        state.pets = payload.pets;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
        console.log("avatarUpdatetUser", state.avatar);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(addFavoriteThunk.pending, handlePending)
      .addCase(addFavoriteThunk.fulfilled, (state, { payload }) => {
        state.favorites = payload;
      })
      .addCase(addFavoriteThunk.rejected, handleRejected)
      .addCase(removeFavoriteThunk.pending, handlePending)
      .addCase(removeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.favorites = payload;
      })
      .addCase(removeFavoriteThunk.rejected, handleRejected);
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
