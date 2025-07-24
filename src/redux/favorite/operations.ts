import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAxios } from "../../service/api";
import type { StoreType } from "../store";
import type { AxiosError } from "axios";

export const addFavoriteThunk = createAsyncThunk(
  "/favorites/add",
  async (_id: string, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as StoreType).user;
      const { data } = await createAxios(token).post(
        `/notices/favorites/add/${_id}`
      );
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";
      if (status === 400) {
        message = backendMessage || "This id is not valid";
      } else if (status === 404) {
        message = backendMessage || "This notice is not found in notices";
      } else if (status === 409) {
        message =
          backendMessage ||
          "This notice has already added to user's favorite notices";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFavoriteThunk = createAsyncThunk(
  "/favorites/remove",
  async (_id: string, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as StoreType).user;
      const { data } = await createAxios(token).delete(
        `/notices/favorites/remove/${_id}`
      );
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";
      if (status === 400) {
        message = backendMessage || "This id is not valid";
      } else if (status === 404) {
        message = backendMessage || "This notice is not found in notices";
      } else if (status === 409) {
        message =
          backendMessage ||
          "This notice is not found in user's favorite notices";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);
