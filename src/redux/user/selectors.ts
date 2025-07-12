import type { StoreType } from "../store";

export const selectIsLoggedIn = (state: StoreType) => state.user.isLoggedIn;

export const selectUser = (state: StoreType) => state.user;

export const selectName = (state: StoreType) => state.user.name;

export const selectEmail = (state: StoreType) => state.user.email;

export const selectAvatar = (state: StoreType) => state.user.avatar;

export const selectPhone = (state: StoreType) => state.user.phone;

export const selectPets = (state: StoreType) => state.user.pets;

export const selectToken = (state: StoreType) => state.user.token;

export const selectisLoading = (state: StoreType) => state.user.isLoading;

export const selectFavorites = (state: StoreType) =>
  state.user.noticesFavorites;

export const selectViewed = (state: StoreType) => state.user.noticesViewed;

export const selectComfirmLogout = (state: StoreType) =>
  state.user.isComfirmLogout;
