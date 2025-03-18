import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCatalogScrollPosition } from "../redux/catalog/catalogSelectors";
import Carousel from "../Components/Catalog/Carousel";

export default function ProductCarousel() {
  const navigate = useNavigate();
  const catalogScrollPosition = useSelector(selectCatalogScrollPosition);

  const handleBack = () => {
    navigate("/catalog");
    window.scrollTo({
      top: catalogScrollPosition,
      behavior: "auto",
    });
  };
  return (
    <>
      <div className="flex flex-col overflow-hidden h-screen w-[80%] mx-auto pt-20 md:pt-32">
        <div className="flex flex-col h-full md:mb-10">
          <div id="carousel" className="flex flex-col h-full">
            <Carousel />
            <div className="flex justify-center mt-20">
              <button
                onClick={handleBack}
                className="text-white bg-[#0C7E4A] hover:bg-[#73C057] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md w-fit px-3 py-2"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
