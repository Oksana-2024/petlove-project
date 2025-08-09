import {
  AutocompleteElement,
  Controller,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import dayjs from "dayjs";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { enGB } from "date-fns/locale/en-GB";
import type { IPet } from "../../types/pets";
import { petValidationSchema } from "../../helpers/validationSchema";
import { uploadImageToCloudinary } from "../../service/api";
import useMedia from "../../hook/useMedia";
import { useAppDispatch } from "../../hook/useDispatch";
import { addPets } from "../../redux/user/operations";
import { selectSpecies } from "../../redux/notices/selectors";

import GenderRadioGroup from "./GenderRadioGroup";
import Icon from "../Icon/Icon";
import BaseButton from "../BaseButton/BaseButton";
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
  const [imageUrl, setImageUrl] = useState("");
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
        imgURL: imageUrl ?? data.imgURL,
      })
    )
      .unwrap()
      .then(() => {
        context.reset();
        navigate("/profile");
      });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImageToCloudinary(file);
      const uploadedUrl = res;
      setImageUrl(uploadedUrl);
      context.setValue("imgURL", uploadedUrl, { shouldValidate: true });
    } catch (err) {
      console.error("Upload error", err);
    }
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
          <div className={s.uploadBox}>
            <TextFieldElement
              name="imgURL"
              placeholder="Enter URL"
              className={s.inputAddPet}
              type="text"
              sx={{
                width: isBigScreen ? "278px" : "170px",
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
              }}
            />
            <label className={s.uploadLabel}>
              Upload photo
              <Icon
                name="icon-upload-cloud"
                size={16}
                className={s.uploadIcon}
              />
              <input
                name="upload"
                className={s.uploadInput}
                type="file"
                onChange={handleUpload}
              />
            </label>
          </div>

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
                    width: isBigScreen ? "210px" : "143px",
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
