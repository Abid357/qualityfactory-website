import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFilter, setFilterType } from "../../redux/carousel/carouselSlice";
import Card from "../Card";
import BrandsData from "./Brands.json";
import CategoriesData from "./Categories.json";

export default function Categories() {
  return (
    <>
      <div className="flex flex-col gap-40">
        <CardGrid
          title="Explore by category"
          items={CategoriesData}
          displayType="category"
        />
        <CardGrid
          title="Explore by brand"
          items={BrandsData}
          displayType="brand"
        />
      </div>
    </>
  );
}

function CardGrid({
  title,
  items,
  displayType,
}: {
  title: string;
  items: Array<{
    name: string;
    logo?: string;
    background: string;
    comingSoon?: boolean;
  }>;
  displayType: "brand" | "category";
}) {
  return (
    <div>
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10">
        {title}
        <span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <ImageCard
            key={index}
            name={item.name}
            logo={item.logo}
            background={item.background}
            displayType={displayType}
            comingSoon={item.comingSoon}
          />
        ))}
      </div>
    </div>
  );
}

// Brand card component with hover effects
function ImageCard({
  name,
  logo,
  background,
  comingSoon,
  displayType,
}: {
  name: string;
  logo?: string;
  background: string;
  comingSoon?: boolean;
  displayType: "brand" | "category";
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const formattedName = name.toLowerCase().replace(/\s+/g, "");
  const handleCardClick = () => {
    if (!comingSoon) {
      dispatch(setFilter(name));
      dispatch(setFilterType(displayType));

      sessionStorage.setItem('carouselFilter', name);
      sessionStorage.setItem('carouselFilterType', displayType);

      navigate(`/catalog/${formattedName}`);
    }
  };

  return (
    <Card className="h-60 md:h-80 w-full rounded-3xl cursor-pointer">
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl shadow-[6px_6px_12px_rgba(0,0,0,0.15),-10px_-10px_6px_rgba(255,255,255,1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Background image with grayscale filter */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out bg-no-repeat bg-center bg-[size:150%] ${
            isHovered ? "" : "grayscale-0 md:grayscale"
          }`}
          style={{
            backgroundImage: `url(${background})`,
          }}
        />

        {/* Gradient shadow overlay from all four edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />

        {/* Colorful logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          {displayType === "brand" ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="w-1/2 h-1/2 flex items-center justify-center">
                <img
                  src={logo}
                  alt={`${name} Logo`}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,1)] transform transition-transform duration-300 ease-in-out"
                />
              </div>

              {comingSoon && (
                <div className="mt-4 bg-[#0C7E4A] bg-opacity-80 px-5 py-1 rounded-full shadow-lg">
                  <p className="text-white text-sm italic font-medium">
                    Coming Soon
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-center font-bold text-3xl md:text-4xl lg:text-5xl px-6 drop-shadow-[0_0_5px_rgba(0,0,0,1),0_0_10px_rgba(255,255,255,1)] transform transition-transform duration-300 ease-in-out">
                {name}
              </p>

              {comingSoon && (
                <div className="mt-4 bg-[#0C7E4A] bg-opacity-80 px-5 py-1 rounded-full shadow-lg">
                  <p className="text-white text-sm italic font-medium">
                    Coming Soon
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
