import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  selectCarouselFilter,
  selectCarouselFilterType,
  selectCarouselViewType,

} from "../../redux/carousel/carouselSelectors";
import { setFilter, setFilterType, setViewType } from "../../redux/carousel/carouselSlice";
import ProductData from "./Catalog.json";
import BrandsData from "./Brands.json";
import CategoriesData from "./Categories.json";
import Grid from "./Grid";
import Carousel from "./Carousel";
import { MdOutlineViewCarousel } from "react-icons/md";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

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
  const viewTypeFromRedux = useSelector(selectCarouselViewType);
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

  const [viewType, setViewTypeState] = useState(viewTypeFromRedux || "carousel");
  useEffect(() => {
    dispatch(setViewType(viewType));
  }, [viewType, dispatch]);

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

  const title = filterType === "brand" ? `${filter} Drinks` : filter;

  const toggleViewType = () => setViewTypeState(viewType === 'carousel' ? 'grid' : 'carousel');

  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center md:mt-4">
        <p className="flex font-bold text-2xl lg:text-4xl xl:text-5xl whitespace-nowrap">
          {title}
          <span className="text-[#0C7E4A]">.</span>
        </p>
        <div className="flex flex-row">
          <label className='inline-flex cursor-pointer select-none items-center justify-center border border-black rounded-md'>
            <input
              type='checkbox'
              className='sr-only'
              checked={viewType == 'carousel'}
              onChange={toggleViewType}
            />
            <span
              className={`flex gap-2 items-center rounded-md py-2 px-[18px] text-xs sm:text-xs md:text-sm transition-colors duration-400 ${viewType == 'carousel' ? 'text-white bg-[#0C7E4A]' : 'text-gray-400'
                }`}
            >
              <MdOutlineViewCarousel className="text-[130%] md:text-md" />
              Single View
            </span>
            <span
              className={`flex gap-2 items-center space-x-[6px] rounded-md py-2 px-[18px] text-xs sm:text-xs md:text-sm transition-colors duration-400 ${viewType == 'grid' ? 'text-white bg-[#0C7E4A]' : 'text-gray-400'
              }`}
            >
              <TfiLayoutGrid3Alt className="text-[80%] md:text-md" />
              Grid View
            </span>
          </label>
        </div>
      </div>
      {viewType === "carousel" && <Carousel items={filteredProducts} filter={filter} filterType={filterType} />}
      {viewType === "grid" && <Grid items={filteredProducts} />}
    </div>
  );
};
