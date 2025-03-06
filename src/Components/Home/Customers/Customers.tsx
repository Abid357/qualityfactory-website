import Slider from "react-infinite-logo-slider";
import Customerss from "./Customers.json";

export default function Customers() {
  return (
    <>
      <p className="flex justify-center font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10">
        Meet our customers<span className="text-[#0C7E4A]">.</span>
      </p>
      <Slider blurBorders={true} blurBorderColor={"#f8f4f4"}>
        {Customerss.map((customer, index) => (
          <div key={index} className="flex items-center">
            <Slider.Slide>
              <img src={customer.image} alt="customer" className="w-36" />
            </Slider.Slide>
          </div>
        ))}
      </Slider>
    </>
  );
}
