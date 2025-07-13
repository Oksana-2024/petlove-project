import clsx from "clsx";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerThunk } from "../../redux/user/operations";
import { useAppDispatch } from "../../hook/useDispatch";
import { registerValidationSchema } from "../../helpers/validationSchema";
import Icon from "../Icon/Icon";
import BaseButton from "../BaseButton/BaseButton";

import s from "./RegisterForm.module.css";

export interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterCredentials = Omit<IFormInput, "confirmPassword">;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<IFormInput>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerValidationSchema),
    mode: "all",
  });

  const passwordForm = watch("password");

  useEffect(() => {
    if (!passwordForm) return;
    trigger("confirmPassword");
  }, [passwordForm, trigger]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { name, email, password } = data as IFormInput;
      await dispath(registerThunk({ name, email, password })).unwrap();

      navigate("/home");
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message:
          typeof error === "string"
            ? error
            : "Something went wrong. Please try again.",
      });
    }
  };

  const inputStatus = (field: keyof IFormInput) => {
    if (dirtyFields[field] || touchedFields[field])
      return errors[field] ? s.inputError : s.inputSuccess;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formStyles}>
      <h2 className={s.title}>Registration</h2>
      <p className={s.text}>Thank you for your interest in our platform.</p>
      <div className={s.inputWrapper}>
        <input
          className={clsx(s.inputReg, inputStatus("name"))}
          {...register("name")}
          placeholder="Name"
        />
        <div className={s.errorWrapper}>
          {errors.name && (
            <p className={s.error}>Error: {errors.name.message}</p>
          )}
        </div>
        {errors.name && (
          <Icon name="icon-cross-small" className={s.iconError} size={22} />
        )}
        {!errors.name && (dirtyFields.name || touchedFields.name) && (
          <Icon name="icon-check" className={s.iconSuccess} size={22} />
        )}
      </div>
      <div className={s.inputWrapper}>
        <input
          className={clsx(s.inputReg, inputStatus("email"))}
          {...register("email")}
          placeholder="Email"
        />
        <div className={s.errorWrapper}>
          {errors.email && (
            <p className={s.error}>Error: {errors.email.message}</p>
          )}
        </div>

        {errors.email && (
          <Icon name="icon-cross-small" className={s.iconError} size={22} />
        )}
        {!errors.email && (dirtyFields.email || touchedFields.email) && (
          <Icon name="icon-check" className={s.iconSuccess} size={22} />
        )}
      </div>
      <div className={s.inputWrapper}>
        <input
          className={clsx(s.inputReg, inputStatus("password"))}
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <div className={s.errorWrapper}>
          {errors.password && (
            <p className={s.error}>Error: {errors.password.message}</p>
          )}
          {(dirtyFields.password || touchedFields.password) &&
            !errors.password && <p className={s.secure}> Password is secure</p>}
        </div>
        <button
          type="button"
          className={s.togglePassButton}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <Icon name="icon-eye" className={s.eyeIcon} size={18} />
          ) : (
            <Icon name="icon-eye-off" className={s.eyeIcon} size={18} />
          )}
        </button>
        {errors.password && (
          <Icon
            name="icon-cross-small"
            className={s.iconPasswordError}
            size={18}
          />
        )}
        {!errors.password &&
          (dirtyFields.password || touchedFields.password) && (
            <Icon
              name="icon-check"
              className={s.iconPasswordSuccess}
              size={18}
            />
          )}
      </div>
      <div className={s.inputWrapper}>
        <input
          className={clsx(s.inputReg, inputStatus("confirmPassword"))}
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
        />
        <div className={s.errorWrapper}>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        
          {(dirtyFields.confirmPassword || touchedFields.confirmPassword) &&
            !errors.confirmPassword && (
              <p className={s.match}> Passwords match</p>
            )}
        </div>
        <button
          type="button"
          className={s.togglePassButton}
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? (
            <Icon name="icon-eye" className={s.eyeIcon} size={18} />
          ) : (
            <Icon name="icon-eye-off" className={s.eyeIcon} size={18} />
          )}
        </button>
        {errors.confirmPassword && (
          <Icon
            name="icon-cross-small"
            className={s.iconPasswordError}
            size={16}
          />
        )}
        {!errors.confirmPassword &&
          (dirtyFields.confirmPassword || touchedFields.confirmPassword) && (
            <Icon
              name="icon-check"
              className={s.iconPasswordSuccess}
              size={16}
            />
          )}
      </div>

      <BaseButton text="registration" style={s.registrationBtn} />
      <p className={s.textLink}>
        Already have an account?
        <Link to="/login" className={s.link}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
