import { useState } from "react";
import { HiMiniIdentification } from "react-icons/hi2";
import { FaLocationArrow } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";

interface FormState {
  name: string;
  countryCode: string;
  mobile: string;
  email: string;
  country: string;
  subject: string;
  description: string;
  password: string; // Honeypot field for spam prevention
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    countryCode: "",
    mobile: "",
    email: "",
    country: "",
    subject: "",
    description: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot validation: if password has a value, abort submission
    if (form.password) {
      setSuccess("Thank you for your submission.");
      return;
    }

    // Basic required field validations
    if (
      !form.name ||
      !form.email ||
      !form.country ||
      !form.subject ||
      !form.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    // If mobile is provided, country code is required
    if (form.mobile && !form.countryCode) {
      setError("Please select a mobile country code.");
      return;
    }

    // Validate mobile numbers: digits only and within a valid length range
    if (form.mobile) {
      const mobileRegex = /^\d{7,15}$/; // Allow 7 to 15 digits
      if (!mobileRegex.test(form.mobile)) {
        setError("Please enter a valid mobile number (7-15 digits).");
        return;
      }
    }

    setError("");

    // Prepare form data
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.append("access_key", "02f332d2-6dea-4a0f-8d2d-405d5f8777ce"); // Change API key for Quality Refreshment account later

    // Override extra fields
    //     formData.set(
    //       "text",
    //       `Name: ${form.name}
    // Email: ${form.email}
    // Country: ${form.country}
    // Mobile: ${form.countryCode} ${form.mobile}

    // Message:
    // ${form.description}`
    //     );

    // Convert FormData to JSON object for Web3forms
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Your message has been sent successfully.");
        setForm({
          name: "",
          countryCode: "",
          mobile: "",
          email: "",
          country: "",
          subject: "",
          description: "",
          password: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError(err + ". Please try again later.");
    }
  };

  return (
    <>
      <div className="w-full lg:w-[50%] bg-white rounded-lg shadow-lg p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-semibold md:text-xl w-full">
          <div>
            <label
              htmlFor="name"
              className="flex items-center gap-1"
            >
              <span className="text-[#0C7E4A]">
                <HiMiniIdentification />{" "}
              </span>{" "}
              <span>Your Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full h-[60px] bg-[#f7f7f7] pl-[25px] rounded-[6px] text-[16px]"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="countryCode"
                className="flex items-center gap-1"
              >
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="a"
                    viewBox="0 0 100 100"
                    height={20}
                  >
                    <defs>
                      <style>{".b{fill:#fff}.c{fill:#0c7e4a}"}</style>
                    </defs>
                    <circle cx={50} cy={50} r={50} className="c" />
                    <path
                      d="M32.42 50.56c-2.68 3.04-.11 6.38 1.97 8.9s7.68 8.01 10.89 7.97c3.68-.05 4.44-6.14 8.96-4.25 1.43.6 8.86 5.53 9.96 6.61 2.35 2.31 1.09 4.41-.69 6.52-7.71 9.16-19.75 1.92-26.98-4-7.62-6.23-21.93-21.49-17.98-32.21 1.11-3.01 6.49-9.23 9.9-6.1 1.6 1.47 4.93 6.82 6.11 8.89.79 1.39 1.31 2.04 1.09 3.79s-2.25 2.74-3.25 3.87z"
                      className="b"
                    />
                    <path
                      d="M44.97 23.05l28.8-.06c2.6 0 4.58 1.68 4.58 4.38v19.5c0 2.83-2.25 4.19-4.97 4.19-6.54 0-13.73.04-20.61.04-3.16 2.87-6.54 5.79-9.79 8.53-.63.53-1.85 1.4-1.85-.08V27c0-2.18 1.8-3.94 3.86-3.94zM56.9 39.96c-.65-3.3 2.74-.89 3.66-3.26 1.51-3.88-4.52-4.6-4.75-1.42-.02.25-.11.47.23.58 1.13.34.68-1.19 1.54-1.35 1.05-.2 2.03-.14 2.07 1.07.05 1.85-1.45 1.01-2.56 1.36-1.75.54-1.4 4.01-1.16 4.01h4.87c.01-.17-.15-.97-.19-.97h-3.7zm7.02-4.87c.19.21 0 4.95 0 5.75 0 .39 1.17.39 1.17 0v-7.21c0-.37-.87-.31-1.18-.21-.39.12-1.7 1.3-1.46 1.67.52.8 1.33-.16 1.47 0zm7.14 5.39c.66-.68.73-1.86.41-2.71-.11-.3-.48-.5-.52-.66-.06-.25.4-.5.52-.8.87-2.27-1.57-3.67-3.51-2.73-1.46.71-1.48 2.92-.13 2.01.25-.17.16-.87.71-1.04 1.13-.35 2.5.16 1.87 1.47-.36.74-1.02.25-1.43.52-.22.15-.24 1.02-.18 1.09.17.17 1.45-.48 1.71.73.31 1.41-.72 1.82-1.97 1.56-.86-.17-.47-.76-.92-1.21-1.3-1.32-1.32 1.94.5 2.22.79.12 2.36.14 2.94-.45zm-19.61-5.59s-.94-.03-.98 0c-.15.15.25 2.35-.18 2.64-.4.28-2.42-.05-2.55.08-.03.03-.03.94 0 .98.15.15 2.34-.25 2.64.18.28.4-.05 2.42.08 2.55.03.03.94.03.98 0 .15-.15-.25-2.35.18-2.64.4-.28 2.42.05 2.55-.08.03-.03.03-.94 0-.98-.15-.15-2.34.25-2.64-.18-.28-.4.05-2.42-.08-2.55z"
                      className="b"
                    />
                    <path
                      d="M56.9 39.96h3.7s.21.81.19.97h-4.87c-.24 0-.6-3.46 1.16-4.01 1.11-.34 2.62.49 2.56-1.36-.03-1.21-1.01-1.27-2.07-1.07-.86.16-.42 1.69-1.54 1.35-.34-.1-.25-.33-.23-.58.24-3.17 6.26-2.46 4.75 1.42-.92 2.37-4.31-.05-3.66 3.26zm14.16.52c-.58.59-2.15.57-2.94.45-1.83-.28-1.8-3.54-.5-2.22.45.45.06 1.04.92 1.21 1.25.25 2.27-.15 1.97-1.56-.26-1.21-1.54-.56-1.71-.73-.06-.06-.04-.93.18-1.09.41-.27 1.07.22 1.43-.52.63-1.32-.74-1.82-1.87-1.47-.55.17-.46.87-.71 1.04-1.35.91-1.33-1.3.13-2.01 1.94-.94 4.38.47 3.51 2.73-.12.3-.58.55-.52.8.04.16.41.37.52.66.33.84.26 2.03-.41 2.71zm-19.61-5.59c.13.13-.19 2.15.08 2.55.3.43 2.5.03 2.64.18.03.03.03.94 0 .98-.13.13-2.15-.19-2.55.08-.43.3-.03 2.5-.18 2.64-.03.03-.94.03-.98 0-.13-.13.19-2.15-.08-2.55-.3-.43-2.5-.03-2.64-.18-.03-.03-.03-.94 0-.98.13-.13 2.15.19 2.55-.08.43-.3.03-2.5.18-2.64.03-.03.94-.03.98 0zm12.47.2c-.14-.15-.95.8-1.47 0-.25-.38 1.07-1.55 1.46-1.67.31-.1 1.18-.16 1.18.21v7.21c0 .39-1.17.39-1.17 0 0-.8.19-5.54 0-5.75z"
                      className="c"
                    />
                  </svg>
                </span>{" "}
                <span>Country Code</span>
              </label>
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className=" h-[60px] bg-[#f7f7f7] pl-[10px] rounded-[6px] text-[16px]"
              >
                <option value="" disabled>
                  Code
                </option>
                <option value="+971">+971</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="mobile" className="flex items-center gap-1">
                <span className="text-[#0C7E4A]"><IoCall /></span>Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="123456789"
                pattern="\d+"
                className="h-[60px] bg-[#f7f7f7] pl-[25px] rounded-[6px] text-[16px]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label htmlFor="email" className="flex items-center gap-1">
                <span className="text-[#0C7E4A]"><IoMail /></span><span>Your Email <span className="text-red-500">*</span></span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="h-[60px] bg-[#f7f7f7] pl-[25px] rounded-[6px] text-[16px]"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="country" className="flex items-center gap-1">
                <span className="text-[#0C7E4A]"><FaLocationArrow /></span><span>Your Country <span className="text-red-500">*</span></span>
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full h-[60px] bg-[#f7f7f7] pl-[25px] rounded-[6px] text-[16px] font-semibold text-[#454545]"
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="UAE">UAE</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]"><RiMessage2Fill /></span><span>Subject <span className="text-red-500">*</span></span>
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full h-[60px] bg-[#f7f7f7] pl-[25px] rounded-[6px] text-[16px] font-semibold text-[#454545]"
            >
              <option value="" disabled>
                Select Subject
              </option>
              <option value="Product Inquiries">Product Inquiries</option>
              <option value="Factory Inquiries">Factory Inquiries</option>
              <option value="Other Inquiries">Other Inquiries</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]"><MdMessage /></span><span>Your Message <span className="text-red-500">*</span></span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="I wanted to inquire about..."
              required
              className="w-full h-[150px] pt-4 pl-[25px] border-0 bg-[#f7f7f7] rounded-[6px] text-[16px] font-semibold text-[#454545]"
            ></textarea>
          </div>
          <p className="font-normal text-red-500 text-sm">* (required)</p>
          {/* Honeypot field for spam prevention */}
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave this field blank"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <button
            type="submit"
            className="text-white bg-[#0C7E4A] rounded-md px-3 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
