import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from './../../component/Layout/AdminMenu';
import Layout from './../../component/Layout/Layout';
import Spinner from "../../component/Spinner";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("free");
    const [category, setCategory] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [link,setLink]=useState("");

    const [loading, setLoading] = useState(false);
    //get all category from backend
    const [allCategories, setAllCategories] = useState([]);
    const [confirmMassage, setConfirmMassage] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
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


    //create product function
    const handelcategorize = (e) => {
      setCategory(e.target.value);
    }

    const handleCreate = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("photo", photo);
        productData.append("category", category);
        productData.append("link", link);
        const { data } = axios.post(`${baseUrl}/api/v1/product/create-product`,productData);

        if (data?.success) {
          setLoading(false);
          toast.error(data?.message);
        } else {
          toast.success("Product Created Successfully");
          setLoading(false);
          setConfirmMassage(true);
        }
      } catch (error) {
        setLoading(false);
        toast.error("something went wrong" + error);
      }
    };

    const handelCancel = () => {
      setConfirmMassage(false);
      setName("");
      setDescription("");
      setPrice("");
      // setQuantity("");
      setPhoto("");
      setCategory("");
      setPhoto("");
    }

    const handelOk = () => {
      setConfirmMassage(false);
      navigate("/dashboard/admin/product");
    }
    
    return (
        <Layout title={"Create Product Admin Dashboard"}>
          {
            loading && (<Spinner/>)
          }
            <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
                <div className='flex'>
                    <div>
                        <AdminMenu />
                    </div>
                     
                    <div>
                        <h1 className="text-3xl mb-4 text-white">Create Product Admin Dashboard</h1>
                        <label className="text-white">Select Product Category</label>
                        <select onChange={handelcategorize} value={category} className="mb-12 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length} placeholder="Select a category">
                          <option value="">Select a category</option>
                          {
                            allCategories?.map((c) => (
                              <option key={c._id} value={c._id}>{c.name}</option>
                            ))
                          }
                        </select>
                      
                        <p className="text-white mb-2">Select Product Photo</p>
                        <div className="mb-12 ">
                            <label className=" text-white w-72 max-w-full mx-auto mt-12  bg-slate-500 p-3 border">
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept="image/* " onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                            </label>
                            <p className="text-green-500 mt-4">Select a photo less than 1Mb</p>
                        </div>

                        <div className="mb-12">
                          {
                            photo && (
                              <div className="w-72 max-w-full mx-auto">
                                <img src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} />
                              </div>
                            )
                          }
                        </div>
                        <p className="text-white">Enter Product Name</p>
                        <div className="">
                            <input type="text" className="w-72 max-w-full mx-auto  p-3 text-black border" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"/>
                        </div>
                        <p className="text-white mt-2">Enter Product Price</p>
                        <div className="">
                            <input type="number" className="w-72 max-w-full mx-auto p-3 text-black border" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price"/>
                        </div>
                        <p className="text-white mt-2">Enter Product Description</p>
                        <div className="">
                            <textarea shape="" coords="" href="" alt="" className="w-72 max-w-full mx-auto p-3 text-black border" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"/>
                        </div>

                        {/* <div className="">
                          <input type="text" className="w-72 max-w-full mx-auto mt-4 p-3 text-black border" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Product Quantity" />
                        </div> */}

                        <p className="text-white mt-2">Provide Product Download Link </p>
                        <div className="">
                            <input type="text" className="w-72 max-w-full mx-auto p-3 text-black border" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter Product Download Link"/>
                        </div>


                        {/* <select placeholder="Select Shipping " className="mt-4 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length}
                        onChange={(value) => setShipping(value)}>
                           <option value="0">No</option>
                           <option value="1">Yes</option>
                        </select> */}


                        <div className="">
                          <button onClick={handleCreate} className="w-72 max-w-full mx-auto mt-4 p-3 text-white bg-green-400 border" >Create Product</button>
                        </div>

                    </div>
                </div>
               
            </div>

            {
              confirmMassage && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                    <div className="rounded-md shadow-lg px-4 py-6">
                      <p className="text-white text-lg font-semibold capitalize">{name} - Product is created successfully</p>
                      <p>Thank you</p>
                      <div className="flex justify-end gap-4 mt-4">
                        <button onClick={handelOk} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Ok , Product Show</button>
                        <button onClick={handelCancel} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Cancel , Create new product</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            


        </Layout>
    );
};

export default CreateProduct;