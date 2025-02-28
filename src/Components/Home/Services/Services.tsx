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
    <div className="flex flex-col gap-2">
      <div className="mx-auto">
        <img src={img} alt={title} className="w-20" />
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
      <div className="flex flex-col mt-20">
        <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl mb-5">
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
      </div>
    </>
  );
}
