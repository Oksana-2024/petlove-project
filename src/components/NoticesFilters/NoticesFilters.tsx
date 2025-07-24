import { useEffect } from "react";
import {
  AutocompleteElement,
  FormContainer,
  Controller,
  useForm,
} from "react-hook-form-mui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";

import {
  selectCategory,
  selectGenders,
  selectLocation,
  selectSpecies,
} from "../../redux/notices/selectors";
import {
  getCategoryThunk,
  getCitiesThunk,
  getGenderThunk,
  getTypeThunk,
} from "../../redux/notices/operations";
import { useAppDispatch } from "../../hook/useDispatch";
import { setNoticePage, setNoticeQueryParams } from "../../redux/notices/slice";
import SearchField from "../SearchField/SearchField";

import { Chip } from "@mui/material";
import Icon from "../Icon/Icon";
import s from "./NoticesFilters.module.css";

type OptionType = {
  label: string;
  id: string;
};
export interface IFormData {
  keyword: string;
  category: OptionType;
  sex: OptionType;
  species: OptionType;
  locationId: OptionType;
  byPopular?: boolean;
  byPrice?: boolean;
}

const NoticesFilters = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategory);
  const locations = useSelector(selectLocation);
  const gender = useSelector(selectGenders);
  const type = useSelector(selectSpecies);

  useEffect(() => {
    dispatch(getCitiesThunk());
    dispatch(getCategoryThunk());
    dispatch(getGenderThunk());
    dispatch(getTypeThunk());
  }, [dispatch]);

  const onClearSearch = () => {
    dispatch(setNoticePage(1));
    context.resetField("keyword");
  };

  const onSubmit = (data: IFormData) => {
    const payload = {
      keyword: data.keyword,
      category: data.category?.id,
      sex: data.sex?.id,
      species: data.species?.id,
      locationId: data.locationId?.id,
    };

    if (typeof data.byPopular === "boolean") {
      (
        payload as {
          byPopular?: boolean;
          byPrice?: boolean;
        }
      )["byPopular"] = data.byPopular;
    }
    if (typeof data.byPrice === "boolean") {
      (
        payload as {
          byPopular?: boolean;
          byPrice?: boolean;
        }
      )["byPrice"] = data.byPrice;
    }

    dispatch(setNoticeQueryParams(payload));
  };

  const context = useForm<IFormData>({
    defaultValues: {
      keyword: "",
      category: { label: "", id: "" },
      sex: { label: "", id: "" },
      species: { label: "", id: "" },
      locationId: { label: "", id: "" },
    },
    mode: "all",
  });

  const { dirtyFields, touchedFields } = context.formState;

  return (
    <FormContainer onSuccess={onSubmit} formContext={context}>
      <div className={s.formWrapper}>
        <Controller
          name="keyword"
          render={({ field }) => (
            <SearchField
              className={s.searchField}
              placeholder="Search"
              inputProps={field}
              showClearIcon={
                (dirtyFields.keyword as boolean) ||
                (touchedFields.keyword as boolean)
              }
              onClear={onClearSearch}
            />
          )}
        />

        <div className={s.selectWrapper}>
          <AutocompleteElement
            name="category"
            options={categories}
            autocompleteProps={{
              clearOnEscape: true,
              disableClearable: false,
              clearOnBlur: false,
              componentsProps: {
                paper: {
                  sx: {
                    borderRadius: "15px",
                    boxShadow: "none",
                    border: "none",
                  },
                },
              },
            }}
            textFieldProps={{
              placeholder: "Category",
              className: s.select,
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-root": {
                  width: "143px",
                  borderRadius: "30px",
                  backgroundColor: "var(--modal-bg)",
                  outline: "none",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "1.29",
                  letterSpacing: "-0.03em",
                  padding: "0",
                },
                "& .MuiAutocomplete-input::placeholder": {
                  color: "var(--main-color)",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                  padding: "12px 0 12px 12px",
                },
              },
            }}
          ></AutocompleteElement>

          <AutocompleteElement
            name="sex"
            options={gender}
            autocompleteProps={{
              clearOnEscape: true,
              disableClearable: false,
              clearOnBlur: false,
            }}
            textFieldProps={{
              placeholder: "By gender",
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-root": {
                  width: "143px",
                  borderRadius: "30px",
                  backgroundColor: "var(--modal-bg)",
                  outline: "none",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "1.29",
                  letterSpacing: "-0.03em",
                  padding: "0",
                },
                "& .MuiAutocomplete-input::placeholder": {
                  color: "var(--main-color)",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                  padding: "12px 0 12px 12px",
                },
              },
            }}
          ></AutocompleteElement>
        </div>
        <AutocompleteElement
          name="species"
          options={type}
          autocompleteProps={{
            clearOnEscape: true,
            disableClearable: false,
            clearOnBlur: false,
            componentsProps: {
              paper: {
                sx: {
                  borderRadius: "15px",
                  boxShadow: "none",
                  border: "none",
                },
              },
            },
          }}
          textFieldProps={{
            placeholder: "By type",
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputBase-root": {
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "var(--modal-bg)",
                outline: "none",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "1.29",
                letterSpacing: "-0.03em",
                padding: "0",
              },
              "& .MuiAutocomplete-input::placeholder": {
                color: "var(--main-color)",
                opacity: 1,
              },
              "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                padding: "12px 0 12px 12px",
              },
            },
          }}
        ></AutocompleteElement>

        <AutocompleteElement
          name="locationId"
          options={locations}
          autocompleteProps={{
            clearOnEscape: true,
            disableClearable: false,
            clearOnBlur: false,
            popupIcon: (
              <Icon name="icon-search-1" className={s.searchIcon} size={18} />
            ),
            componentsProps: {
              paper: {
                sx: {
                  borderRadius: "15px",
                  boxShadow: "none",
                  border: "none",
                },
              },
            },
          }}
          textFieldProps={{
            placeholder: "Location",
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputBase-root": {
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "var(--modal-bg)",
                outline: "none",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "1.29",
                letterSpacing: "-0.03em",
                padding: "0",
              },
              "& .MuiAutocomplete-input::placeholder": {
                color: "var(--main-color)",
                opacity: 1,
              },
              "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                padding: "12px 0 12px 12px",
              },
              "& .MuiAutocomplete-popupIndicatorOpen": {
                transform: "none !important",
              },
            },
          }}
        ></AutocompleteElement>
        <div className={s.radioWrapper}>
          <Controller
            name="byPopular"
            render={({ field }) => (
              <>
                {(
                  [
                    ["Popular", true],
                    ["Unpopular", false],
                  ] as const
                ).map(([label, option]) => (
                  <Chip
                    key={label}
                    label={label}
                    clickable
                    sx={{
                      borderRadius: "30px",
                      padding:
                        field.value === option ? "12px 4px 12px 12px" : "12px",
                      gap: "8px",
                      color:
                        field.value === option
                          ? "var(--second-color)"
                          : "var(--main-color)",
                      border: "none",
                      backgroundColor:
                        field.value === option
                          ? "var(--main-bg) !important"
                          : "var(--form-bg)",
                      ".MuiChip-deleteIcon": {
                        fill: "var(--second-color)",
                        backgroundColor: "transparent)",
                      },
                      ".MuiChip-label": {
                        fontFamily: "var(--font-manrope) !important",
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: " -0.03em",
                        lineHeight: 1.29,
                        paddingLeft: 0,
                        paddingRight: 0,
                      },
                      ".MuiSvgIcon-root": {
                        width: "18px",
                        height: "18px",
                      },
                    }}
                    onClick={() =>
                      field.onChange({ target: { value: option } })
                    }
                    onDelete={
                      field.value === option
                        ? () => field.onChange({ target: { value: "" } })
                        : undefined
                    }
                    deleteIcon={
                      field.value === option ? (
                        <CloseRoundedIcon
                          sx={{ fontSize: 18, color: "var(--second-color)" }}
                        />
                      ) : undefined
                    }
                  />
                ))}
              </>
            )}
          />
          <Controller
            name="byPrice"
            render={({ field }) => (
              <>
                {(
                  [
                    ["Cheap", true],
                    ["Expensive", false],
                  ] as const
                ).map(([label, option]) => (
                  <Chip
                    key={label}
                    label={label}
                    clickable
                    sx={{
                      borderRadius: "30px",
                      padding:
                        field.value === option ? "12px 4px 12px 12px" : "12px",
                      gap: "8px",
                      color:
                        field.value === option
                          ? "var(--second-color)"
                          : "var(--main-color)",
                      border: "none",
                      backgroundColor:
                        field.value === option
                          ? "var(--main-bg) !important"
                          : "var(--form-bg)",
                      ".MuiChip-deleteIcon": {
                        fill: "var(--second-color)",
                        backgroundColor: "transparent)",
                        width: "20px",
                      },
                      ".MuiChip-label": {
                        fontFamily: "var(--font-manrope) !important",
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: " -0.03em",
                        lineHeight: 1.29,
                        paddingLeft: 0,
                        paddingRight: 0,
                      },
                    }}
                    onClick={() =>
                      field.onChange({ target: { value: option } })
                    }
                    onDelete={
                      field.value === option
                        ? () => field.onChange({ target: { value: "" } })
                        : undefined
                    }
                    deleteIcon={
                      field.value === option ? (
                        <CloseRoundedIcon
                          sx={{ fontSize: 18, color: "var(--second-color)" }}
                        />
                      ) : undefined
                    }
                  />
                ))}
              </>
            )}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default NoticesFilters;
