import Card from "../../Card";
import Counter from "./Counter";
import Products from "/Stats/Products.svg";
import Countries from "/Stats/Countries.svg";
import Boxes from "/Stats/Boxes.svg";
import Experience from "/Stats/Experience.svg";

export default function Stats() {
  const calculateYearsOfExperience = () => {
    const startDate = new Date("2014-01-01");
    const currentDate = new Date();
    const yearsDifference = currentDate.getFullYear() - startDate.getFullYear();

    const hasReachedAnniversary =
      currentDate.getMonth() > startDate.getMonth() ||
      (currentDate.getMonth() === startDate.getMonth() &&
        currentDate.getDate() >= startDate.getDate());

    return hasReachedAnniversary ? yearsDifference : yearsDifference - 1;
  };

  const yearsOfExperience = calculateYearsOfExperience();

  const statsData = [
    {
      icon: Products,
      alt: "Products Developed",
      value: 53,
      label: "Products Developed",
      suffix: "",
    },
    {
      icon: Countries,
      alt: "Countries Exported",
      value: 9,
      label: "Countries Exported",
      suffix: "",
    },
    {
      icon: Boxes,
      alt: "Daily Boxes Produced",
      value: 5000,
      label: "Daily Boxes Produced",
      suffix: "+",
    },
    {
      icon: Experience,
      alt: "Years of Experience",
      value: yearsOfExperience,
      label: "Years of Experience",
      suffix: "+",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10 justify-self-center">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="w-32 md:w-60 h-32 md:h-60 flex justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center gap-3 md:gap-5 rounded-md">
              <img src={stat.icon} alt={stat.alt} className="h-7 md:h-10" />
              <Counter number={stat.value} suffix={stat.suffix} />
              <p className="md:font-semibold text-xs md:text-xl">
                {stat.label}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
