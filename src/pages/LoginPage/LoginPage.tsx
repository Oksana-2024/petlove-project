import Container from "../../components/Container/Container";
import LoginForm from "../../components/LoginForm/LoginForm";
import useMedia from "../../hook/useMedia";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();
  return (
    <section className={s.loginPage}>
      <Container>
        {isMobile && (
          <img
            className={s.imgDog}
            src="/dog.webp"
            alt="Dog"
            sizes="100vw"
            srcSet="/dog@2x.webp 2x"
          />
        )}
        {isTablet && (
          <img
            className={s.imgDog}
            src="/dog_t.webp"
            alt="Dog"
            sizes="100vw"
            srcSet="/dog_t@2x.webp 2x"
          />
        )}
        {isDesktop && (
          <img
            className={s.imgDog}
            src="/dog.webp"
            alt="Dog"
            sizes="592px"
            srcSet="/dog_d@2x.webp 2x"
          />
        )}
        <LoginForm />
      </Container>
    </section>
  );
};

export default LoginPage;
