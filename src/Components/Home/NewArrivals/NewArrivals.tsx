import Carousel from "../../Catalog/Carousel"
import ProductData from "../../Catalog/Catalog.json"

export default function NewArrivals() {
  const items = ProductData.filter(item => item.brand === "Joocy Prime");
  return (
    <>
      <p className="flex font-bold md:justify-start justify-center text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
        New Arrivals<span className="text-[#0C7E4A]">.</span>
      </p>
      <Carousel items={items} />
    </>
  );
}
