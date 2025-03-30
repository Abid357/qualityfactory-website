import Slider from "./Slider";
import CustomersImage from "./Customers.json";

export default function Customers() {
  return (
    <>
      <p className="flex justify-center font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5 lg:mb-10">
        Meet our customers<span className="text-[#0C7E4A]">.</span>
      </p>
      <Slider blurBorders={true} blurBorderColor={"#f8f4f4"} duration={10} pauseOnHover={true}>
        {CustomersImage.map((customer, index) => (
          <Slider.Slide key={index}>
          <div className="flex items-center justify-center w-full h-full mx-5">
            <img
              src={customer.image}
              alt="customer"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Slider.Slide>
        ))}
      </Slider>
    </>
  );
}
