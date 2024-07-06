import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const DiscordCom = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white bg-navup flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/6 mb-4 md:mb-0 md:mr-4 bg-navup">
                <img src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/Discord-Icon.png" alt="" className="w-full" />
            </div>
            <div className="w-full md:w-3/6 text-center md:text-left">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-black">QBCore Store DISCORD SERVER</h4>
                <p className="w-full md:w-5/6 text-[#bbb9b9] my-4">On our server, you can see all of our work that has been done for our customers, as well as contact support if you have problems with the script</p>
            </div>
            <div className="w-full md:w-1/6 text-center md:text-right">
                <Link to={"https://discord.gg/qbcoreframework"} className="btn w-full md:w-5/6 flex items-center justify-center md:justify-end gap-2 py-4 px-4 rounded-md font-bold">
                    Join Discord <FaArrowUpRightFromSquare />
                </Link>
            </div>
        </div>
    );
};

export default DiscordCom;
