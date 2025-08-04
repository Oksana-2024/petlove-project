import clsx from "clsx";
import Icon from "../Icon/Icon";

import type { UseFormRegisterReturn } from "react-hook-form";
import s from "./AddPetForm.module.css";

const GenderRadioGroup = ({ field }: { field: UseFormRegisterReturn }) => {
  return (
    <>
      <div>
        <input
          {...field}
          value={"male"}
          type="radio"
          name="sex"
          id="male"
          className={clsx(s.genderInput, s.visuallyHidden)}
        />
        <label htmlFor="male" className={clsx(s.iconDecor, s.male)}>
          <Icon name="icon-male" size={20} className={s.maleIcon} />
        </label>
      </div>

      <div>
        <input
          {...field}
          value={"female"}
          type="radio"
          name="sex"
          id="female"
          className={clsx(s.genderInput, s.visuallyHidden)}
        />
        <label htmlFor="female" className={clsx(s.iconDecor, s.female)}>
          <Icon name="icon-female" size={20} className={s.femaleIcon} />
        </label>
      </div>
      <div>
        <input
          {...field}
          value={"multiple"}
          type="radio"
          name="sex"
          id="reproductive"
          className={clsx(s.genderInput, s.visuallyHidden)}
        />
        <label
          htmlFor="reproductive"
          className={clsx(s.iconDecor, s.malefemale)}
        >
          <Icon name="icon-reproductive" size={20} className={s.genderIcon} />
        </label>
      </div>
    </>
  );
};

export default GenderRadioGroup;
