import { useNavigate } from "react-router";
import Carousel from "../Components/Catalog/Carousel";

export default function ProductCarousel() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/catalog");
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  return (
    <>
      <div className="flex flex-col gap-40 w-[80%] pt-60 mb-20 mx-auto">
        <div id="carousel">
          <Carousel />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleBack}
            className="text-white bg-[#0C7E4A] hover:bg-[#73C057] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md w-fit px-3 py-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
