import { useSelector } from "react-redux";
import s from "./FriendsList.module.css";
import { selectFriends } from "../../redux/friends/selectors";
import FriendsItem from "../FriendsItem/FriendsItem";
import { useAppDispatch } from "../../hook/useDispatch";
import { getFriendsThunk } from "../../redux/friends/operations";
import { useEffect } from "react";

const FriendsList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFriendsThunk());
  }, [dispatch]);
  const friends = useSelector(selectFriends);

  return (
    <ul className={s.list}>
      {friends.map((item) => (
        <li key={item._id} className={s.item}>
          <FriendsItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;
