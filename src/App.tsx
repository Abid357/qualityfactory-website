import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { BsMailbox2 } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
function App() {
  return (
    <>
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between items-center h-screen">
          <div>
            <p className="font-bold text-3xl">We are renovating!</p>
            <p className="">Please visit us again soon</p>
          </div>
          <img src="/ComingSoon.png" className="h-[80%]" alt="Coming Soon" />
        </div>
        <div className="flex flex-col">
          <p className="flex justify-center font-bold text-2xl">Contact us!</p>
          <div className="flex items-center gap-2 mt-5">
            <IoCall />
            <a href="tel:+971 6 529 2984">+971 6 529 2984</a>
          </div>
          <div className="flex items-center gap-2">
            <IoMail />
            <a href="mailto:info@qualityfactory.ae">info@qualityfactory.ae</a>
          </div>
          <div className="flex items-center gap-2">
            <BsMailbox2 />
            <p>PO Box: 85531, Dubai, UAE</p>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <p>Address: Industrial Area, Al Thuoob, Umm Al Quwain, UAE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
