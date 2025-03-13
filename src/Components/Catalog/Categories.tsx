import { useState } from "react";
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
          displayType="name"
        />
        <CardGrid
          title="Explore by brand"
          items={BrandsData}
          displayType="logo"
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
  items: Array<{ logo: string; background: string; name: string }>;
  displayType: "logo" | "name";
}) {
  return (
    <div>
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10">
        {title}
        <span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10">
        {items.map((item, index) => (
          <ImageCard
            key={index}
            logo={item.logo}
            background={item.background}
            name={item.name}
            displayType={displayType}
          />
        ))}
      </div>
    </div>
  );
}

// Brand card component with hover effects
function ImageCard({
  logo,
  background,
  name,
  displayType,
}: {
  logo: string;
  background: string;
  name: string;
  displayType: "logo" | "name";
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className="h-60 md:h-80 w-full max-w-[500px]">
      <div
        className="relative h-full w-full overflow-hidden rounded-lg shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background image with grayscale filter */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "150%",
            backgroundPosition: "center",
            filter: isHovered ? "none" : "grayscale(100%)",
          }}
        />

        {/* Gradient shadow overlay from all four edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />

        {/* Colorful logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          {displayType === "logo" ? (
            <div className="relative flex items-center justify-center w-1/2 h-1/2">
              <img
                src={logo}
                alt={`${name} Logo`}
                className="max-w-full max-h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,1)] transform transition-transform duration-300 ease-in-out"
              />
            </div>
          ) : (
            <p className="text-white text-center font-bold text-3xl md:text-4xl lg:text-5xl px-6 drop-shadow-[0_0_5px_rgba(0,0,0,1),0_0_10px_rgba(255,255,255,1)] transform transition-transform duration-300 ease-in-out">
              {name}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
