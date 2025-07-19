import { useEffect } from "react";
import {
  AutocompleteElement,
  FormContainer,
  Controller,
  useForm,
} from "react-hook-form-mui";
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
import s from "./NoticesFilters.module.css";
import type { IQueryParams } from "../../types/notices";

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

  const onSubmit = (data: IQueryParams) => {
    dispatch(setNoticeQueryParams(data));
  };

  const context = useForm({
    defaultValues: {
      keyword: "",
      category: "",
      sex: "",
      species: "",
      locationId: "",
    },
    mode: "all",
  });

  const { dirtyFields, touchedFields } = context.formState;

  return (
    <FormContainer onSuccess={onSubmit} formContext={context}>
      <Controller
        name="keyword"
        render={({ field }) => (
          <SearchField
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
          }}
          textFieldProps={{
            placeholder: "Category",
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
        }}
        textFieldProps={{
          placeholder: "By type",
        }}
      ></AutocompleteElement>

      <AutocompleteElement
        name="locationId"
        options={locations}
        autocompleteProps={{
          clearOnEscape: true,
          disableClearable: false,
          clearOnBlur: false,
        }}
        textFieldProps={{
          placeholder: "Location",
        }}
      ></AutocompleteElement>
    </FormContainer>
  );
};

export default NoticesFilters;
