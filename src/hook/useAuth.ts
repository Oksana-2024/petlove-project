import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from "../redux/user/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return {
    isLoggedIn,
    user,
    token,
  };
};
