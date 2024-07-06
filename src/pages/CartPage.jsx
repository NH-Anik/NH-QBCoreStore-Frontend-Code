import Layout from "../component/Layout/Layout";
import { useAuth } from "../context/auth";
import ConfirmLogin from './ConfirmLogin';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ModalImage from "react-modal-image";
import Loading from "../component/Loading";
import '../App.css'

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  //total price from cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  //delete item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  }

  const mackPayment = async (event) => {
    event.preventDefault();
    try {
      const  res  = await axios.post(`${baseUrl}/api/v1/product/braintree/payment/stripe`, { cart,auth });
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      window.location.replace(res?.data?.url)
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  // generate promo code and discount product to total work start 

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

  const [showOffer, setShowOffer] = useState(false);
  const [offer, setOffer] = useState(0);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      const randomOffer = Math.floor(Math.random() * onOffer?.offerLimit) + 1; // Generates a number between 1 and 10
      setOffer(randomOffer);
      setShowOffer(true);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  };

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <Layout title={"Cart - QBCore Store"}>
      {
        loading && (<Loading/>)
      }
      <div className="container mx-auto">
        {
          auth?.token ?
          (<>
            <div>
              <div className='container max-w-screen-xl mx-auto px-4 text-white md:px-8 mb-4'>
                <h1 className='text-3xl text-center font-bold mt-6 text-pro sm:text-3xl'>QBCore Store Cart Select Script List</h1>
                  <h2 className="text-center bg-light p-2 mb-1 text-white capitalize">
                    {!auth?.user
                      ? "Hello Guest"
                      : `Hello  ${auth?.token && auth?.user?.name}`}
                    <p className="text-center">
                      {cart?.length
                        ? `You Have ${cart.length} items in your cart ${
                            auth?.token ? "" : "please login to checkout !"
                          }`
                        :<Link to={"/script"} className="text-center text-xl text-red-600">Your Cart Is Empty</Link> }
                    </p>
                  </h2>
              </div>

            {
              cart?.length > 0 && (<>

              <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                  <table className="w-full table-auto text-sm text-left">
                      <thead className="bg-indigo-600 text-white font-medium border-b">
                         <tr>
                            <th className="py-3 px-6">Product Title /Product Name</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Price</th>
                            {/* <th className="py-3 px-6 "></th> */}
                            <th className="py-3 px-6 w-10"> Action</th>
                         </tr>
                      </thead>
                      <tbody className="text-gray-600 divide-y">
                          {
                              cart?.map((items, idx) => (
                                  <tr key={idx}>
                                      <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                          <ModalImage className="w-16 h-16 mx-auto rounded-full" small={`${baseUrl}/api/v1/product/product-photo/${items._id}`} large={`${baseUrl}/api/v1/product/product-photo/${items._id}`} alt/>
                                          <div>
                                              <span className="block text-white text-xl font-medium">{items.name}</span>
                                          </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-white text-xl">{items.description.substring(0, 30)}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-white text-xl">${items.price}</td>
                                      <td className="text-right px-6 whitespace-nowrap">
                                          <button onClick={() => removeCartItem(items._id)}   className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Remove Cart
                                          </button>
                                      </td>
                                  </tr>
                              ))
                          }
                      </tbody>
                  </table>
              </div>

              <div className="mt-12 flex ">
                <section className='py-14 w-1/2'>
                  <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
                    <div className='relative max-w-xl space-y-3 px-4 md:px-0'>
                      <h3 className="text-indigo-600 font-semibold">
                          Pricing
                      </h3>
                      <p className='text-pro text-xl font-semibold sm:text-3xl'>
                          Pay as you grow
                      </p>
                    </div>
                    <div className='mt-16 justify-between gap-8 md:flex'>
                      <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
                        <h1 className="text-white font-black text-xl">Busker [Open Source] - <span className="font-onetext text-pro">Everything For You!</span></h1>
                        <div className="flex gap-2">
                            <div className="px-4 py-1 bg-green-500 rounded-md text-center flex items-center text-white ">ESX</div>
                            <div className="px-4 py-1 bg-blue-500 rounded-md text-center flex items-center text-white ">QBCore</div>
                        </div>
                        <div className="my-4">
                            <h4 className="text-3xl text-blue-500">PREVIEW</h4>
                            <Link to={"#"} className="text-xl text-white">Youtube Preview</Link>
                            
                            <h4 className="text-3xl text-blue-500">Documentation</h4>
                            <Link to={ '/documentation'} className="text-xl text-white">Busker Documentation</Link>
                        </div>
                      </ul>
                    </div> 
                     
                    {
                      onOffer?.isOn === true ? 
                      <>
                        <hr  className="mt-[47px] border-1 border-blue-900"/>
    
                        <div className="overflow-hidden">
                          <div className={`text-xl text-pro font-bold ${showText ? 'animate-slideInRight' : ''}`}>
                            {onOffer?.LRText}
                          </div>
                        </div>
    
                        <div className="mt-10 flex justify-center items-center flex-col">
                          <p className="text-blue-400 text-xl">Promo Offer Generate Click-Down </p>
                          <button className="btn p-4 text-white mt-4 rounded-lg" onClick={handleClick}>Generate Offer</button>
                          <p className="mt-4 text-green-500 text-2xl">{offer}% (- less)</p>
                        </div>

                      </> : ""
                    }


                  </div>
                </section>
                
                <section className='w-1/2'>
                  <div>
                    <h6 className='text-3xl text-center font-bold text-pro'>Cart Summary</h6>
                    <p className='text-2xl text-center text-white'>Total || Check Out || Payment</p>
                    <hr className="my-4" />
                    <p className='text-2xl text-center text-white'>Total  :{totalPrice()}</p>

                    <img className="h-99 w-full mt-6" src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/n88bhdrudg3lboun2pj6.png" alt="Payment Getaway Service" />
 
                    <button onClick={mackPayment} className="w-full text-xl my-6 px-4 py-2 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-green-500">Make Payment</button>
                    
                    <img className="h-99 w-full mb-4" src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/sdhlgt2on3o0bs2rc3mh.png" alt="Payment Getaway Service" />

                    <p className="text-green-200 text-center">Adding SSLCommerz payment option adds trust to your website as it's a well-known and secure payment gateway .</p>
                  </div>
                </section>
              </div>
            </>)
            }
          </div>
          </>)
          :
          (<>
            <ConfirmLogin/>
          </>)
        }
      </div>
      
    </Layout>
  );
};

export default CartPage;