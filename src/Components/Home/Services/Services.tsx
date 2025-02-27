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
    <div className="flex flex-col gap-2 w-80 max-w-full">
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
          Our Services<span className="text-[#0C7E4A]">.</span>
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start md:flex-wrap md:justify-between gap-5">
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
