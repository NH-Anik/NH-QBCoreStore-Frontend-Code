import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [link, setLink] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get all category from backend
    const [allCategories, setAllCategories] = useState([]);
    
    const getAllCategory = async () => {
       try {
         const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
         if (data?.success) {
          setAllCategories(data?.category);
         }
       } catch (error) {
         toast.error("Something went wrong in getting category");
       }
    }
 
    useEffect(() => {
        getAllCategory();
    }, []);

    //get single product
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/product/get-product/${params.slug}`
        );
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setPrice(data.product.price);
        setLink(data.product.link);
        // setQuantity(data.product.quantity);
        // setShipping(data.product.shipping);
        setCategory(data.product.category._id);
      } catch (error) {
        toast.error("Something went wrong in getting single product");
      }
    };

    useEffect(() => {
      getSingleProduct();
      //eslint-disable-next-line
    }, []);


    //create product function
    const handelCategorize = (e) => {
      setCategory(e.target.value);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("link", link);
          // productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          productData.append("category", category);
          const { data } = axios.put(`${baseUrl}/api/v1/product/update-product/${id}`,productData);

          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("Product Updated Successfully");
            navigate("/dashboard/admin/product");
          }
        } catch (error) {
          toast.error("something went wrong");
        }
    };

    //delete a product
    const handleDelete = async () => {
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;

        const { data } = await axios.delete(`${baseUrl}/api/v1/product/delete-product/${id}`);

        toast.success("Product Deleted Successfully");
        setTimeout(() => {
                    navigate("/dashboard/admin/product");
        }, 1000);
        
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    return (
        <Layout title={"Create Product Admin Dashboard"}>
            <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
                <div className='flex'>
                    <div>
                        <AdminMenu />
                    </div>
                     
                    <div>
                        <h1 className="text-3xl mb-4 text-white">Update Product Admin Dashboard</h1>
                         <p className="text-white">Select Product Category</p> 
                        <select onChange={handelCategorize} value={category} className="mb-12 w-full px-3 py-2 text-sm text-black bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length} placeholder="Select a category">
                          <option value="">Select a category</option>
                          {
                            allCategories?.map((c) => (
                              <option key={c._id} value={c._id}>{c.name}</option>
                            ))
                          }
                        </select>
                      
                        <p className="text-white mb-2">Update Product Photo</p> 
                        <div className="mb-12">
                            <label className="text-white w-72 max-w-full mx-auto mt-12  bg-slate-500 p-3 border">
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept="image/* " onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                            </label>
                        </div>
                        <div className="mb-12">
                          {
                            photo ? (
                              <div className="w-72 max-w-full mx-auto">
                                <img src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} />
                              </div>
                            ):(
                                <div className="w-72 max-w-full mx-auto">
                                <img src={`${baseUrl}/api/v1/product/product-photo/${id}`} alt="Product photo" height={"200px"} />
                              </div>

                            )
                          }
                        </div>
                        <p className="text-white">Update Product Name</p> 
                        <div className="">
                            <input type="text" className="w-72 max-w-full mx-auto p-3 text-black border" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"/>
                        </div>

                        <p className="text-white mt-2">Update Product Download Link</p> 
                        <div className="">
                            <input type="text" className="w-72 max-w-full mx-auto p-3 text-black border" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Product Name"/>
                        </div>

                        <p className="text-white mt-2">Update Product Price</p>
                        <div className="">
                            <input type="number" className="w-72 max-w-full mx-auto p-3 text-black border" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price"/>
                        </div>

                        <p className="text-white mt-2">Update Product Description</p>
                        <div className="">
                            <textarea shape="" coords="" href="" alt="" className="w-72 max-w-full mx-auto p-3 text-black border" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"/>
                        </div>

                        {/* <select onChange={(value) => setShipping(value)} value={shipping? "Yes" : "No"} placeholder="Select Shipping " className="mt-4 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length}>
                             <option value="0">No</option>
                             <option value="1">Yes</option>
                        </select> */}

                        <div className="">
                          <button onClick={handleUpdate} className="w-72 max-w-full mx-auto mt-4 p-3 text-white border bg-green-400" >Update Product</button>
                          <button onClick={handleDelete} className="w-72 max-w-full mx-auto mt-4 p-3 text-white border ml-2 bg-red-400" >Delete Product</button>
                        </div>

                    </div>
                </div>
               
            </div>
        </Layout>
    );
};

export default UpdateProduct;