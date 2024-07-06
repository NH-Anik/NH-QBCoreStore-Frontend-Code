import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping   } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartProvider";
import SearchInput from './../From/SearchInput';
import { FaDiscord } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate()
  const [cart] = useCart();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handelLogout = () => {
    setAuth({
        ...auth,
        user:null,
        token:""
    })
    localStorage.removeItem("auth")
    setTimeout(() => {
        navigate("/"); 
     }, 1000)
    toast.success("Logout Successfully")
    setVisibleLogout(false);
  }

  const [isImageVisible, setIsImageVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsImageVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [visibleLogout,setVisibleLogout]=useState(false);
  // all device show menu 
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [online, setOnline] = useState(0);
  const test = async () => {
    try {
      const response = await axios.get('https://discord.com/api/guilds/819860772570005505/widget.json');
      setOnline(response.data);
    } catch (error) {
      // toast.error(`Error: ${error}`);
    }
  }

  useEffect(() => {
    test();
  }, []);


    // get offer on off work start
    const [onOffer, setOnOffer] = useState(null);
    // console.log(offer?.LRText);
    const getOffer = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/manage/offerShow`);
        setOnOffer(res?.data?.offer);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      }
    }
  
    useEffect(()=>{
      getOffer();
      // eslint-disable-next-line
    },[]);

    const [showText, setShowText] = useState(false);

    useEffect(() => {
      setShowText(true);
    }, []);
    return (
        <div>
          {
            onOffer?.isOn === true ? 
            <>
              <div className="overflow-hidden">
                <div className={`text-xl text-pro font-bold ${showText ? 'animate-slideInRight' : ''}`}>
                  {onOffer?.LRText}
                </div>
              </div>
              
            </> : ""
          }
          <div className="downShadow">
            <div className="bg-navup border-gray-200 dark:bg-gray-900 dark:border-gray-700 py-3 px-2">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex justify-center items-center w-[80%]">
                  <div className="flex flex-col sm:flex-row justify-center py-2 text-white border border-spacing-1 px-2 rounded-lg btn">
                    <p className="border-e-2 mr-2 pr-2 flex flex-row items-center justify-center text-[16px]">
                      #1 <img className="h-3 ml-2" src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/jnhm2pgxuvkr3rwyh0zf.png" alt /> FiveM Market Since 2020
                    </p>
                    <p className="mr-2 pr-2 flex items-center text-[14px]">
                      We are the FIRST server seller of FiveM
                    </p>
                  </div>
                </div>

                <div className="text-white mt-3 md:mt-0 flex items-center justify-center">
                  <div className="flex items-center ms-3 btn px-2 py-1 rounded-md mr-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 inline-block relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                      </div>
                    </div>
                    <Link to={"https://discord.gg/qbcoreframework"} target="_blank" className="text-white mx-2 flex justify-center items-center gap-1"><FaDiscord /> Online:{online?.presence_count}</Link>
                  </div>
                  {
                    !auth?.user ? 
                      <>
                      <Link to={"/cart"} className="flex items-center gap-2 px-2 py-1 bg-pro rounded-md">
                         Cart is empty <FaCartShopping />  
                      </Link>
                      </>
                    :
                      <>
                      <Link to={"/cart"} className="flex items-center gap-2 px-2 py-1 bg-pro rounded-md">
                        {
                          cart?.length > 0 ? <>Cart is ({cart?.length})  <FaCartShopping /></>: <>Cart is empty <FaCartShopping /></>
                        }
                      </Link>
                    </>
                  }
                  {
                    !auth?.user ? 
                    <></>
                    :
                    <div className="flex items-center">
                      <div className="flex items-center ms-3 relative">
                        <button onClick={handleDropdownClick} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:focus:ring-pro">
                          <span className="sr-only">Open user menu</span>
                          <img className="w-8 h-8 rounded-full uppercase text-2xl font-bold text-pro" src={auth?.user?.image} alt={auth?.user?.name[0]} />
                        </button>
                        {isImageVisible && (
                          <div className="absolute top-full right-0 z-50 mt-2 text-base bg-navup divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 w-48">
                            <div className="px-4 py-3">
                              <p className="text-sm text-white dark:text-white capitalize">
                                {auth?.user?.name} 
                              </p>
                              <p className="text-sm font-medium text-white truncate dark:text-gray-300">
                               {auth?.user?.email}
                              </p>
                            </div>
                            <ul>
                              <li>
                                <Link to={`/dashboard/${auth?.user?.role===1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-pro">Dashboard</Link>
                              </li>
                              <li>
                                <button onClick={() => setVisibleLogout(true)} className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-pro">Sign out</button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <nav className="border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto px-4 pb-4 pt-1 md:flex-wrap md:gap-2">
                <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse z-50">
                  <img src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/qbcore_Store-icon.png" className="h-16" alt="QBCore Store" />
                </Link>
                
                <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                </button>
        
                <div className={`w-full md:flex md:w-auto ${menuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                  <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 mt-4 font-medium md:border-none lg:border-none border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                       <SearchInput /> </li>
                    <li>
                      <NavLink to={"/"}  className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-pro px-4 py-2 m-2 bg-navup rounded-md" : "text-white px-4 py-2 m-2"}  aria-current="page">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/script"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-pro px-4 py-2 m-2 bg-navup rounded-md" : "text-white px-4 py-2 m-2"} >Script</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/discord"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-pro px-4 py-2 m-2 bg-navup rounded-md" : "text-white px-4 py-2 m-2"} >Discord Server</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/documentation"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-pro px-4 py-2 m-2 bg-navup rounded-md" : "text-white px-4 py-2 m-2"} >Documentation</NavLink>
                    </li>
                    <li>
                      {
                        !auth?.user ?(
                          <div className="flex items-center gap-1">
                            <Link to={"/login"} className="text-white bg-teal-600 hover:bg-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-teal-600 dark:hover:bg-teal-700 ">Sign in</Link>
                            <Link to={"/registration"} className="text-white bg-teal-600 hover:bg-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-teal-600 dark:hover:bg-teal-700 ">Sign up</Link>
                          </div>
                        ):<></>
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {
              visibleLogout && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
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
                        </div>
                      <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                        <button onClick={()=>{setVisibleLogout(false)}} className="px-6 py-2 rounded-sm text-blue-600">Cancel</button>
                        <button onClick={handelLogout} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">LogOut</button>
                      </div>
                    </div>
                </div>
              )
            }
        </div>

       
      </div>
    );
};

export default Header;