import Container from "../../components/Container/Container";
import useMedia from "../../hook/useMedia";
import s from "./HomePage.module.css";

const HomePage = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();

  return (
    <section className={s.page}>
      <Container>
        <div className={s.textWrapper}>
          <h1 className={s.title}>
            Take good <span className={s.accent}>care</span> of your small pets
          </h1>
          <p className={s.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness
          </p>
        </div>
        {isMobile && (
          <img
            src="/home_m.webp"
            alt="Woman hugging and kissing a dog"
            srcSet="/home_m@2x.webp 2x"
            width="100%"
            className={s.image}
          />
        )}
        {isTablet && (
          <img
            src="/home_t.webp"
            alt="Woman hugging and kissing a dog"
            srcSet="/home_t@2x.webp 2x"
            width={704}
            className={s.image}
          />
        )}
        {isDesktop && (
          <img
            src="/home_d.webp"
            alt="Woman hugging and kissing a dog"
            srcSet="/home_d@2x.webp 2x"
            width={1216}
            className={s.image}
          />
        )}
      </Container>
    </section>
  );
};

export default HomePage;
