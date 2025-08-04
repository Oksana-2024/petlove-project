import Container from "../../components/Container/Container";
import PetsBlock from "../../components/PetsBlock/PetsBlock";
import UserCard from "../../components/UserCard/UserCard";
import MyNoticesTab from "./MyNoticesTab";
import s from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <section className={s.profilePage}>
      <Container className={s.containerProfile}>
        <div className={s.profilePageWrapper}>
          <UserCard />
          <PetsBlock />
        </div>
        <div className={s.noticesBlock}>
          <MyNoticesTab />
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
