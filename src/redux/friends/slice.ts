import { createSlice } from "@reduxjs/toolkit";
import { getFriendsThunk } from "./operations";
import type { IFriends } from "../../types/friends";

interface IInitialState {
  items: IFriends[];
  isLoading: boolean;
  isError: boolean;
}

const friends: IInitialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const handlePending = (friends: IInitialState) => {
  friends.isLoading = true;
  friends.isError = false;
};

const handleRejected = (friends: IInitialState) => {
  friends.isLoading = false;
  friends.isError = true;
};

const friendsSlice = createSlice({
  name: "friends",
  initialState: friends,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFriendsThunk.pending, handlePending);
    builder.addCase(getFriendsThunk.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
    builder.addCase(getFriendsThunk.rejected, handleRejected);
  },
});

const friendsReducer = friendsSlice.reducer;

export default friendsReducer;
