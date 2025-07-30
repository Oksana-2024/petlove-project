import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook/useDispatch";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../helpers/validationSchema";
import { loginThunk } from "../../redux/user/operations";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import BaseButton from "../BaseButton/BaseButton";
import s from "./LoginForm.module.css";

export interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<ILoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginValidationSchema),
    mode: "all",
  });

  const passwordForm = watch("password");
  useEffect(() => {
    if (!passwordForm) return;
    trigger("password");
  }, [passwordForm, trigger]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const { email, password } = data as ILoginForm;
      await dispath(loginThunk({ email, password })).unwrap();
      navigate("/profile");
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

  const inputStatus = (field: keyof ILoginForm) => {
    if (dirtyFields[field] || touchedFields[field])
      return errors[field] ? s.inputError : s.inputSuccess;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formStyles}>
      <h2 className={s.title}>Log in</h2>
      <p className={s.text}>
        Welcome! Please enter your credentials to login to the platform:
      </p>

      <div className={s.inputWrapper}>
        <input
          className={clsx(s.inputLogin, inputStatus("email"))}
          {...register("email")}
          placeholder="Email"
        />
        <div className={s.errorWrapper}>
          {errors.email && (
            <p className={s.error}>Error: {errors.email.message}</p>
          )}
        </div>

        {errors.email && (
          <Icon name="icon-cross-small" className={s.iconError} size={18} />
        )}
        {!errors.email && (dirtyFields.email || touchedFields.email) && (
          <Icon name="icon-check" className={s.iconSuccess} size={18} />
        )}
      </div>
      <div className={s.inputWrapper}>
        <input
          className={s.inputLogin}
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

      <BaseButton text="Log In" style={s.registrationBtn} />
      <p className={s.textLink}>
        Don’t have an account?
        <Link to="/register" className={s.link}>
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
