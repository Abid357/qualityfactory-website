import { Fragment } from "react";
import servicesData from "./Services.json";

const ServiceItem = ({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) => {
  const titleParts = title.split("&");

  return (
    <div className="flex flex-col text-center gap-2">
      <div className="h-24 mx-auto flex items-end justify-center">
        <img src={img} alt={title} className="w-20 h-full object-contain" />
      </div>
      <p className="font-bold text-xl">
        {titleParts.map((part, index) => (
          <Fragment key={index}>
            {index > 0 && <span className="text-[#0C7E4A]">&</span>}
            {part}
          </Fragment>
        ))}
      </p>
      <p>{description}</p>
    </div>
  );
};

export default function Services() {
  return (
    <>
      <p className="flex font-bold md:justify-start justify-center text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5 lg:mb-10">
        Our services<span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-5 justify-items-center">
        {servicesData.services.map((service, index: number) => (
          <ServiceItem
            key={index}
            img={service.img}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </>
  );
}
