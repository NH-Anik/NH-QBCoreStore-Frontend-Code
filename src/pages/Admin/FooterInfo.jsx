import { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import Loading from "../../component/Loading";
import AdminMenu from "../../component/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const FooterInfo = () => {
    const [loading, setLoading] = useState(false);
    const [terms, setTerms] = useState("");
    const [privacypolicy, setPrivacypolicy] = useState("");
    const [impressum, setImpressum] = useState("");
    const [onFooter, setOnFooter] = useState([]);
    const [visibleDelete,setVisibleDelete]=useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${baseUrl}/api/v1/footer/footerCreate`,{
          terms,
          privacypolicy,
          impressum
        });
        toast(response.data.message);
        getFooter();
      } catch (error) {
        toast(error.response.data.message);
        getFooter();
      }
    };

    // get footer
    const getFooter = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/footer/footerShow`);
        setOnFooter(res?.data.footer);
        setTerms(res?.data.footer?.terms);
        setPrivacypolicy(res?.data.footer?.privacypolicy);
        setImpressum(res?.data.footer?.impressum);
      } catch (error) {
        toast.error(error);
      }
    }
  
    useEffect(() => {
      getFooter();
      // eslint-disable-next-line
    }, []);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${baseUrl}/api/v1/footer/footerUpdate/${onFooter._id}`, {
          terms,
          privacypolicy,
          impressum
        });
        toast(response.data.message);
        getFooter();
      } catch (error) {
        toast(error.response.data.message);
        getFooter();
      }
    }

    const handleDelete = async () => {
      try {
        const response = await axios.delete(`${baseUrl}/api/v1/footer/footerDelete/${onFooter._id}`);
        toast(response.data.message);
        setVisibleDelete(false);
        getFooter();
        setTerms("");
        setPrivacypolicy("");
        setImpressum("");
      } catch (error) {
        toast(error.response.data.message);
        setVisibleDelete(false);
        getFooter();
      }
    }

    return (
        <Layout title="Footer Info">
             <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
                <div className='flex'>
                    {
                      loading ? <><Loading/></>  : <>
                      <div className="w-[50%]">
                          <AdminMenu />
                      </div>
                       
                      <div className="w-[50%]">
                        <h3 className='text-2xl font-bold capitalize text-center'>Footer Info Add</h3>
                        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                            <div className="max-w-3xl mx-auto text-center">
                              <div className="mt-6">
                                <div   className="max-w-md mx-auto">
                                  <div className="mb-4">
                                    <label htmlFor="terms" className="block text-white font-bold mb-2">Terms</label>
                                    <textarea value={terms} onChange={(e) => setTerms(e.target.value)} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline h-32 "/>
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor="privacypolicy" className="block text-white font-bold mb-2">Privacy Policy</label>
                                    <textarea value={privacypolicy} onChange={(e) => setPrivacypolicy(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline h-32"/>
                                  </div>
                                  <div className="mb-6">
                                    <label htmlFor="impressum" className="block text-white font-bold mb-2">Impressum</label>
                                    <textarea value={impressum} onChange={(e) => setImpressum(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline h-32"/>
                                  </div>
                                  <div className="flex items-center justify-between">
                                  {
                                    onFooter?._id? 
                                    <>
                                    <div className="mt-6 flex gap-6 justify-center">
                                      <button onClick={handleUpdate} className="px-6 py-2 text-white rounded-sm shadow-sm dark:bg-violet-400 bg-blue-500">Update</button>
                                      <button onClick={()=>setVisibleDelete(true)} className="px-6 py-2 text-white rounded-sm shadow-sm dark:bg-violet-400 bg-red-500">Delete</button>
                                    </div>
                                    </>
                                    :
                                    <>
                                      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                      Save
                                      </button>
                                    </>
                                  }
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
            </div>

            {
              visibleDelete && (
                  <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                          <div className="rounded-md shadow-lg px-4 py-6">
                              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-red-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg> 
                              </div>
                              <h6 className="text-lg text-center text-white">Are you sure ?</h6>
                              <p className="text-center text-2xl text-red-600">Want to Delete - Footer Details</p>
                              <p className="text-center text-xl text-white">Terms, Privacy Policy, Impressum</p>
                          </div>
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                          <button onClick={handleDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                        </div>
                      </div>
                  </div>
              )
            }
        </Layout>
    );
};

export default FooterInfo;