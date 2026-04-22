import Carousel from "../../Catalog/Carousel"
import ProductData from "../../Catalog/Catalog.json"

export default function NewArrivals() {
  const newArrivals = [
    "/Catalog/Carousel/BlackTigerPrimeBottle.webp",
    "/Catalog/Carousel/BasilStrawberryPrime.webp",
    "/Catalog/Carousel/JoocyPrimeMango250.webp"
  ];
  const items = ProductData
    .filter(item => newArrivals.includes(item.bottle))
    .sort((a, b) => newArrivals.indexOf(a.bottle) - newArrivals.indexOf(b.bottle));
  return (
    <>
      <p className="flex font-bold md:justify-start justify-center text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
        New arrivals<span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="overflow-x-hidden overflow-y-auto">
        <Carousel items={items} />
      </div>
    </>
  );
}
