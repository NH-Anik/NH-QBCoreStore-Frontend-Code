import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import { useCart } from "../context/CartProvider";
import toast from "react-hot-toast";
import DiscordCom from "../component/DiscordCom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/notfound.json";
import Spinner from "../component/Spinner";
import ModalImage from "react-modal-image";

const ProductDetails = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [loading, setLoading] = useState(false);
    //initalp details
    useEffect(() => {
      if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };

    return (
        <Layout title={"Product Details"}>
          {
            loading ? <><Spinner/></>:<>
          {
            product?(<>
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
             <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                       <ModalImage className="object-cover object-center w-full h-64 lg:h-80" small={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} large={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt/>
                       {/* <img src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt="" className="w-full"/> */}
                  </div>
                  <div className="w-full md:w-1/2">
                      <h1 className="font-black text-3xl capitalize">{product.name} <br /> [Open Source] - <span className="font-onetext text-pro">Everything For You!</span></h1>
                      <h2 className="text-xl text-success-500 font-bold my-2 capitalize">Category : {product ?.category ?.name}</h2>
                      <h3 className="text-xl text-success-500 font-bold my-2 capitalize">Price : ${product.price}</h3>
      
                      <div className="flex gap-2">
                          <div className="px-4 py-1 bg-green-500 rounded-md text-center flex items-center ">ESX</div>
                          <div className="px-4 py-1 bg-blue-500 rounded-md text-center flex items-center ">QBCore</div>
                      </div>
      
                      <div className="flex gap-4 mt-4">
                        <div className='text-white px-6 py-4 btn flex gap-2 items-center font-bold text-xl'> 
                          <svg width={39} height={32} viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4443 1.0741H28.1666V20.4074H10.4443V1.0741Z" fill="url(#paint0_linear_1_1547)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.0279 0C8.76939 0 9.37049 0.68788 9.37049 1.53642V27.4636C9.37049 28.3121 8.76939 29 8.0279 29C7.2864 29 6.6853 28.3121 6.6853 27.4636V1.53642C6.6853 0.68788 7.2864 0 8.0279 0Z" fill="#FF68C3" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.3055 0C20.047 0 20.6481 0.68788 20.6481 1.53642V27.4636C20.6481 28.3121 20.047 29 19.3055 29C18.564 29 17.9629 28.3121 17.9629 27.4636V1.53642C17.9629 0.68788 18.564 0 19.3055 0Z" fill="#FF68C3" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M30.5833 0C31.3248 0 31.9259 0.662403 31.9259 1.47952V26.4464C31.9259 27.2635 31.3248 27.9259 30.5833 27.9259C29.8418 27.9259 29.2407 27.2635 29.2407 26.4464V1.47952C29.2407 0.662403 29.8418 0 30.5833 0Z" fill="#FF68C3" />
                            <g filter="url(#filter0_d_1_1547)">
                              <path d="M12.0556 19.0648C12.0556 21.2892 10.2523 23.0925 8.02778 23.0925C5.8033 23.0925 4 21.2892 4 19.0648C4 16.8403 5.8033 15.037 8.02778 15.037C10.2523 15.037 12.0556 16.8403 12.0556 19.0648Z" fill="#F18AC8" />
                            </g>
                            <g filter="url(#filter1_d_1_1547)">
                              <path d="M23.3334 13.1574C23.3334 15.3819 21.5301 17.1852 19.3056 17.1852C17.0811 17.1852 15.2778 15.3819 15.2778 13.1574C15.2778 10.9329 17.0811 9.12964 19.3056 9.12964C21.5301 9.12964 23.3334 10.9329 23.3334 13.1574Z" fill="#F18AC8" />
                            </g>
                            <g filter="url(#filter2_d_1_1547)">
                              <path d="M34.6112 15.8426C34.6112 18.0671 32.8079 19.8704 30.5834 19.8704C28.359 19.8704 26.5557 18.0671 26.5557 15.8426C26.5557 13.6181 28.359 11.8148 30.5834 11.8148C32.8079 11.8148 34.6112 13.6181 34.6112 15.8426Z" fill="#F18AC8" />
                            </g>
                            <path d="M10.4444 19.0649C10.4444 20.3995 9.36244 21.4815 8.02775 21.4815C6.69306 21.4815 5.61108 20.3995 5.61108 19.0649C5.61108 17.7302 6.69306 16.6482 8.02775 16.6482C9.36244 16.6482 10.4444 17.7302 10.4444 19.0649Z" fill="url(#paint1_linear_1_1547)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.02775 21.1363C9.17177 21.1363 10.0992 20.2089 10.0992 19.0649C10.0992 17.9208 9.17177 16.9934 8.02775 16.9934C6.88373 16.9934 5.95632 17.9208 5.95632 19.0649C5.95632 20.2089 6.88373 21.1363 8.02775 21.1363ZM8.02775 21.4815C9.36244 21.4815 10.4444 20.3995 10.4444 19.0649C10.4444 17.7302 9.36244 16.6482 8.02775 16.6482C6.69306 16.6482 5.61108 17.7302 5.61108 19.0649C5.61108 20.3995 6.69306 21.4815 8.02775 21.4815Z" fill="#FFA7DC" />
                            <path d="M21.7222 13.1574C21.7222 14.4921 20.6403 15.5741 19.3056 15.5741C17.9709 15.5741 16.8889 14.4921 16.8889 13.1574C16.8889 11.8227 17.9709 10.7407 19.3056 10.7407C20.6403 10.7407 21.7222 11.8227 21.7222 13.1574Z" fill="url(#paint2_linear_1_1547)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.3056 15.2288C20.4496 15.2288 21.377 14.3014 21.377 13.1574C21.377 12.0134 20.4496 11.086 19.3056 11.086C18.1616 11.086 17.2342 12.0134 17.2342 13.1574C17.2342 14.3014 18.1616 15.2288 19.3056 15.2288ZM19.3056 15.5741C20.6403 15.5741 21.7222 14.4921 21.7222 13.1574C21.7222 11.8227 20.6403 10.7407 19.3056 10.7407C17.9709 10.7407 16.8889 11.8227 16.8889 13.1574C16.8889 14.4921 17.9709 15.5741 19.3056 15.5741Z" fill="#FFA7DC" />
                            <path d="M33.0001 15.8426C33.0001 17.1773 31.9181 18.2592 30.5834 18.2592C29.2487 18.2592 28.1667 17.1773 28.1667 15.8426C28.1667 14.5079 29.2487 13.4259 30.5834 13.4259C31.9181 13.4259 33.0001 14.5079 33.0001 15.8426Z" fill="url(#paint3_linear_1_1547)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M30.5834 17.914C31.7274 17.914 32.6548 16.9866 32.6548 15.8426C32.6548 14.6986 31.7274 13.7711 30.5834 13.7711C29.4394 13.7711 28.512 14.6986 28.512 15.8426C28.512 16.9866 29.4394 17.914 30.5834 17.914ZM30.5834 18.2592C31.9181 18.2592 33.0001 17.1773 33.0001 15.8426C33.0001 14.5079 31.9181 13.4259 30.5834 13.4259C29.2487 13.4259 28.1667 14.5079 28.1667 15.8426C28.1667 17.1773 29.2487 18.2592 30.5834 18.2592Z" fill="#FFA7DC" />
                            <defs>
                              <filter id="filter0_d_1_1547" x={0} y="15.037" width="16.0557" height="16.0555" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={2} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.15 0 0 0 0 0.00812501 0 0 0 0 0.0936258 0 0 0 0.39 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1547" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1547" result="shape" />
                              </filter>
                              <filter id="filter1_d_1_1547" x="11.2778" y="9.12964" width="16.0557" height="16.0555" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={2} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.15 0 0 0 0 0.00812501 0 0 0 0 0.0936258 0 0 0 0.39 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1547" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1547" result="shape" />
                              </filter>
                              <filter id="filter2_d_1_1547" x="22.5557" y="11.8148" width="16.0557" height="16.0555" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={2} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.15 0 0 0 0 0.00812501 0 0 0 0 0.0936258 0 0 0 0.39 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1547" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1547" result="shape" />
                              </filter>
                              <linearGradient id="paint0_linear_1_1547" x1="19.494" y1="-6.76867" x2="19.3175" y2="20.4075" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F261B8" stopOpacity="0.38" />
                                <stop offset={1} stopColor="#212121" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="paint1_linear_1_1547" x1="8.02775" y1="16.6482" x2="8.02775" y2="21.9994" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#E2379E" />
                                <stop offset={1} stopColor="#D70382" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="paint2_linear_1_1547" x1="19.3056" y1="10.7407" x2="19.3056" y2="16.0919" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#E2379E" />
                                <stop offset={1} stopColor="#D70382" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="paint3_linear_1_1547" x1="30.5834" y1="13.4259" x2="30.5834" y2="18.7771" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#E2379E" />
                                <stop offset={1} stopColor="#D70382" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                          12h/day Support
                        </div>
      
                        <button onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem("cart",JSON.stringify([...cart, product]));
                          toast.success("Item Added to cart");
                          }}  className='text-white px-6 py-4 btn flex gap-2 items-center font-bold text-xl'>  
                          Add to basket
                          <svg width={18} height={19} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1={9} y1="0.5" x2={9} y2="18.5" stroke="white" strokeWidth={2} />
                            <line x1={18} y1={9} y2={9} stroke="white" strokeWidth={2} />
                          </svg>
                        </button>
                      </div>
      
                      <div className="my-4">
                          <h4 className="text-3xl text-blue-500">PREVIEW</h4>
                          <Link to={"#"} className="text-xl">Youtube Preview</Link>
                          
                          <h4 className="text-3xl text-blue-500">Documentation</h4>
                          <Link to={ '/documentation'} className="text-xl">Busker Documentation</Link>
                      </div>
      
                  </div>
             </div>
             <div className="flex flex-wrap gap-4 items-center my-4 ">
                  <img className="w-full md:w-[24%]"  src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt="" />
                  <img className="w-full md:w-[24%]"  src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt="" />
                  <img className="w-full md:w-[24%]"  src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt="" />
                  <img className="w-full md:w-[24%]"  src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`} alt="" />
             </div>
      
             <div className="my-4">
                 <h2 className="text-2xl font-bold">Description :</h2>
                 <p className="align-middle text-justify">{product.description}</p>
             </div>
          </div>
            
            <hr />
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                <h6 className="text-3xl font-bold text-center mt-6 mb-6 text-white">Related or Similar Products</h6>
                { relatedProducts && relatedProducts.length < 1 && <p className="text-center text-red-500">No related or similar products found</p> }
                <div className='flex gap-4 flex-wrap-reverse mb-6'>
                  {
                    relatedProducts?.map((items, key) => (
                      <article key={key} className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl p-2">
                        <ModalImage className="object-cover w-full h-96 md:h-auto md:w-48" small={`${baseUrl}/api/v1/product/product-photo/${items._id}`} large={`${baseUrl}/api/v1/product/product-photo/${items._id}`} alt/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white capitalize">{items.name}</h5>
                          <h6>Price : ${items.price}</h6>
                          <p className="mb-3 font-normal text-white">{items.description.substring(0, 100)}...</p>
                          <div className="flex gap-4">
                              <button onClick={() => navigate(`/product/${items.slug}`)} className="text-white bg-sky-500 px-4 py-2 btn w-[100%]">Check Product</button>
                              <button onClick={() => {
                                 setCart([...cart, items]);
                                 localStorage.setItem("cart",JSON.stringify([...cart, items]));
                                 toast.success("Item Added to cart");
                                 }}  className="text-white bg-sky-500 px-4 py-2 btn w-[100%] flex gap-2 items-center"> Add to basket
                                 <svg width={18} height={19} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <line x1={9} y1="0.5" x2={9} y2="18.5" stroke="white" strokeWidth={2} />
                                   <line x1={18} y1={9} y2={9} stroke="white" strokeWidth={2} />
                                 </svg>
                              </button>
                          </div>  
                        </div>
                      </article>
                    ))
                  }
                </div>
                <DiscordCom/>
            </div>
            </>
            ):(<>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
              <div className="flex justify-center items-center text-white">
                <div>
                  <h6 className="text-3xl font-bold text-center mt-6 text-red-500">Product Not Found</h6>
                  <Lottie className="w-96" animationData={groovyWalkAnimation} loop={true} />
                </div>
              </div>
            </div>
            </>)
          }

          </>
          }
        </Layout>
    );
};

export default ProductDetails;