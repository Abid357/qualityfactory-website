import Card from "../Card";
import ProductData from "./Carousel.json";

export default function Grid() {
    const items = ProductData.slice(0, 20);
    return (
        <div className="relative flex-1 flex-grid w-full mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[7%]">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 lg:gap-10 sm:gap-5 gap-3 p-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col relative w-full justify-between rounded-[5%] p-2 shadow-[3px_3px_5px_rgba(0,0,0,0.35)]"
                        style={{
                            backgroundColor: item.backgroundColor
                                ? item.backgroundColor
                                : "rgba(255, 255, 255, 0)",
                        }}
                    >
                        <div className="flex flex-row justify-between items-start">
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="w-1/3 object-contain max-h-[85%]"
                            />
                            <div className="flex flex-col items-end">
                            <img
                                src={item.fruit}
                                alt={item.name}
                                className="w-1/3 object-contain max-h-[75%]"
                            />
                            
                        <div
                            className="text-end text-xs sm:text-base md:text-base lg:text-xl italic transition-all duration-300 ease-in-out "
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
                                className="w-[40%] mx-auto object-contain max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]"
                            />
                        </div>
                        <div
                            style={{ color: item.nameColor }}
                            className="text-center"
                        >
                            {item.name}
                        </div>
                        <div
                            style={{ color: item.categoryColor }}
                            className="text-center"
                        >
                            {item.category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
