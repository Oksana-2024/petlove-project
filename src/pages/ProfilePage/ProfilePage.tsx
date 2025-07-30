import Container from "../../components/Container/Container";
import PetsBlock from "../../components/PetsBlock/PetsBlock";
import UserCard from "../../components/UserCard/UserCard";
import s from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <section className={s.profilePage}>
      <Container>
        <div className={s.profilePageWrapper}>
          <UserCard />
          <PetsBlock />
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
