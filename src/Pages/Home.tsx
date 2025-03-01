import Contact from "../Components/Home/Contact/Contact";
import OpeningHours from "../Components/Home/OpeningHours/OpeningHours";
import Services from "../Components/Home/Services/Services";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <div className="hidden md:block absolute h-[40px] w-full bg-gradient-to-r from-[#f5f7f7] to-[#c6c9c4]"></div>
        <div className="hidden md:block absolute h-[200px] left-0 w-full h-32 bg-gradient-to-t to-[#EDEBE8] from-transparent"></div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover md:mt-10"
        >
          <source src="/landing-page.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 w-full md:h-32 h-8 bg-gradient-to-t from-[#EDEBE8] to-transparent"></div>
      </div>
      <div className="left-0 w-full md:h-32 h-8 bg-gradient-to-t to-[#EDEBE8] from-transparent"></div>
      <div className="flex flex-col gap-40 w-[80%] my-20 mx-auto">
        <Services />
        <OpeningHours />
        <Contact />
      </div>
    </>
  );
}
