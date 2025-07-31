import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/user/selectors";

const PetsItem = () => {
  const favorite = useSelector(selectFavorites);
  if (favorite.length < 1) {
    return (
      <p>
        Oops, looks like there aren't any furries on our adorable page yet. Do
        not worry! View your pets on the "find your favorite pet" page and add
        them to your favorites.
      </p>
    );
  }
  return <div>PetsItem</div>;
};

export default PetsItem;
