import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  selectCarouselFilter,
  selectCarouselFilterType,
} from "../../redux/carousel/carouselSelectors";
import { setFilter, setFilterType } from "../../redux/carousel/carouselSlice";
import ProductData from "./Catalog.json";
import BrandsData from "./Brands.json";
import CategoriesData from "./Categories.json";
import Grid from "./Grid";
import Carousel from "./Carousel";

export interface ProductProps {
  name: string,
  SKU: string,
  volume: string,
  brand: string,
  category: string,
  bottle: string,
  fruit: string,
  logo: string,
  backgroundColor: string,
  nameColor: string,
  categoryColor: string,
  volumeColor: string
}

export default function Catalog() {
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

  const title = filterType === "brand" ? `${filter} Drinks` : filter;

  return (
    <div className="flex flex-col h-fit">
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-6">
        {title}
        <span className="text-[#0C7E4A]">.</span>
      </p>
      {/* Carousel container */}
      <Carousel items={filteredProducts} />
      <Grid items={filteredProducts} />
    </div>
  );
}
