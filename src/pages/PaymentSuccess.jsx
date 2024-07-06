import { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const PaymentSuccess = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const  TranId  = useParams();
  const tranId=TranId.tranID
  const [products, setProducts] = useState();

  useEffect(() => {
    const getTranId = async()=>{
        try {
            const response = await axios.post(`${baseUrl}/api/v1/product/payment/single-order`,{auth,tranId});
            setProducts(response?.data?.order)
            if(response.data.ok){
              toast(response.data.message)
            }
            localStorage.removeItem("cart");
            setCart([]);
        } catch (error) {
            toast("Token not found or something went wrong please try again")
        }
    }
    getTranId();
    // eslint-disable-next-line
},[1])

  return (
    <Layout title={"Payment-success"}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
          <div className="rounded-md shadow-lg px-4 py-6">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </div>
                        <div className="mt-2 text-center">
                          <h3 className="text-lg font-medium leading-6 text-green-600 capitalize dark:text-white" id="modal-title">Payment-success</h3>
                          <h6 className="text-lg font-medium leading-6 text-blue-600 capitalize dark:text-white">Check Your Email & Download Script</h6>
                        </div>
                    </div>
                    <div className="mt-5 ">
                        <div className="flex justify-center  ">
                          <Link to={"/dashboard/user/orders/"} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                            OK
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;