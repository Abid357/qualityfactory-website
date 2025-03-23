import { useLocation, useNavigate } from "react-router";

export const useScrollToTop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = (path: string) => {
    // If already on target path, just scroll to top
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If not on target path, navigate and then scroll to top
      navigate(path);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  };

  return scrollToTop;
};