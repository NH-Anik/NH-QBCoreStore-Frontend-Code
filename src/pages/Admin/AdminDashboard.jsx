import { useEffect, useState } from "react";
import AdminMenu from "../../component/Layout/AdminMenu";
import Layout from "../../component/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../component/Loading";
import ModalImage from "react-modal-image";


const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    const id = auth?.user?._id;
    const [ima, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [offer,setOffer] = useState();
    const [visibleDelete,setVisibleDelete]=useState(false);

    const handleImageChange = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', ima);
            const response = await axios.put(`${baseUrl}/api/v1/auth/profile-pic/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({ ...auth, user: { ...auth.user, image: response.data.user.image } });
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, image: response.data.user.image } }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong" + error.message);
        } finally {
            setLoading(false);
            setImage(null)
        }
    };

    const [isOn, setIsOn] = useState(false);
    const [LRText,setLrText]=useState("")
    const [offerLimit,setOfferLimit]=useState("")
    const handleToggle = () => {
      setIsOn(!isOn);
    };

    const offerSetAdmin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${baseUrl}/api/v1/manage/offerSet`,{
            isOn,
            LRText,
            offerLimit
          });
          toast(response.data.message);
          getOffer();
        } catch (error) {
          toast(error.response.data.message);
          getOffer();
        }
    };
  
    // get footer
    const getOffer = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/manage/offerShow`);
        setOffer(res?.data.offer);
        setIsOn(res?.data.offer?.isOn);
        setLrText(res?.data.offer?.LRText);
        setOfferLimit(res?.data.offer?.offerLimit);
      } catch (error) {
        toast.error(error);
      }
    }

    useEffect(() => {
        getOffer();
        // eslint-disable-next-line
    }, []);
    
    const handleOfferUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/api/v1/manage/offerUpdate/${offer._id}`, {
              isOn,
              LRText,
              offerLimit
            });
            toast(response.data.message);
            getOffer();
        } catch (error) {
            toast(error.response.data.message);
            getOffer();
        }
    }

    const handleOfferDelete = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/api/v1/manage/offerDelete/${offer._id}`);
            toast(response.data.message);
            setVisibleDelete(false);
            setOffer();
            setIsOn("");
            setLrText("");
            setOfferLimit("");
        } catch (error) {
            toast(error.response.data.message);
            setVisibleDelete(false);
            getOffer();
        }
    }


    return (
        <Layout title={"Admin Dashboard"}>
            <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
                <div className='flex justify-around'>
                    {
                        loading ? <><Loading/></>  : <></>
                    }
                    <div>
                        <AdminMenu />
                    </div>
                         
                    <div>
                        <h3 className='text-2xl font-bold capitalize'>Welcome to your {auth?.user?.name} Dashboard</h3>
                        <section className="py-14 border border-white p-4 borderGlow">
                            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                                <div className="max-w-3xl mx-auto text-center">          
                                    <div className="mt-6">
                                       <ModalImage className="w-16 h-16 mx-auto rounded-full" small={auth?.user?.image} large={auth?.user?.image} alt/>
                                        <form action="" onSubmit={handleImageChange} className="flex items-center justify-center gap-4">
                                            <label htmlFor="file" className="block mt-5 cursor-pointer px-2 bg-green-600 hover:bg-green-700 text-white rounded">
                                               <div className="flex items-center gap-2">
                                                 <p>Upload Profile</p>
                                                 <svg className="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                 </svg>
                                               </div>
                                                <input type="file" className="hidden" id="file" onChange={(e) => setImage(e.target.files[0])} />
                                            </label>
                                            <button type="submit" className="block mt-5 cursor-pointer px-2 bg-green-600 hover:bg-green-700 text-white rounded">Save</button>
                                        </form>
                                        <div className="mt-6">
                                          {
                                            ima && (
                                              <div className="w-72 max-w-full mx-auto">
                                                <img src={URL.createObjectURL(ima)} alt="Product photo" height={"200px"} />
                                              </div>
                                            )
                                          }
                                        </div>

                                        <div className="mt-3">
                                            <span className="block text-white font-semibold capitalize">Name : {auth?.user?.name}</span>
                                            <span className="block text-white text-sm mt-0.5 ">Email : {auth?.user?.email}</span>
                                            <span className="block text-white text-sm mt-0.5">Role : {auth?.user?.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="my-4 border border-pro p-4 borderGlow">
                            <p className="text-xl text-center  text-pro">Offer Set in all Product</p>
                            <form action="" className="flex flex-col" onSubmit={offerSetAdmin}>
                                <label htmlFor="">Offer on or off</label>
                                <div className="flex items-center my-4">
                                  <button onClick={handleToggle} className={`${isOn ? 'bg-green-500' : 'bg-gray-300'} w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none`}>
                                    <div className={`${isOn ? 'translate-x-6' : 'translate-x-0'} w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
                                    ></div>
                                  </button>
                                  <span className="ml-2">{isOn ? 'ON' : 'OFF'}</span>
                                </div>
                          
                                <label htmlFor="">offer text right to left</label>
                                <input value={LRText} onChange={(e) => setLrText(e.target.value)} className="mb-4 text-black" type="text" placeholder="offer text right to left  "/>
                                
                                <label htmlFor="">Enter your Offer limit %</label>
                                <input value={offerLimit} onChange={(e) => setOfferLimit(e.target.value)} className="mb-4 text-black" type="number" placeholder="offer limit %"/>
                                
                                {
                                    offer?._id? 
                                    <button className="btn text-white mb-2" type="button" onClick={handleOfferUpdate} >Update Offer</button>
                                    :
                                    <button className="btn text-white mb-2" type="submit">Set Offer</button>
                                }
                               <button type="button" onClick={()=>setVisibleDelete(true)} className="btn text-red-500" >End Offer</button>
                            </form>  
                        </div>
                    </div>
                    
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
                              <p className="text-center text-2xl text-red-600">Want to Delete - Offer Details</p>
                          </div>
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                          <button onClick={handleOfferDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                        </div>
                      </div>
                  </div>
              )
            }
        </Layout>
    );
};

export default AdminDashboard;