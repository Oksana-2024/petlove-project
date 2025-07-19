import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import useMedia from "../../hook/useMedia";
import s from "./NotFounPage.module.css";

const NotFounPage = () => {
  const { isMobile } = useMedia();
  return (
    <section className={s.notPage}>
      <Container className={s.notFound}>
        <div className={s.wrapper}>
          <p className={s.error}>4</p>
          <div className={s.catWrapper}>
            {isMobile ? (
              <img
                src="/404_m.webp"
                alt="A cat"
                srcSet="/404_m@2x.webp 2x"
                width="116px"
                className={s.image}
              />
            ) : (
              <img
                src="/404_t.webp"
                alt="A cat"
                srcSet="/404_t@2x.webp 2x"
                width={704}
                className={s.image}
              />
            )}
          </div>
          <p className={s.error}>4</p>
        </div>
        <p className={s.ooops}>Ooops! This page not found :(</p>
        <Link to="/home" className={s.link}>
          To home page
        </Link>
      </Container>
    </section>
  );
};

export default NotFounPage;
