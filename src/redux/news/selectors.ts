import type { StoreType } from "../store";

export const selectNews = (state: StoreType) => state.news.items;
export const selectQuery = (state: StoreType) => state.news.query;
export const selectIsLoading = (state: StoreType) => state.news.isLoading;
export const selectPage = (state: StoreType) => state.news.page;
export const selectTotalPage = (state: StoreType) => state.news.totalPages;
