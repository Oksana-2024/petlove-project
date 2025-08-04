
import { useSelector } from "react-redux";
import { selectPets } from "../../redux/user/selectors";
import PetsItem from "../PetsItem/PetsItem";

import s from './PetsList.module.css'

const PetsList = () => {
  const pets = useSelector(selectPets);
  return (
    <ul className={s.petsList}>
      {pets.map((item) => (
        <li key={item._id} className={s.petsItem}>
          <PetsItem
            {...item}
            species={
              typeof item.species === "string" ? item.species : item.species.id
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default PetsList;
