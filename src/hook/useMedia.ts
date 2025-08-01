import { useMediaQuery } from "react-responsive";

function useMedia() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1279px)",
  });
  const isBigScreen = useMediaQuery({
    query: "(min-width:1280px)",
  });

  return { isMobile, isTablet, isDesktop, isSmallScreen, isBigScreen };
}

export default useMedia;
