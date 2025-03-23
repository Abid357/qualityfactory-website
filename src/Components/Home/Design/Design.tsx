import { Link } from "react-router";
import DesignImg from "/Design/Design.png";
import Card from "../../Card";

export default function Design() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="">
          <img src={DesignImg} alt="" className="w-full" />
        </div>
        <div className="flex items-end justify-center mt-5 md:mt-0 md:px-10 md:relative">
          <Link to="/design" className=" md:absolute md:mt-0">
            <Card>
              <button className="flex justify-center items-center gap-3 font-bold text-[#0C7E4A] hover:text-white bg-white hover:bg-[#0C7E4A] transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
                <p>Start</p>
              </button>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
