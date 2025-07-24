import { createSlice } from "@reduxjs/toolkit";
import type {
  ICategoryOption,
  IGenderOption,
  ISpeciesOption,
  IQueryParams,
  INoticesItem,
} from "../../types/notices";
import {
  getCategoryThunk,
  getCitiesThunk,
  getGenderThunk,
  getNoticesThunk,
  getTypeThunk,
} from "./operations";
import type { ICities } from "../../types/cities";

interface INotice {
  items: INoticesItem[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  queryParams: IQueryParams;
  location: { label: string; id: string }[];
  genders: IGenderOption[];
  category: ICategoryOption[];
  species: ISpeciesOption[];
}

const notices: INotice = {
  items: [],
  page: 1,
  queryParams: {
    keyword: "",
    category: "",
    sex: "",
    species: "",
    locationId: "",
  },
  totalPages: 0,
  isLoading: false,
  isError: false,
  location: [],
  category: [],
  genders: [],
  species: [],
};

const handlePending = (notices: INotice) => {
  notices.isLoading = true;
  notices.isError = false;
};

const handleRejected = (notices: INotice) => {
  notices.isLoading = false;
  notices.isError = true;
};

const noticesSlice = createSlice({
  name: "notices",
  initialState: notices,
  reducers: {
    setQueryParams(state, { payload }: { payload: IQueryParams }) {
      state.queryParams = payload;
    },
    setLocation(state, { payload }) {
      state.location = payload;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNoticesThunk.pending, handlePending)
      .addCase(getNoticesThunk.fulfilled, (state, { payload }) => {
        state.items = payload.results;
        state.page = payload.page;
        state.totalPages = payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getNoticesThunk.rejected, handleRejected)

      .addCase(getCitiesThunk.pending, handlePending)
      .addCase(
        getCitiesThunk.fulfilled,
        (state, { payload }: { payload: ICities[] }) => {
          state.location = payload.map(({ _id, stateEn, cityEn }) => ({
            label: `${stateEn}, ${cityEn}`,
            id: _id,
          }));
          state.isLoading = false;
        }
      )
      .addCase(getCitiesThunk.rejected, handleRejected)
      .addCase(getCategoryThunk.pending, handlePending)
      .addCase(
        getCategoryThunk.fulfilled,
        (state, { payload }: { payload: string[] }) => {
          state.category = payload.map((item) => ({
            label: item,
            id: item,
          }));
          state.isLoading = false;
        }
      )
      .addCase(getCategoryThunk.rejected, handleRejected)
      .addCase(getGenderThunk.pending, handlePending)
      .addCase(
        getGenderThunk.fulfilled,
        (state, { payload }: { payload: string[] }) => {
          state.genders = payload.map((item) => ({ label: item, id: item }));
          state.isLoading = false;
        }
      )
      .addCase(getGenderThunk.rejected, handleRejected)
      .addCase(getTypeThunk.pending, handlePending)
      .addCase(
        getTypeThunk.fulfilled,
        (state, { payload }: { payload: string[] }) => {
          state.species = payload.map((item) => ({ label: item, id: item }));
          state.isLoading = false;
        }
      )
      .addCase(getTypeThunk.rejected, handleRejected);
  },
});

const noticesReducer = noticesSlice.reducer;
export const {
  setLocation: setLocationNotice,
  setQueryParams: setNoticeQueryParams,
  setPage: setNoticePage,
} = noticesSlice.actions;

export default noticesReducer;
