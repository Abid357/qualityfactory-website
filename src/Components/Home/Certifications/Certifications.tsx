import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import Card from "../../Card";

export default function Certifications() {
  return (
    <>
      {/* Small screen layout */}
      <div className="md:hidden flex flex-col items-center">
        <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
          We are certified<span className="text-[#0C7E4A]">.</span>
        </p>
        <img
          src="/Certifications/Medals.svg"
          alt="certifications"
          className="w-full max-w-md mb-5"
        />
        <Link to="/certificates">
          <Card>
            <button className="flex justify-center items-center gap-3 font-bold text-[#0C7E4A] hover:text-white bg-white hover:bg-[#0C7E4A] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md px-4 py-2">
              <FaEye />
              <p>Certificates</p>
            </button>
          </Card>
        </Link>
      </div>

      {/* Medium screen layout */}
      <div className="hidden md:flex flex-row items-center gap-8 lg:gap-16">
        <div className="w-1/2">
          <img
            src="/Certifications/Medals.svg"
            alt="certifications"
            className="w-full"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center">
          <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
            We are certified<span className="text-[#0C7E4A]">.</span>
          </p>
          <Link to="/certificates">
            <Card>
              <button className="flex justify-center items-center gap-3 font-bold text-[#0C7E4A] hover:text-white bg-white hover:bg-[#0C7E4A] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md px-4 py-2">
                <FaEye />
                <p>Certificates</p>
              </button>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
