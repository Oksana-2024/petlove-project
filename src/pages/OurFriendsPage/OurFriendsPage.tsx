import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";
import Container from "../../components/Container/Container";
import s from "./OurFriendsPage.module.css";

const OurFriendsPage = () => {
  return (
    <section className={s.friendPage}>
      <Container >
        <Title title="Our friends" className={s.title} />
        <FriendsList />
      </Container>
    </section>
  );
};

export default OurFriendsPage;
