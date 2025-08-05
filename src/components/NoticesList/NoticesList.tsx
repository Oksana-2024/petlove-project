import { useSelector } from "react-redux";
import { selectNotices } from "../../redux/notices/selectors";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";
import s from "./NoticesList.module.css";
interface INoticesList {
  isViewed?: boolean;
  isFavorite?:boolean
}

const NoticesList = ({ isViewed, isFavorite }: INoticesList) => {
  const notices = useSelector(selectNotices);

  return (
    <ul className={s.list}>
      {notices.map((item) => (
        <li className={clsx(s.item, isViewed && s.itemViewed, isFavorite && s.itemFavorite)} key={item._id}>
          <NoticesItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default NoticesList;
