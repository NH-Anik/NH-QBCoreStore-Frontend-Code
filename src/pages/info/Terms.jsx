import Layout from "../../component/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Terms = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // get footer
    const [onFooter, setOnFooter] = useState([]);
    const getFooter = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/footer/footerShow`);
        setOnFooter(res?.data.footer);
    
      } catch (error) {
        toast.error(error);
      }
    }
    useEffect(()=>{
      getFooter();
      // eslint-disable-next-line
    },[]);
    return (
        <Layout title={"Terms & Conditions"}>
            <div className="w-full px-4 py-8 md:px-8 lg:px-16 xl:px-24 2xl:px-32 text-white max-w-screen-xl mx-auto">
                <h6 className="text-4xl font-medium text-center">QBcore store Terms & Conditions</h6>
                <div className="text-center p-4">
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-justify">
                       {onFooter?.terms}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Terms;
