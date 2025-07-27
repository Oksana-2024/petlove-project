import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAxios } from "../../service/api";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { StoreType } from "../store";
import type { RegisterCredentials } from "../../components/RegisterForm/RegisterForm";
import type { ILoginForm } from "../../components/LoginForm/LoginForm";

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const { data } = await createAxios().post("/users/signup", credentials);
      toast.success(`Welcome, ${data.name}!`);
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";

      if (status === 400) {
        message = backendMessage || "Invalid request body";
      } else if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 409) {
        message =
          backendMessage || "The user already exists. Please try another one";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials: ILoginForm, thunkAPI) => {
    try {
      const { data } = await createAxios().post("/users/signin", credentials);
      toast.success(`Welcome back, ${data.name}!`);
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";

      if (status === 400) {
        message = backendMessage || "Invalid request body";
      } else if (status === 401) {
        message = backendMessage || "Email or password invalid";
      } else if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 500) {
        message = backendMessage || "Server Error";
      }

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      const { token } = (thunkApi.getState() as StoreType).user;
      const { data } = await createAxios(token).post("/users/signout");
      toast.success("User has been logout");
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";

      if (status === 401) {
        toast.info("User has been logout");
        return;
      } else if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const currentUser = createAsyncThunk(
  "user/current",
  async (_, thunkApi) => {
    try {
      const { token } = (thunkApi.getState() as StoreType).user;
      const { data } = await createAxios(token).get("/users/current");
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";

      if (status === 401) {
        message = backendMessage || "Unauthorized";
      } else if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }

      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("user/full", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as StoreType;
    const { token } = state.user;
    const { data } = await createAxios(token).get("/users/current/full");
    return data;
  } catch (error) {
    const status = (error as AxiosError).status;
    const backendMessage = (error as AxiosError).message;

    let message = "Something went wrong. Please try again later.";

    if (status === 401) {
      message = backendMessage || "Unauthorized";
    } else if (status === 404) {
      message = backendMessage || "Service not found";
    } else if (status === 500) {
      message = backendMessage || "Server error";
    }

    toast.error(message);
    return thunkApi.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (newUser, thunkApi) => {
    try {
      const state = thunkApi.getState() as StoreType;
      const { token } = state.user;
      const { data } = await createAxios(token).patch(
        "/users/current/edit",
        newUser
      );
      return data;
    } catch (error) {
      const status = (error as AxiosError).status;
      const backendMessage = (error as AxiosError).message;

      let message = "Something went wrong. Please try again later.";

      if (status === 400) {
        message = backendMessage || "invalid request body";
      } else if (status === 404) {
        message = backendMessage || "Service not found";
      } else if (status === 409) {
        message = backendMessage || "User with such an email is already exist";
      } else if (status === 500) {
        message = backendMessage || "Server error";
      }
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addPets = createAsyncThunk("pets/add", async (pet, thunkApi) => {
  try {
    const token = (thunkApi.getState() as StoreType).user.token;
    const { data } = await createAxios(token).post(
      "/users/current/pets/add",
      pet
    );
    return data;
  } catch (error) {
    const status = (error as AxiosError).status;
    const backendMessage = (error as AxiosError).message;

    let message = "Something went wrong. Please try again later.";

    if (status === 400) {
      message = backendMessage || "invalid request body";
    } else if (status === 404) {
      message = backendMessage || "Service not found";
    } else if (status === 500) {
      message = backendMessage || "Server error";
    }
    toast.error(message);
    return thunkApi.rejectWithValue(message);
  }
});
