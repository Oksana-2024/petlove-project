import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StoreType } from "../store";
import { createAxios } from "../../service/api";
import type { AxiosError } from "axios";

export const getNoticesThunk = createAsyncThunk(
  "notices",
  async (_, thunkAPI) => {
    try {
      const { page, queryParams } = (thunkAPI.getState() as StoreType).notices;
      const { data } = await createAxios().get("/notices", {
        params: {
          page: page,
          perPage: 6,
          ...queryParams,
        },
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
  }
);

export const getCitiesThunk = createAsyncThunk(
  "cities",
  async (_, thunkAPI) => {
    try {
      const { data } = await createAxios().get("/cities/locations");
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
  }
);

export const getCategoryThunk = createAsyncThunk(
  "category",
  async (_, thunkAPI) => {
    try {
      const { data } = await createAxios().get("/notices/categories");
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
  }
);

export const getGenderThunk = createAsyncThunk(
  "gender",
  async (_, thunkAPI) => {
    try {
      const { data } = await createAxios().get("/notices/sex");
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
  }
);

export const getTypeThunk = createAsyncThunk("type", async (_, thunkAPI) => {
  try {
    const { data } = await createAxios().get("/notices/species");
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
