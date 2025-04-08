import { ProductProps } from "./Catalog";

export default function Grid({ items }: { items: ProductProps[] }) {
  return (
    <div className="relative flex-1 flex-grid w-full mt-[5%]">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 lg:gap-y-7 sm:gap-5 gap-3 p-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col relative w-full justify-between rounded-[5%] p-2 shadow-[3px_3px_5px_rgba(0,0,0,0.35)] group overflow-x-hidden transition-all duration-300 ease-in-out hover:-translate-y-5"
            style={{
              backgroundColor: item.backgroundColor
                ? item.backgroundColor
                : "rgba(255, 255, 255, 0)",
            }}
          >
            <div className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-50 skew-x-45 transition-all duration-700 ease-in-out translate-x-150 group-hover:-translate-x-150" />
            <div className="flex flex-row justify-between items-start">
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className="w-[40%] object-contain max-h-[85%]"
              />
              <div className="flex flex-col items-end">
                <img
                  src={item.fruit}
                  alt={item.name}
                  loading="lazy"
                  className="w-1/2 object-contain max-h-[75%]"
                />

                <div
                  className="text-end text-[70%] sm:text-[80%] md:text-[90%] lg:text-[100%] italic transition-all duration-300 ease-in-out"
                  style={{ color: item.volumeColor }}
                >
                  {item.volume}
                </div>
              </div>
            </div>
            <div>
              <img
                src={item.bottle}
                alt={item.name}
                loading="lazy"
                className="w-[40%] mx-auto object-contain max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]"
              />
            </div>
            <div className="flex flex-col items-center justify-end">
              <div
                style={{ color: item.nameColor }}
                className="text-center text-nowrap font-bold text-md md:text-lg lg:text-lg transition-all duration-300 ease-in-out"
              >
                {item.name}
              </div>
              <div
                style={{ color: item.categoryColor }}
                className="text-center text-nowrap text-[50%] sm:text-[60%] md:text-[70%] lg:text-md transition-all duration-300 ease-in-out"
              >
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
