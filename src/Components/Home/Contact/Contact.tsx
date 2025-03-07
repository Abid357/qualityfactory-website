import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { BsMailbox2 } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import ContactForm from "./ContactForm";
import Card from "../../Card";
import formImg from "/ContactUs/ContactForm.png";

export default function Contact() {
  return (
    <>
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
        Contact us<span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between my-10 gap-10">
        <div className="flex justify-center items-center lg:w-1/2">
          <img
            src={formImg}
            alt="formImg"
            className="object-contain w-full max-w-[700px] min-w-[280px] h-auto max-h-[700px]"
          />
        </div>
        <ContactForm />
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-10 md:mt-4">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <Card>
            <div className="flex justify-center items-center aspect-[4/3] md:aspect-[16/9] w-full h-full p-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.439931389467!2d55.6877521!3d25.557026499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5e3e07a1c942d%3A0x31a071a3f5f7c0e9!2sQuality%20Refreshments%20Factory!5e0!3m2!1sen!2sbd!4v1739780386734!5m2!1sen!2sbd"
                className="w-full h-full rounded-lg"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col gap-4 my-auto">
          <div className="flex items-center gap-4">
            <span className="text-[#0C7E4A] text-2xl">
              <IoLogoWhatsapp />
            </span>
            <p>
              +971 50 4567 348 <i>(WhatsApp only)</i>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#0C7E4A] text-2xl">
              <IoCall />
            </span>
            <a href="tel:+971 6 529 2984">+971 6 529 2984</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#0C7E4A] text-2xl">
              <IoMail />
            </span>
            <a href="mailto:info@qualityfactory.ae">info@qualityfactory.ae</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#0C7E4A] text-2xl">
              <BsMailbox2 />
            </span>
            <p>PO Box: 85531, Dubai, UAE</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#0C7E4A] text-2xl">
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
        </div>
      </div>
    </>
  );
}
