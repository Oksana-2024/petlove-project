import Container from "../../components/Container/Container";
import ProgressLoader from "../../components/Loader/Loader";
import Logo from "../../components/Logo/Logo";
import s from "./MainPage.module.css";

const MainPage = () => {
  const isLoading = false;
  return (
    <section className={s.page}>
      <Container className={s.mainPage}>
        {isLoading ? (
          <ProgressLoader />
        ) : (
          <Logo logo={s.mainLogo} link={s.mainLink} />
        )}
      </Container>
    </section>
  );
};

export default MainPage;
