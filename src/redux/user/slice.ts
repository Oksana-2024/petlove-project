import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteThunk,
  addPets,
  currentUser,
  deletePetById,
  getUser,
  loginThunk,
  logoutUserThunk,
  registerThunk,
  removeFavoriteThunk,
  updateUser,
} from "./operations";
import type { INoticesItem } from "../../types/notices";
import type { IPet } from "../../types/pets";

interface IUser {
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  token: string | null;
  noticesFavorites: INoticesItem[];
  noticesViewed: INoticesItem[];
  favorites: string[];
  isLoggedIn: boolean;
  pets: IPet[];
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
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, handleRejected)
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.pending, handlePending)
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(currentUser.pending, handlePending)
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.noticesFavorites = payload.noticesFavorites;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        if (payload === 401) {
          state.token = null;
          state.isLoggedIn = false;
          state.isLoading = false;
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
        state.favorites = payload.noticesFavorites.map(({ _id }: IPet) => _id);
        state.noticesViewed = payload.noticesViewed;
        state.pets = payload.pets;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        if (payload === 401) {
          state.token = null;
          state.isLoggedIn = false;
          state.isLoading = false;
        }
      })
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(addFavoriteThunk.pending, handlePending)
      .addCase(addFavoriteThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favorites = payload;
      })
      .addCase(addFavoriteThunk.rejected, handleRejected)
      .addCase(removeFavoriteThunk.pending, handlePending)
      .addCase(removeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favorites = payload;
      })
      .addCase(removeFavoriteThunk.rejected, handleRejected)
      .addCase(addPets.pending, handlePending)
      .addCase(addPets.fulfilled, (state, { payload }) => {
        state.pets = payload.pets;
        state.isLoading = false;
      })
      .addCase(addPets.rejected, handleRejected)
      .addCase(deletePetById.pending, handlePending)
      .addCase(deletePetById.fulfilled, (state, { payload }) => {
        state.pets = payload.pets;
        state.isLoading = false;
      })
      .addCase(deletePetById.rejected, handleRejected);
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
