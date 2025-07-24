import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAxios } from "../../service/api";
import type { AxiosError } from "axios";
import type { StoreType } from "../store";

export const getNewsThunk = createAsyncThunk("news", async (_, thunkAPI) => {
  try {
    const { page, query } = (thunkAPI.getState() as StoreType).news;
    const { data } = await createAxios().get("/news", {
      params: { page: page, keyword: query, perPage: 6 },
    });
    return data;
  } catch (error) {
    const status = (error as AxiosError).status;
    const backendMessage = (error as AxiosError).message;

    let message = "Something went wrong. Please try again later.";
    if (status === 404) {
      message = backendMessage || "Service not found";
    } else if (status === 500) {
      message = backendMessage || "Server error";
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const loadMoreNews = createAsyncThunk("news", async (_, thunkApi) => {
  try {
    const { query, page } = (thunkApi.getState() as StoreType).news;
    const { data } = await createAxios().get("/news", {
      params: {
        keyword: query,
        page: Number(page) + 1,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";
      if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      return thunkApi.rejectWithValue(message);
    }
  }
});
