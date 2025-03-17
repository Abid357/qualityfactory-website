import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCatalogScrollPosition } from "../redux/catalog/catalogSelectors";
import Categories from "../Components/Catalog/Categories";

export default function Catalog() {
  const catalogScrollPosition = useSelector(selectCatalogScrollPosition);

  useEffect(() => {
    // Restore scroll position on mount
    if (catalogScrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: catalogScrollPosition,
          behavior: "auto",
        });
      }, 0);
    }
  }, [catalogScrollPosition]);

  return (
    <>
      <div className="flex flex-col gap-40 w-[80%] pt-60 mb-20 mx-auto">
        <div id="categories">
          <Categories />
        </div>
      </div>
    </>
  );
}
