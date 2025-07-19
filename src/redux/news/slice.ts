import { createSlice } from "@reduxjs/toolkit";
import type { INewsItem } from "../../types/news";
import { getNewsThunk } from "./operations";

export interface INews {
  items: INewsItem[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  query: string;
}
const news: INews = {
  items: [],
  page: 1,
  totalPages: 0,
  isLoading: false,
  isError: false,
  query: "",
};

const handlePending = (news: INews) => {
  news.isLoading = true;
  news.isError = false;
};

const handleRejected = (news: INews) => {
  news.isLoading = false;
  news.isError = true;
};

const newsSlice = createSlice({
  name: "news",
  initialState: news,
  reducers: {
    setSearch(state, { payload }) {
      state.query = payload;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNewsThunk.pending, handlePending);
    builder.addCase(getNewsThunk.fulfilled, (state, { payload }) => {
      state.items = payload.results;
      state.page = payload.page;
      state.totalPages = payload.totalPages;
      state.isLoading = false;
    });
    builder.addCase(getNewsThunk.rejected, handleRejected);
  },
});

const newsReducer = newsSlice.reducer;

export default newsReducer;
export const { setSearch, setPage } = newsSlice.actions;
