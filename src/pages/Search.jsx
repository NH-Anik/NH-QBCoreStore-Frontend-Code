import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/CartProvider";
import toast from "react-hot-toast";


const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <Layout title={"Search Result"}>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                 <div className="">
                    <h1 className="text-3xl font-bold text-center">Search Result</h1>
                    <h6 className="text-center">{values?.results.length < 1? "No Products Found": `Found ${values?.results.length}`}</h6>
                    {
                        values.results.map((items, key) => (
                            <div key={key} className="w-full flex flex-wrap p-2 bg-navup gap-2">
                                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%] bg-navup border border-sky-500 borderGlow">
                                    <div className="p-2">
                                        <img className="" src={`${baseUrl}/api/v1/product/product-photo/${items._id}`} alt="Script image" />
                                        <div className="flex gap-2 mt-2 items-center justify-between">
                                            <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dpdqebrhk/image/upload/v1707296847/tmfgmguurdmv2svyunjy.png" alt="pic" />
                                            <div className="">
                                                <h6 className="font-bold capitalize">{items.name.substring(0, 20)}</h6>
                                                <p>12h/day Support</p>
                                            </div>
                                            <div className="px-4 py-1 bg-teal-500 rounded-md text-center flex items-center border-dashed border-2 border-sky-500"> Free ERU</div>
                                        </div>
                                        <div className="flex my-2 justify-between items-center">
                                            <h6 className="font-bold">Product Information :</h6>
                                            <div className="flex gap-2">
                                                <div className="px-4 py-1 bg-green-500 rounded-md text-center flex items-center ">ESX</div>
                                                <div className="px-4 py-1 bg-blue-500 rounded-md text-center flex items-center ">QBCore</div>
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <p className="text-white">Product Description :</p>
                                            <p className="text-white">{items.description.substring(0, 100)}...</p>
                                        </div>
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
                                </div>
                            </div>
                        ))
                    } 
                 </div>
            </div>
            
        </Layout>
    );
};

export default Search;