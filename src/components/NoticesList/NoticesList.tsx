import { useSelector } from "react-redux";
import { selectNotices } from "../../redux/notices/selectors";
import s from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

const NoticesList = () => {
  const notices = useSelector(selectNotices);

  return (
    <ul className={s.list}>
      {notices.map((item) => (
        <li className={s.item} key={item._id}>
          <NoticesItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default NoticesList;
