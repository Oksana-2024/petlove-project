import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import s from "./MainPage.module.css";

const MainPage = () => {
  const isLoading = false;
  return (
    <section className={s.page}>
      <Container className={s.mainPage}>
        {isLoading ? (
          <>...loading</>
        ) : (
          <Logo logo={s.mainLogo} link={s.mainLink} />
        )}
      </Container>
    </section>
  );
};

export default MainPage;
