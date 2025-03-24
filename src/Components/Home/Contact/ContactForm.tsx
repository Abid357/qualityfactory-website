import { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import countries from "./Countries.json";
import subjectsData from "./Subjects.json";
import { FaMobileScreenButton } from "react-icons/fa6";

interface FormState {
  name: string;
  countryCode: string;
  mobile: string;
  email: string;
  residence: string;
  subject: string;
  message: string;
  password: string; // Honeypot field for spam prevention
}

interface Country {
  name: string;
  code: string;
  dial_code: string;
  image: string;
}

interface Subject {
  type: string;
}

interface OptionType {
  value: string;
  label: React.ReactNode;
}

// Custom styles for react-select
const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "0.375rem",
    minHeight: "60px",
    border: state.isFocused ? "1px solid #0C7E4A" : "0px solid",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "#0C7E4A" : "",
      boxShadow: "none",
    },
    outline: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "60px",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
  }),
};

// Separate style for CountryCode select
const countryCodeSelectStyles: StylesConfig<OptionType, false> = {
  ...customSelectStyles,
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem 0 0 0.375rem",
    minHeight: "60px",
    border: state.isFocused ? "1px solid #0C7E4A" : "0px solid",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "#0C7E4A" : "",
      boxShadow: "none",
    },
    outline: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "60px",
    width: "30%",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
  }),
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    countryCode: "",
    mobile: "",
    email: "",
    residence: "",
    subject: "",
    message: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  // Map for react-select to options
  const countryCodeOptions: OptionType[] = (countries as Country[]).map(
    (country: Country) => ({
      value: country.dial_code,
      label: (
        <div className="flex items-center">
          <img
            src={country.image}
            alt={country.name}
            className="w-7 md:w-10 md:ml-2 md:mr-1"
          />
          <span className="text-[14px] md:text-[16px]">
            {country.dial_code}
          </span>
        </div>
      ),
    })
  );

  const residenceOptions: OptionType[] = (countries as Country[]).map(
    (country: Country) => ({
      value: country.name,
      label: (
        <div className="flex items-center">
          <img
            src={country.image}
            alt={country.name}
            className="w-7 md:w-10 ml-2 md:mr-1"
          />
          <span className="text-[14px] md:text-[16px]">{country.name}</span>
        </div>
      ),
    })
  );

  const subjectOptions: OptionType[] = (subjectsData as Subject[]).map(
    (subject: Subject) => ({
      value: subject.type,
      label: (
        <span className="text-[14px] md:text-[16px] ml-2">{subject.type}</span>
      ),
    })
  );

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
      !form.residence ||
      !form.subject ||
      !form.message
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
    setLoading(true);

    // Combine countryCode and mobile into one field
    const combinedMobile = form.mobile
      ? `${form.countryCode} ${form.mobile}`
      : "";

    // Prepare form data
    const payload: { [key: string]: string } = {
      name: form.name,
      mobile: combinedMobile,
      email: form.email,
      residence: form.residence,
      subject: form.subject,
      message: form.message,
      access_key: "ba2288be-dfe7-498a-88a6-d86a09bc09fa", // Public key of Quality Refreshment account: ba2288be-dfe7-498a-88a6-d86a09bc09fa
    };

    // Convert FormData to JSON object for Web3forms
    const json = JSON.stringify(payload);

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
        setLoading(false);
        setSuccess("Your message has been sent successfully.");
        setForm({
          name: "",
          countryCode: "",
          mobile: "",
          email: "",
          residence: "",
          subject: "",
          message: "",
          password: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError(err + ". Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-[#f8f4f4] rounded-lg shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,1)] w-full lg:w-[50%] h-fit p-5">
        <div className="absolute shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.01)] inset-0 pointer-events-none h-full w-full"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 font-semibold md:text-xl w-full"
        >
          <div>
            <label htmlFor="name" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]">
                <HiMiniIdentification />{" "}
              </span>{" "}
              <span>
                Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="focus:border focus:border-[#0C7E4A] focus:outline-none focus:ring-0 bg-white pl-[25px] rounded-lg text-[14px] md:text-[16px] w-full h-[60px]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="countryCode" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]">
                <FaMobileScreenButton />
              </span>
              Mobile
            </label>
            <div className="flex flex-row">
              <div className="w-fit flex-shrink-0 lg:w-1/3">
                <Select
                  options={countryCodeOptions}
                  value={countryCodeOptions.find(
                    (option) => option.value === form.countryCode
                  )}
                  onChange={(selected) =>
                    setForm({
                      ...form,
                      countryCode: selected ? selected.value : "",
                    })
                  }
                  placeholder="Code"
                  styles={countryCodeSelectStyles}
                  className="react-select-container h-[60px]"
                  classNamePrefix="react-select"
                />
              </div>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                title="Valid mobile number (7-15 digits)."
                pattern="\d+"
                className="focus:border focus:border-[#0C7E4A] focus:outline-none focus:ring-0 bg-white text-[14px] md:text-[16px] rounded-r-lg pl-[25px] h-[60px] flex-1 min-w-0"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="email" className="flex items-center gap-1">
                <span className="text-[#0C7E4A]">
                  <IoMail />
                </span>
                <span>
                  Email <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="focus:border focus:border-[#0C7E4A] focus:outline-none focus:ring-0 bg-white pl-[25px] rounded-lg text-[14px] md:text-[16px] h-[60px]"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="residence" className="flex items-center gap-1">
                <span className="text-[#0C7E4A]">
                  <FaGlobe />
                </span>
                <span>
                  Residence <span className="text-red-500">*</span>
                </span>
              </label>
              <Select
                options={residenceOptions}
                value={residenceOptions.find(
                  (option) => option.value === form.residence
                )}
                onChange={(selected) =>
                  setForm({
                    ...form,
                    residence: selected ? selected.value : "",
                  })
                }
                placeholder="Select Residence"
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]">
                <RiMessage2Fill />
              </span>
              <span>
                Subject <span className="text-red-500">*</span>
              </span>
            </label>
            <Select
              options={subjectOptions}
              value={subjectOptions.find(
                (option) => option.value === form.subject
              )}
              onChange={(selected) =>
                setForm({ ...form, subject: selected ? selected.value : "" })
              }
              placeholder="Select Subject"
              styles={customSelectStyles}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label htmlFor="message" className="flex items-center gap-1">
              <span className="text-[#0C7E4A]">
                <MdMessage />
              </span>
              <span>
                Message <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="focus:border focus:border-[#0C7E4A] focus:outline-none focus:ring-0 bg-white rounded-lg text-[14px] md:text-[16px] font-semibold text-[#454545] w-full h-[150px] pt-4 pl-5 md:pl-[25px]"
            ></textarea>
          </div>
          <p className="font-normal text-red-500 text-sm">* (required)</p>
          {/* Honeypot field for spam prevention */}
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <button
            type="submit"
            disabled={loading || success.length > 0}
            className={`text-white bg-[#0C7E4A] hover:bg-[#73C057] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md px-3 py-2 ${
              loading || success
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {loading ? "Submitting..." : success ? "Submitted" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
