import countries from "../Home/Contact/Countries.json";
import { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { CardType } from "../../Pages/Designer";
import Volumes from "../Designer/Bottle/Volumes.json";
import Caps from "../Designer/Cap/Caps.json";

interface OptionType {
    value: string;
    label: React.ReactNode;
}

interface Country {
    name: string;
    code: string;
    dial_code: string;
    image: string;
}

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

interface FormState {
    countryCode: string;
    mobile: string;
}

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
        width: "20%",
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


export default function Share({ waveColor, capsIndex, volumesIndex, items }: { waveColor: string, capsIndex: number, volumesIndex: number, items: CardType[] }) {
    const [form, setForm] = useState<FormState>({
        countryCode: "",
        mobile: "",
    });
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.mobile) {
            setError("Please enter your mobile number.");
            return;
        }
        else {
            const mobileRegex = /^\d{7,15}$/; // Allow 7 to 15 digits
            if (!mobileRegex.test(form.mobile)) {
                setError("Please enter a valid mobile number (7-15 digits).");
                return;
            }
        }
        if (!form.countryCode) {
            setError("Please select a mobile country code.");
            return;
        }

        setError("");

        let message = "I just designed my own product on Quality Factory website! Here are the details:\n\n";
        message += `*Drink Color*: ${waveColor}\n`;
        message += `*Cap Color*: ${Caps[capsIndex].name}\n`;
        message += `*Bottle Size*: ${Volumes[volumesIndex]}\n`;

        if (items.length) {
            message += "\n*Ingredients*\n";
            items.forEach((item) => {
                message += `${item.ingredient} - ${item.amount} ${item.unit}\n`;
            });
        }

        const url = `https://wa.me/${form.countryCode}${form.mobile}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative bg-[#f8f4f4] rounded-lg shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,1)] w-full lg:w-[50%] h-fit p-5">
            <div className="absolute shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.01)] inset-0 pointer-events-none h-full w-full"></div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-4 font-semibold md:text-xl w-full"
            >
                <div className="flex flex-row w-full">
                    <div className="flex-shrink-0 md:w-[30%]">
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
                        className="w-full focus:border focus:border-[#0C7E4A] focus:outline-none focus:ring-0 bg-white text-[14px] md:text-[16px] rounded-r-lg pl-[25px] h-[60px] flex-grow"
                    />
                </div>
                <button
                    type="submit"
                    className="md:block w-full md:w-[100px] text-white bg-[#0C7E4A] hover:bg-[#73C057] transition-all duration-300 ease-in-out transform active:scale-95 rounded-md px-3 py-2 cursor-pointer"
                >
                    Share
                </button>
            </form>
            {error && <div className="w-full text-red-500 text-sm md:text-md my-2 italic">{error}</div>}
        </div>
    );
}
