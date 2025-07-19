import Icon from "../Icon/Icon";
import s from "./SearchField.module.css";

interface ISearchField {
  placeholder: string;

  onClear?: () => void;
  inputProps: object;
  showClearIcon: boolean;
}

const SearchField = ({
  placeholder,

  onClear,
  showClearIcon,
  inputProps,
}: ISearchField) => {
  return (
    <div className={s.inputWrapper}>
      <input
        className={s.searchInput}
        type="text"
        {...inputProps}
        placeholder={placeholder}
      />
      <button className={s.serchBtn} type="submit">
        <Icon name="icon-search-1" className={s.searchIcon} size={18} />
      </button>
      {showClearIcon && (
        <button type="button" onClick={onClear} className={s.resetFormBtn}>
          <Icon name="icon-cross-small" size={18} className={s.resetIcon} />
        </button>
      )}
    </div>
  );
};

export default SearchField;
