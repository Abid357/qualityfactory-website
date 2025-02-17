import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { BsMailbox2 } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
function App() {
  return (
    <>
      <div className="w-[80%] mt-5 mb-10 mx-auto">
        <a href="/">
          <img
            src="/logo/QualityLogo.svg"
            alt=""
            className="h-[50px] md:h-[100px]"
          />
        </a>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:h-screen">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-bold text-3xl lg:text-4xl xl:text-5xl">
              We are renovating<span className="text-[#0C7E4A]">!</span>
            </p>
            <p className="lg:text-2xl xl:text-3xl">
              Please visit us again soon
            </p>
          </div>
          <img src="/ComingSoon.png" alt="Coming Soon" className="md:h-[80%]" />
        </div>
        <div className="flex flex-col mt-20">
          <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl">
            Contact us<span className="text-[#0C7E4A]">.</span>
          </p>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-[#0C7E4A]">
              <IoLogoWhatsapp />
            </span>
            <p>+971 50 4567 348 <i>(WhatsApp only)</i></p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#0C7E4A]">
              <IoCall />
            </span>
            <a href="tel:+971 6 529 2984">+971 6 529 2984</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#0C7E4A]">
              <IoMail />
            </span>
            <a href="mailto:info@qualityfactory.ae">info@qualityfactory.ae</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#0C7E4A]">
              <BsMailbox2 />
            </span>
            <p>PO Box: 85531, Dubai, UAE</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#0C7E4A]">
              <FaLocationDot />
            </span>
            <a
              href="https://maps.app.goo.gl/jSGencciHuGN6iRY6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Address: Industrial Area, Al Thuoob, Umm Al Quwain, UAE
            </a>
          </div>
          <div className="w-full aspect-[4/3] md:aspect-[16/9] mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.439931389467!2d55.6877521!3d25.557026499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5e3e07a1c942d%3A0x31a071a3f5f7c0e9!2sQuality%20Refreshments%20Factory!5e0!3m2!1sen!2sbd!4v1739780386734!5m2!1sen!2sbd"
              className="w-full h-full rounded-lg border-2 border-[#0C7E4A]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
