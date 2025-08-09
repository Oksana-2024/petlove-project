import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../helpers/validationSchema";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import ModalWindow from "../ModalWindow/ModalWindow";
import BaseButton from "../BaseButton/BaseButton";
import s from "./ModalEditUser.module.css";
import { useAppDispatch } from "../../hook/useDispatch";
import { getUser, updateUser } from "../../redux/user/operations";
import Title from "../Title/Title";
import { uploadImageToCloudinary } from "../../service/api";
import { useState } from "react";
import useMedia from "../../hook/useMedia";
interface IModalEdirUser {
  onClose: () => void;
  isOpen: boolean;
}
export interface IUpdateUser {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

const ModalEditUser = ({ onClose, isOpen }: IModalEdirUser) => {
  const [imageUrl, setImageUrl] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { isBigScreen, isMobile } = useMedia();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: user.name as string,
      email: user.email as string,
      avatar: user.avatar as string,
      phone: user.phone as string,
    },
    resolver: zodResolver(userUpdateSchema),
  });

  const onUpdateUserSubmit = async ({
    avatar,
    email,
    name,
    phone,
  }: IUpdateUser) => {
    const updatedUser = {
      name,
      email,
      phone,
      avatar: imageUrl || avatar,
    };

    await dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => dispatch(getUser()))
      .then(onClose);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImageToCloudinary(file);
      const uploadedUrl = res;
      setImageUrl(uploadedUrl);
      setValue("avatar", uploadedUrl, { shouldValidate: true });
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <ModalWindow
      closeModal={onClose}
      modalIsOpen={isOpen}
      className={s.modalStyles}
    >

      <Title title="Edit information" className={s.title} />
      <form
        onSubmit={handleSubmit(onUpdateUserSubmit)}
        className={s.editUserForm}
      >
        <div className={s.avatarWrapper}>
          {user?.avatar ? (
            <img
              width={80}
              src={imageUrl || user.avatar || ""}
              className={s.avatarImg}
            />
          ) : (
            <Icon name="icon-user" className={s.userIcon} size={40} />
          )}
        </div>
        {isMobile && (
          <label className={s.uploadLabel}>
            Upload photo
            <input
              className={s.uploadInput}
              type="file"
              onChange={handleUpload}
            />
          </label>
        )}
        {isBigScreen && (
          <div className={s.uploadBox}>
            <input
              {...register("avatar")}
              type="text"
              className={clsx(s.textEdit, errors.name && s.invalid)}
              placeholder="Enter URL"
            />
            <label className={s.uploadLabel}>
              Upload photo
              <Icon
                name="icon-upload-cloud"
                size={16}
                className={s.uploadIcon}
              />
              <input
                className={s.uploadInput}
                type="file"
                onChange={handleUpload}
              />
            </label>
          </div>
        )}
        <div className={s.error}>
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </div>
        <input
          placeholder="Enter your name"
          className={clsx(s.textEdit, errors.name && s.invalid)}
          type="text"
          {...register("name", { required: true })}
        />
        <div className={s.error}>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <input
          placeholder="Enter your email"
          className={s.textEdit}
          type="email"
          {...register("email", { required: true })}
        />
        <div className={s.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <input
          placeholder="+380"
          className={clsx(s.textEdit, errors.email && s.invalid)}
          type="tel"
          {...register("phone")}
        />
        <div className={s.error}>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <BaseButton
          text={isBigScreen ? "Save" : "Go to profile"}
          type="submit"
          style={s.styleBtn}
        />
      </form>
    </ModalWindow>
  );
};

export default ModalEditUser;
