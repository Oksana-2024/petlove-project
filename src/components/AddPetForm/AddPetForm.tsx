import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "../Icon/Icon";
import s from "./AddPetForm.module.css";
import { petValidationSchema } from "../../helpers/validationSchema";

const AddPetForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      title: "",
      imgURL: "",
      species: "",
      birthday: "",
      sex: "",
    },
    resolver: zodResolver(petValidationSchema) as never,
  });
  const onSubmit = () => {};
  return (
    <div className={s.petFormWrapper}>
      <h2 className={s.title}>
        Add my pet /<span className={s.titleAccent}>Personal details</span>
      </h2>
      <div className={s.genderIconGroup}>
        <div className={clsx(s.iconDecor, s.male)}>
          <Icon name="icon-male" size={20} className={s.maleIcon} />
        </div>
        <div className={clsx(s.iconDecor, s.female)}>
          <Icon name="icon-female" size={20} className={s.femaleIcon} />
        </div>
        <div className={clsx(s.iconDecor, s.malefemale)}>
          <Icon name="icon-reproductive" size={20} className={s.genderIcon} />
        </div>
      </div>
      <div className={s.footprintWrapper}>
        <Icon name="icon-footprint" size={34} className={s.footIcon} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} className={s.inputAddPet} />
        <input type="text" {...register("title")} className={s.inputAddPet} />
        <input type="text" {...register("imgURL")} className={s.inputAddPet} />
        <input type="text" {...register("species")} className={s.inputAddPet} />
        <input type="text" {...register("birthday")} className={s.inputAddPet} />
        <input type="text" {...register("sex")} className={s.inputAddPet} />
      </form>
    </div>
  );
};

export default AddPetForm;
