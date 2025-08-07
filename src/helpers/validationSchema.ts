import { date, object, preprocess, string } from "zod";

export const registerValidationSchema = object({
  name: string()
    .min(2, "Minimum length is 2 characters")
    .max(20, "Maximum length is 20 characters"),
  email: string()
    .max(32, "Email is too long")
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .nonempty("Email is required"),
  password: string().min(7, "Minimum length is 7 characters"),
  confirmPassword: string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginValidationSchema = object({
  email: string()
    .max(32, "Email is too long")
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .nonempty("Email is required"),
  password: string().min(7, "Minimum length is 7 characters"),
});

export const userUpdateSchema = object({
  name: string()
    .min(2, "Minimum length is 2 characters")
    .max(20, "Maximum length is 20 characters")
    .optional(),
  email: string()
    .max(32, "Email is too long")
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .nonempty("Email is required")
    .optional(),
  phone: string()
    .regex(/^\+38\d{10}$/, "Invalid phone format")
    .optional(),
  avatar: string()
    .regex(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Image URL must end with .png, .jpg, .jpeg, .gif, .bmp, or .webp."
    )
    .optional(),
});

export const petValidationSchema = object({
  name: string().nonempty("Name is required"),
  title: string().nonempty("Title is required"),
  imgURL: string()
    .nonempty("Image URL is required")
    .regex(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Image URL must end with .png, .jpg, .jpeg, .gif, .bmp, or .webp."
    ),
  species: object({
    label: string().nonempty("Species is required"),
    id: string().nonempty("Species is required"),
  })
    .nullable()
    .refine((val) => !!val?.id, { message: "Species is required" }),
  birthday: preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    date().refine((val) => !!val, {
      message: "Birthday is required",
    })
  ),
  sex: string()
    .nullable()
    .refine((val) => val !== null && val !== "", {
      message: "Choose type of gender",
    }),
});
