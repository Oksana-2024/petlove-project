import { createAsyncThunk } from "@reduxjs/toolkit";

import { useAxios } from "../../service/api";
import type { AxiosError } from "axios";

export const getFriendsThunk = createAsyncThunk(
  "/friends",
  async (_, thunkAPI) => {
    try {
      const { data } = await useAxios().get("/friends");
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
