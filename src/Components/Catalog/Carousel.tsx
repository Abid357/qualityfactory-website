import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  selectCarouselFilter,
  selectCarouselFilterType,
} from "../../redux/carousel/carouselSelectors";
import { setFilter, setFilterType } from "../../redux/carousel/carouselSlice";
import ProductData from "./Carousel.json";
import BrandsData from "./Brands.json";
import CategoriesData from "./Categories.json";

export default function Carousel() {
  const dispatch = useDispatch();
  const filterFromRedux = useSelector(selectCarouselFilter);
  const filterTypeFromRedux = useSelector(selectCarouselFilterType);
  const { products } = useParams<{ products: string }>();
  const urlParam = products?.toLowerCase() || "";

  // Find matching item name from URL
  const findMatchingName = (urlParam: string) => {
    // Check in brands
    const matchingBrand = BrandsData.find(
      (brand) => brand.name?.toLowerCase().replace(/\s+/g, "") === urlParam
    );
    if (matchingBrand) {
      return { name: matchingBrand.name, type: "brand" };
    }

    // Check in categories
    const matchingCategory = CategoriesData.find(
      (category) =>
        category.name?.toLowerCase().replace(/\s+/g, "") === urlParam
    );
    if (matchingCategory) {
      return { name: matchingCategory.name, type: "category" };
    }

    return null;
  };

  useEffect(() => {
    if (urlParam) {
      const matchingItem = findMatchingName(urlParam);

      if (matchingItem) {
        // Update Redux with the matching item's info
        dispatch(setFilter(matchingItem.name));
        dispatch(setFilterType(matchingItem.type));
      }
    }
  }, [urlParam, dispatch]);

  const filter = filterFromRedux || "";
  const filterType = filterTypeFromRedux || "";

  const filteredProducts = useMemo(() => {
    if (!filter || !filterType) return ProductData;
    return ProductData.filter((item) => {
      if (filterType === "category") {
        return item.category === filter;
      } else if (filterType === "brand") {
        return item.brand === filter;
      }
      return false;
    });
  }, [filter, filterType]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [sliding, setSliding] = useState(false);
  const [fading, setFading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const totalItems = filteredProducts.length;

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter, filterTypeFromRedux]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  // Handle next slide
  const handleNext = () => {
    if (sliding || fading || activeIndex === totalItems - 1) return;

    // Start with fade out
    setFading(true);

    // Start sliding transition
    setTimeout(() => {
      setDirection("left");
      setSliding(true);

      // Update active index
      setTimeout(() => {
        setActiveIndex((current) => current + 1);
        setSliding(false);

        // Start fade in
        setTimeout(() => {
          setFading(false);
        }, 500); // pause before fade in
      }, 0); // pause before slide
    }, 500); // pause after fade out
  };

  // Handle previous slide
  const handlePrev = () => {
    if (sliding || fading || activeIndex === 0) return;

    // Start with fade out
    setFading(true);

    // Start sliding transition
    setTimeout(() => {
      setDirection("right");
      setSliding(true);

      // Update active index
      setTimeout(() => {
        setActiveIndex((current) => current - 1);
        setSliding(false);

        // Start fade in
        setTimeout(() => {
          setFading(false);
        }, 500); // pause before fade in
      }, 0); // pause before slide
    }, 500); // pause after fade out
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    if (sliding || fading || index === activeIndex) return;
    // Determine direction for transition
    const newDirection = index > activeIndex ? "left" : "right";
    setDirection(newDirection);

    // Transition for navigation dots
    setFading(true);

    setTimeout(() => {
      setSliding(true);

      setTimeout(() => {
        setActiveIndex(index);
        setSliding(false);

        setTimeout(() => {
          setFading(false);
        }, 500);
      }, 0);
    }, 500);
  };

  const getItemsWithPositions = () => {
    return filteredProducts.map((item, index) => {
      // Calculate the position relative to activeIndex
      const position = index - activeIndex;

      // Determine if item is prev, current, or next
      let positionName = "other";
      if (position === -1) {
        positionName = "prev";
      } else if (position === 0) {
        positionName = "current";
      } else if (position === 1) {
        positionName = "next";
      }

      return {
        ...item,
        index,
        position,
        positionName,
      };
    });
  };

  const itemsWithPositions = getItemsWithPositions();

  const title = filter;

  return (
    <div className="flex flex-col h-fit">
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-6">
        {title}
        <span className="text-[#0C7E4A]">.</span>
      </p>
      {/* Carousel container */}
      <div className="relative flex-1 w-full mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[7%]">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 z-10 flex justify-between w-full">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sliding || fading || activeIndex === 0}
          >
            <FaArrowLeft className="text-[#0C7E4A]" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sliding || fading || activeIndex === totalItems - 1}
          >
            <FaArrowRight className="text-[#0C7E4A]" />
          </button>
        </div>

        {/* Carousel items */}
        <div className="flex-none relative h-[360px] sm:h-[400px] w-full">
          {initialized &&
            itemsWithPositions.map((item) => {
              const isCurrent = item.positionName === "current";
              const isPrev = item.positionName === "prev";
              const isNext = item.positionName === "next";
              const isVisible = isCurrent || isPrev || isNext;

              const basePosition = item.position * 100;
              let slideOffset = 0;

              if (sliding) {
                if (direction === "left") {
                  slideOffset = -100;
                } else if (direction === "right") {
                  slideOffset = 100;
                }
              }

              const transformX = `${basePosition + slideOffset}%`;

              return (
                <div
                  key={`${item.index}`}
                  className={`transition-all duration-1000 ease-in-out absolute top-0 left-0 xl:left-[35%] w-full xl:w-1/3 h-full ${
                    isVisible ? "" : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform: `translateX(${transformX})`,
                  }}
                >
                  <div
                    className={`relative flex flex-col items-center justify-center rounded-full transition-all duration-300 w-[240px] sm:w-[280px] md:w-[320px] h-[360px] sm:h-[400px] mx-auto`}
                    style={{
                      backgroundColor:
                        isCurrent && !fading
                          ? item.backgroundColor
                          : "rgba(255, 255, 255, 0)",
                    }}
                  >
                    {/* Bottle image */}
                    <img
                      src={item.bottle}
                      alt={item.name}
                      className="absolute -top-20 left-5 h-[100%]"
                    />
                    {item.fruit && (
                      <div className="absolute -top-2 -right-2 flex justify-center items-center h-[30%] md:h-[40%] w-[40%] md:w-[55%]">
                        <img
                          src={item.fruit}
                          alt={item.name}
                          className="h-auto w-full object-contain"
                          style={{
                            opacity: isCurrent && !fading ? 1 : 0,
                          }}
                        />
                      </div>
                    )}

                    {/* Product details */}
                    <div className="absolute left-[55%] md:left-[47%] transition-all duration-300 ease-in-out">
                      <p
                        className="font-bold text-xl md:text-3xl xl:text-4xl transition-all duration-300 ease-in-out"
                        style={{
                          color: item.nameColor,
                          opacity: isCurrent && !fading ? 1 : 0,
                          fontSize:
                            item.name && item.name.length > 9
                              ? `calc(1.5rem - ${
                                  Math.min(item.name.length - 7, 10) * 0.07
                                }rem)`
                              : undefined,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-sm transition-all duration-300 ease-in-out mt-1"
                        style={{
                          color: item.categoryColor,
                          opacity: isCurrent && !fading ? 1 : 0,
                        }}
                      >
                        {item.category}
                      </p>
                      <p
                        className="italic transition-all duration-300 ease-in-out mt-4"
                        style={{
                          color: item.volumeColor,
                          opacity: isCurrent && !fading ? 1 : 0,
                        }}
                      >
                        {item.volume}
                      </p>
                    </div>
                    {/* Logo */}
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="absolute -bottom-4 h-12 w-24 bg-[#f8f4f4] rounded-[50%] p-2 object-contain transition-all duration-300 ease-in-out"
                      style={{
                        opacity: isCurrent && !fading ? 1 : 0,
                        border: `2px solid ${item.backgroundColor}`,
                        borderColor: item.backgroundColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-10 gap-2">
          {filteredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 w-2 sm:w-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-[#0C7E4A] w-5"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={sliding || fading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
