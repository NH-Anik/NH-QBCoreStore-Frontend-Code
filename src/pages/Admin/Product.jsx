import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import ModalImage from "react-modal-image";

const Product = () => {
    const [allProducts, setAllProducts] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    //get all products
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/product/get-product`);
        setAllProducts(data.products);
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllProducts();
    }, []);

    return (
        <Layout title={"Users Admin Dashboard"}>
        <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
            <div className='flex'>
                <div className='w-[20%]'>
                    <AdminMenu />
                </div>
                <div>
                    <section className=" mx-auto px-4 max-w-screen-xl md:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl text-white font-semibold">
                                All Product List
                            </h1>
                            <p className="mt-3 text-white">
                              All Product that are loved by the community. Updated every hour.
                            </p>
                        </div> 
                        <div className="flex flex-wrap gap-2 p-2 bg-navup">
                            {allProducts.map((item, key) => (
                                <article key={key} className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%] p-2">
                                    <Link to={`/dashboard/admin/product/${item.slug}`}>
                                        <div className="w-full bg-navup border border-sky-500 borderGlow">
                                            <div className="p-2">
                                                <ModalImage 
                                                    className="object-cover object-center w-full h-64 lg:h-80" 
                                                    small={`${baseUrl}/api/v1/product/product-photo/${item._id}`} 
                                                    large={`${baseUrl}/api/v1/product/product-photo/${item._id}`} 
                                                    alt={item.name} 
                                                />
                                                <div className="flex gap-2 mt-2 items-center justify-between">
                                                    <div className="">
                                                        <h6 className="font-bold capitalize">Name : {item.name.substring(0, 20)}</h6>
                                                    </div>
                                                   
                                                </div> 
                                                <div className="px-4 py-1 bg-teal-500 rounded-md text-center flex items-center border-dashed border-2 border-sky-500">
                                                    Price: ${item.price}
                                                </div>
                                                <div className="my-2">
                                                    <p className="text-white">Product Download Link:</p>
                                                    <p className="text-white">{item.link.substring(0, 20)}...</p>
                                                </div>

                                                <div className="ml-3">
                                                    <span className="block text-white">{item.authorName}</span>
                                                    <span className="block text-white text-sm">{item.date}</span>
                                                </div>

                                                <div className="my-2">
                                                    <p className="text-white">Product Description:</p>
                                                    <p className="text-white">{item.description.substring(0, 20)}...</p>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
           
        </div>
    </Layout>
    );
};

export default Product;