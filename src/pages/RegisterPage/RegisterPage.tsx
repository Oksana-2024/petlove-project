import Container from "../../components/Container/Container";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import useMedia from "../../hook/useMedia";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();
  return (
    <section className={s.page}>
      <Container className={s.registerBox}>
        {isMobile && (
          <img
            className={s.imgCat}
            src="/cat_m.webp"
            alt="Cat"
            sizes="100vw"
            srcSet="/cat_m@2x.webp 2x"
          />
        )}
        {isTablet && (
          <img
            className={s.imgCat}
            src="/cat_t.webp"
            alt="Cat"
            sizes="100vw"
            srcSet="/cat_t@2x.webp 2x"
          />
        )}
        {isDesktop && (
          <img
            className={s.imgCat}
            src="/cat_d.webp"
            alt="Cat"
            sizes="592px"
            srcSet="/cat_d@2x.webp 2x"
          />
        )}
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;
