import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCatalogScrollPosition } from "../redux/catalog/catalogSelectors";
import Catalog from "../Components/Catalog/Catalog";

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
      <div className="flex flex-col overflow-x-hidden w-[80%] mx-auto pt-20 md:pt-32">
        <div className="flex flex-col h-full">
          <div id="carousel" className="h-fit">
            <Catalog />
          </div>
          <div className="flex justify-center my-10">
            <button
              onClick={handleBack}
              className="text-white bg-[#0C7E4A] hover:bg-[#73C057] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md w-fit px-3 py-2 cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
