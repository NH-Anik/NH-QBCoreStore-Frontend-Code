import { Link } from "react-router-dom";
import Layout from "../component/Layout/Layout";

const PaymentCancel = () => {
    return (
        <Layout title={"Payment-Cancel"}>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
              <div className="rounded-md shadow-lg px-4 py-6">
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            <div className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                            </div>
                            <div className="mt-2 text-center">
                              <h3 className="text-lg font-medium leading-6 text-red-600 capitalize dark:text-white" id="modal-title">Payment-Cancel</h3>
                            </div>
                        </div>
                        <div className="mt-5 ">
                            <div className="flex justify-center  ">
                              <Link to={"/cart"} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Try-Again To Payment
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

export default PaymentCancel;