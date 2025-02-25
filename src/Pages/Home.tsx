import Contact from "./Contact";

function Home() {
  return (
    <>
      <div className="w-[80%] mt-5 mb-10 mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:h-screen">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-bold text-3xl lg:text-4xl xl:text-5xl">
              We are renovating<span className="text-[#0C7E4A]">!</span>
            </p>
            <p className="lg:text-2xl xl:text-3xl">
              Please visit us again soon
            </p>
          </div>
          <img src="/ComingSoon.png" alt="Coming Soon" className="pt-10 md:pt-0 md:h-[80%]" />
        </div>
        <Contact />
      </div>
    </>
  );
}

export default Home;
