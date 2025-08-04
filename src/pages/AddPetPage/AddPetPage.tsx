import { useEffect } from "react";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import Container from "../../components/Container/Container";
import PetBlock from "../../components/PetBlock/PetBlock";
import s from "./AddPetPage.module.css";
import { useAppDispatch } from "../../hook/useDispatch";
import { getTypeThunk } from "../../redux/notices/operations";

const AddPet = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTypeThunk());
  }, [dispatch]);
  return (
    <section className={s.petPage}>
      <Container className={s.petContainer}>
        <PetBlock />
        <AddPetForm />
      </Container>
    </section>
  );
};

export default AddPet;
