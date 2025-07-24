import type { StoreType } from "../store";

export const selectFavorites = (state: StoreType) => state.favorites.items;
