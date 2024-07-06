import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import HomeInFour from './../component/Homeinfour';
import DiscordCom from './../component/DiscordCom';
import Layout from "../component/Layout/Layout";
import HeroRight from "../component/HeroRight";
import LiveConsol from './../component/LiveConsol';

const Home = () => {
    return (
        <Layout title={"Home - QBCore"}>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full md:w-1/2"> 
                       <h1 className="font-black text-4xl md:text-3xl">UPRAGE YOUR SERVER -<span className="font-onetext text-pro">With us!</span></h1>
                       <h2 className=" font-light text-xl my-6">We create our own game modifications, customize gameplay, add new features and additional features for players.</h2>
                       <Link to='/script' className='btn w-full md:w-5/6  flex items-center justify-center md:justify-center gap-2 py-4 px-4 rounded-md font-bold mb-4'>
                         Our Servers <FaArrowUpRightFromSquare />
                       </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <HeroRight />
                    </div>
                </div>
                <HomeInFour />
                <LiveConsol/>
                <DiscordCom/>
            </div>
        </Layout>
    );
};

export default Home;