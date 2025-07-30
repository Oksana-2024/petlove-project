import AddPetForm from "../../components/AddPetForm/AddPetForm";
import Container from "../../components/Container/Container";
import PetBlock from "../../components/PetBlock/PetBlock";
import s from "./AddPetPage.module.css";

const AddPet = () => {
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
