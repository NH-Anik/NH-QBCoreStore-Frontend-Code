import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa";

const LiveConsol = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // const tableItems 
    const [allUsers, setAllUsers] = useState([]);
    const getAllUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/auth/live-consol`);
        setAllUsers(data);
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    };

    const [lastOrders, setLastOrders] = useState(null);
    const getLastOrdes = async () => {
      const { data } = await axios.get(`${baseUrl}/api/v1/auth/last-order`);
      setLastOrders(data);
    };   

    // lifecycle method
    useEffect(() => {
      getAllUser();
      getLastOrdes();
    }, []); 
  
    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white  flex flex-col md:flex-row mb-4 gap-6">    
          <div className="w-full sm:w-[60%] rounded-md p-5 bg-navup">
             <div>
              <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text"><FaRegChartBar className="bg-gradient-to-r text-blue-600 via-green-500 to-indigo-400 bg-clip-text"/>Statistics</p>
            </div>
            <div className="mt-2">
              <div className="flex justify-between">
                <p>Last Buyer : </p><span className="text-right capitalize">{lastOrders?.buyer?.name}</span>
              </div>
              <div className="flex justify-between">
                <p>Last Package : </p><span className="text-right">{lastOrders?.products[0]?.name}</span>
              </div>
              <div className="flex justify-between">
                <p>Total Customers : </p><span className="text-right">{allUsers?.length+851}</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[40%] rounded-md p-5 bg-navup">
            <div>
              <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
                <FaUsers className="bg-gradient-to-r text-blue-600 via-green-500 to-indigo-400 bg-clip-text"/>
                Member List
              </p>
            </div>
            <div className="overflow-hidden flex flex-wrap my-2">
              {
                allUsers.map((user, index) => (
                  <p key={index} className="capitalize whitespace-nowrap mr-2 mb-2">{user.name},</p>
                ))
              }
            </div>
            <div className="border-t border-sky-500 pt-1">
              <p>Total Member: {allUsers?.length}</p>
            </div>
          </div>
        </div>
    );
};

export default LiveConsol;