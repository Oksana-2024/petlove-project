import type { StoreType } from "../store";

export const selectFriends = (state: StoreType) => state.friends.items;