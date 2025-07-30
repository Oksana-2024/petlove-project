import { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "../routes/routes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/user/selectors";
import { useAppDispatch } from "../hook/useDispatch";
import { getUser } from "../redux/user/operations";

function App() {
  const routing = useRoutes(routes);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn]);

  return <Suspense fallback={null}>{routing}</Suspense>;
}

export default App;
