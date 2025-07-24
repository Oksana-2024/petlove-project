import axios from "axios";

export const createAxios = (token?: string | null) => {
  const baseAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://petlove.b.goit.study/api",

    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return baseAxios;
};


