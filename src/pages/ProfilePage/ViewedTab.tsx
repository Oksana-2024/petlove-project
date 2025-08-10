import { useSelector } from "react-redux";

import { selectViewed } from "../../redux/user/selectors";
import NoticesItem from "../../components/NoticesItem/NoticesItem";
import s from "./ViewedTab.module.css";

const ViewedTab = () => {
  const notices = useSelector(selectViewed);

  if (notices.length < 1) {
    return (
      <p className={s.text}>
        Oops,
        <span className={s.textAccent}>
          looks like there aren't any furries
        </span>
        on our adorable page yet. Do not worry! View your pets on the "find your
        favorite pet" page and add them to your favorites.
      </p>
    );
  }
  return (
    <ul className={s.viewedList}>
      {notices.map((item) => (
        <li key={item._id} className={s.viewedItem}>
          <NoticesItem {...item} isViewed />
        </li>
      ))}
    </ul>
  );
};

export default ViewedTab;
