import { useSelector } from "react-redux";
import NoticesItem from "../../components/NoticesItem/NoticesItem";

import { selectNoticesFavorites } from "../../redux/user/selectors";
import s from "./MyFavoritesTab.module.css";
import { useAppDispatch } from "../../hook/useDispatch";
import { getUser, removeFavoriteThunk } from "../../redux/user/operations";

const MyFavoritesTab = () => {
  const favorites = useSelector(selectNoticesFavorites);
  const dispatch = useAppDispatch();
  const handleUpdateFavorite = async (_id: string) => {
    await dispatch(removeFavoriteThunk(_id))
      .unwrap()
      .then(() => dispatch(getUser()));
  };

  if (favorites.length < 1) {
    return (
      <p className={s.text}>
        Oops, <span className={s.textAccent}>looks like there aren't any furries</span> on our adorable page yet. Do
        not worry! View your pets on the "find your favorite pet" page and add
        them to your favorites.
      </p>
    );
  }
  return (
    <ul className={s.favoriteList}>
      {favorites.map((item) => (
        <li key={item._id} className={s.favoriteItem}>
          <NoticesItem
            onClick={() => handleUpdateFavorite(item._id)}
            {...item}
            isFavoriteTab
          />
        </li>
      ))}
    </ul>
  );
};

export default MyFavoritesTab;
