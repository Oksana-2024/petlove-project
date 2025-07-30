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
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
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
      avatar,
    };

    await dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => dispatch(getUser()))
      .then(onClose);
  };
  return (
    <ModalWindow closeModal={onClose} modalIsOpen={isOpen}>
      <Title title="Edit information" className={s.title} />
      <div className={s.avatarWrapper}>
        {user?.avatar ? (
          <img width={80} src={user.avatar} className={s.avatarImg} />
        ) : (
          <Icon name="icon-user" className={s.userIcon} size={40} />
        )}
      </div>
      <form
        onSubmit={handleSubmit(onUpdateUserSubmit)}
        className={s.editUserForm}
      >
        <input {...register("avatar")} type="text" className={s.avatar} />
        <div className={s.error}>
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </div>
        <input
          className={clsx(s.textEdit, errors.name && s.invalid)}
          type="text"
          {...register("name", { required: true })}
        />
        <div className={s.error}>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <input
          className={s.textEdit}
          type="email"
          {...register("email", { required: true })}
        />
        <div className={s.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <input
          className={clsx(s.textEdit, errors.email && s.invalid)}
          type="tel"
          {...register("phone")}
        />
        <div className={s.error}>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <BaseButton text="Go to profile" type="submit" />
      </form>
    </ModalWindow>
  );
};

export default ModalEditUser;
