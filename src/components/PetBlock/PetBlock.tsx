import useMedia from "../../hook/useMedia";
import s from "./PetBlock.module.css";

const PetBlock = () => {
  const { isBigScreen, isMobile, isTablet } = useMedia();
  return (
    <div>
      {isMobile && (
        <img
          src="/add_pet.webp"
          alt="Dog"
          srcSet="/add_pet@2x.webp 2x"
          className={s.dogImage}
        />
      )}
      {isTablet && (
        <img
          src="/add_pet_t.webp"
          alt="Dog"
          srcSet="/add_pet_t@2x.webp 2x"
          className={s.dogImage}
        />
      )}
      {isBigScreen && (
        <img
          src="/add_pet_d.webp"
          alt="Dog"
          srcSet="/add_pet_d@2x.webp 2x"
          className={s.dogImage}
        />
      )}
    </div>
  );
};

export default PetBlock;
