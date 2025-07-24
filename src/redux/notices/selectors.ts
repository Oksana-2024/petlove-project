import type { StoreType } from "../store";

export const selectNotices = (state: StoreType) => state.notices.items;

export const selectQueryParams = (state: StoreType) => state.notices.queryParams;
export const selectCategory = (state: StoreType) => state.notices.category;
export const selectGenders = (state: StoreType) => state.notices.genders;
export const selectLocation = (state: StoreType) => state.notices.location;
export const selectPage = (state: StoreType) => state.notices.page;
export const selectTotalPages = (state: StoreType) => state.notices.totalPages;
export const selectSpecies = (state: StoreType) => state.notices.species;
