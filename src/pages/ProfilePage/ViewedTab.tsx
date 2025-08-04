import { useSelector } from "react-redux";

import { selectViewed } from "../../redux/user/selectors";
import NoticesItem from "../../components/NoticesItem/NoticesItem";
import s from "./ViewedTab.module.css";

const ViewedTab = () => {
  const notices = useSelector(selectViewed);
  return (
    <ul className={s.viewedList}>
      {notices.map((item) => (
        <li key={item._id} className={s.viewedItem}>
          <NoticesItem {...item} isViewed/>
        </li>
      ))}
    </ul>
  );
};

export default ViewedTab;
