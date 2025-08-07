import {
  AutocompleteElement,
  Controller,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

import { enGB } from "date-fns/locale/en-GB";

import { zodResolver } from "@hookform/resolvers/zod";

import Icon from "../Icon/Icon";
import { petValidationSchema } from "../../helpers/validationSchema";

import { useAppDispatch } from "../../hook/useDispatch";
import { addPets } from "../../redux/user/operations";
import type { IPet } from "../../types/pets";
import { useSelector } from "react-redux";
import { selectSpecies } from "../../redux/notices/selectors";

import BaseButton from "../BaseButton/BaseButton";
import { Link, useNavigate } from "react-router-dom";
import GenderRadioGroup from "./GenderRadioGroup";
import useMedia from "../../hook/useMedia";
import DatePicker, { registerLocale } from "react-datepicker";
import "./datePicker.css";
import s from "./AddPetForm.module.css";

registerLocale("en-GB", enGB);

export interface IAddPetForm {
  name: string;
  title: string;
  imgURL: string;
  species: { label: ""; id: "" };
  birthday: string;
  sex: string;
}

const AddPetForm = () => {
  const dispatch = useAppDispatch();
  const species = useSelector(selectSpecies);
  const navigate = useNavigate();
  const { isBigScreen } = useMedia();
  const inputStyle = {
    width: "100%",
    padding: 0,
    "& .MuiFormControl-root": {
      border: "none",
    },
    "& .MuiInputBase-root": {
      border: "1px solid var(--border-input)",
      borderRadius: "30px",
      "&:has(input:focus)": {
        border: "1px solid var(--main-bg)",
      },
      "& input": {
        fontFamily: "var(--font-manrope)",
        fontWeight: 500,
        fontSize: isBigScreen ? "16px" : "14px",
        lineHeight: isBigScreen ? "1.25" : "1.29",
        letterSpacing: "-0.03em",
      },
      "& input::placeholder": {
        color: "var(--placeholder-color)",
        opacity: 0.9,
      },
    },
    "& .MuiOutlinedInput-input": {
      border: "none",
      padding: isBigScreen ? "14px" : "9px 10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiFormHelperText-root": {
      color: "var(--error)",
      fontSize: "12px",
      fontFamily: "var(--font-manrope)",
    },
  };

  const context = useForm<IAddPetForm>({
    defaultValues: {
      name: "",
      title: "",
      imgURL: "",
      species: { label: "", id: "" },
      birthday: "",
      sex: "",
    },
    mode: "all",
    resolver: zodResolver(petValidationSchema) as never,
  });

  const avatar = context.watch("imgURL");

  const onSubmit = (data: IPet) => {
    dispatch(
      addPets({
        ...data,
        species: data.species?.id as never,
        birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
      })
    )
      .unwrap()
      .then(() => {
        context.reset();
        navigate("/profile");
      });
  };
  return (
    <div className={s.petFormWrapper}>
      <h2 className={s.title}>
        Add my pet /<span className={s.titleAccent}>Personal details</span>
      </h2>

      <FormContainer
        onSuccess={onSubmit}
        formContext={context}
        FormProps={{ className: s.form }}
      >
        <div className={s.genderIconGroup}>
          <GenderRadioGroup field={context.register("sex")} />
        </div>
        {context.formState.errors.sex && (
          <span className={s.errorText}>
            {context.formState.errors.sex.message}
          </span>
        )}

        <div className={s.footprintWrapper}>
          {avatar ? (
            <img
              src={avatar}
              alt="Photo pet"
              width={68}
              className={s.avatarImg}
            />
          ) : (
            <Icon name="icon-footprint" size={34} className={s.footIcon} />
          )}
        </div>

        <div className={s.formInputWrapper}>
          <TextFieldElement
            name="imgURL"
            placeholder="Enter URL"
            className={s.inputAddPet}
            type="text"
            sx={inputStyle}
          />

          <TextFieldElement
            type="text"
            name="title"
            placeholder="Title"
            className={s.inputAddPet}
            sx={inputStyle}
          />
          <TextFieldElement
            type="text"
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Pet’s Name"
            className={s.inputAddPet}
            sx={inputStyle}
          />

          <div className={s.wrapperInput}>
            <div className={s.datePickerBox}>
              <Controller
                name="birthday"
                control={context.control}
                render={({ field }) => (
                  <DatePicker
                    locale="en-GB"
                    maxDate={new Date()}
                    selected={field.value.toString() as unknown as Date}
                    dateFormat="dd.MM.yyyy"
                    className={s.datePicker}
                    placeholderText="Birthday"
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date.getTime())) {
                        field.onChange(date.toISOString().split("T")[0]); // YYYY-MM-DD
                      } else {
                        field.onChange("");
                      }
                    }}
                  />
                )}
              />

              {context.formState.errors.birthday && (
                <span className={s.errorText}>
                  {context.formState.errors.birthday.message}
                </span>
              )}
              <Icon name="icon-calendar" size={18} className={s.iconCalendar} />
            </div>

            <AutocompleteElement
              name="species"
              options={species}
              autocompleteProps={{
                clearOnEscape: true,
                disableClearable: false,
                clearOnBlur: false,
                componentsProps: {
                  paper: {
                    sx: {
                      borderRadius: "30px",
                      boxShadow: "none",
                      border: "1px solid var(--border-input)",
                    },
                  },
                },
              }}
              textFieldProps={{
                placeholder: "Type of pet",
                sx: {
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid var(--main-bg)",
                    },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid var(--border-input)",
                  },
                  "& .MuiInputBase-root": {
                    minWidth: isBigScreen ? "210px" : "140px",
                    borderRadius: "30px",
                    backgroundColor: "transparent",
                    outline: "none",
                    padding: "0",
                    "& input": {
                      fontFamily: "var(--font-manrope)",
                      fontWeight: 500,
                      fontSize: isBigScreen ? "16px" : "14px",
                      lineHeight: isBigScreen ? "1.25" : "1.29",
                      letterSpacing: "-0.03em",
                    },
                    "& input::placeholder": {
                      color: "var(--placeholder-color)",
                    },
                  },
                  "& .MuiAutocomplete-input::placeholder": {
                    color: "var(--main-color)",
                    opacity: 1,
                  },
                  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                    padding: isBigScreen
                      ? "14px 0 14px 14px"
                      : "9px 0 9px 10px",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <Link to="/profile" className={s.linkBtn}>
            Back
          </Link>
          <BaseButton text="Submit" type="submit" style={s.submitBtn} />
        </div>
      </FormContainer>
    </div>
  );
};

export default AddPetForm;
