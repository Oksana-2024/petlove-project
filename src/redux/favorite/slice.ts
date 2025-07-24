import { createSlice } from "@reduxjs/toolkit";

import { addFavoriteThunk, removeFavoriteThunk } from "./operations";

interface IFavorites {
  isLoading: boolean;
  isError: boolean;
  items: string[];
}

const favorites: IFavorites = {
  items: [],
  isLoading: false,
  isError: false,
};

const handlePending = (friends: IFavorites) => {
  friends.isLoading = true;
  friends.isError = false;
};

const handleRejected = (friends: IFavorites) => {
  friends.isLoading = false;
  friends.isError = true;
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: favorites,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteThunk.pending, handlePending)
      .addCase(addFavoriteThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addFavoriteThunk.rejected, handleRejected)
      .addCase(removeFavoriteThunk.pending, handlePending)
      .addCase(removeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(removeFavoriteThunk.rejected, handleRejected);
  },
});

const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;
