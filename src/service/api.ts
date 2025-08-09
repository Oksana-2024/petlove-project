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

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "secure_frontend_upload");
  formData.append("folder", "secure_frontend_upload");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dkuvpejwj/image/upload",
    formData
  );

  return response.data.secure_url;
}
