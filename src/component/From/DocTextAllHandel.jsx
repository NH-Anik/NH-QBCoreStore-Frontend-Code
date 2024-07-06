import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DocTextAllHandel = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    
    //get all doc-category from backend
    const [allCategories, setAllCategories] = useState([]);
      const getDocCategory = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/documentation/get-docCategory`);
            if (res.data?.success) {
              setAllCategories(res.data?.DocCategory);
            }
        } catch (error) {
            toast.error("Something went wrong in getting category");
        }
    }
    useEffect(() => {
        getDocCategory();
    }, []);

    // //create product function
    const [category, setCategory] = useState("");
      const handelcategorize = (e) => {
        setCategory(e.target.value);
    }
    
    //get all doc-text from backend
    const [docTest, setDocTest] = useState([]);
    const getDocTextCategory = async () => {
        try {
            const res= await axios.get(`${baseUrl}/api/v1/documentation/get-doctext`);
            if (res.data?.success) {
                setDocTest(res.data?.products);
            }
        } catch (error) {
            toast.error("Something went wrong in getting category");
        }
    }

    useEffect(() => {
        getDocTextCategory();
    }, []);

    // update doc-text
    const [visible,setVisible]=useState(false);
    const [updateName,setUpdateName]=useState("");
    const [selected,setSelected]=useState("");

    const handelUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/documentation/update-doctext/${selected._id}`,
                {
                    name: updateName,
                    category:category
                }
            );
            if (data?.success) {
                toast.success(`${updateName} is updated`);
                setSelected(null);
                setUpdateName("");
                setVisible(false);
                getDocTextCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong in updating Doc-Text");
        }
    }

    // delete doc-text
    const [visibleDelete,setVisibleDelete]=useState(false);
    const [selectedDeleteId,setSelectedDeleteId]=useState("");
    const [deleteName,setDeleteName]=useState("");
    const handelDelete = async () => {
        try {
            const { data } = await axios.delete(`${baseUrl}/api/v1/documentation/delete-doctext/${selectedDeleteId._id}`);
            if (data?.success) {
                toast.success(`${deleteName} is Delete`);
                setVisibleDelete(false);
                getDocTextCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong in Delete category");
        }
    }

    return (
        <div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 v font-medium border-b text-black">
                        <tr>
                            <th className="py-3 px-6">Category-Name</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white divide-y">
                        {
                            docTest?.map((item) => (
                                <>
                                    <tr  key={item._id}>
                                        <td key={item._id}  className="px-6 py-4 ">{item?.category?.name}</td>
                                        <td className="px-6 py-4 ">{item?.name.substring(0, 20)}</td>
                                        <td className="px-6 ">
                                            <button onClick={()=>{setVisible(true); setCategory(item?.category?._id), setUpdateName(item.name), setSelected(item)}} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Edit
                                            </button>
                                            <button onClick={()=>{setVisibleDelete(true); setDeleteName(item.name), setSelectedDeleteId(item)}}  className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
            <div>
                {
                    visible && (
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                            <div className="absolute bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 ">
                                <h6 className="text-lg text-white">Update Doc-Text - {updateName.substring(0, 20)}</h6>
                                <select onChange={handelcategorize} value={category} className="mb-12 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length} placeholder="Select a category">
                                    <option value="">Select a Doc-Category</option>
                                    {
                                        allCategories?.map((c) => (
                                          <option key={c._id} value={c._id}>{c.name}</option>
                                        ))
                                    }
                                </select>
                                <div>
                                    <ReactQuill theme="snow" value={updateName} onChange={setUpdateName} />
                                </div> 
                                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                  <button onClick={handelUpdate} className="px-6 py-2 text-blue-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Update Text</button>
                                  <button onClick={()=>setVisible(false)} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Close</button>
                                </div>
                            </div>
                        </div>
                    )
                }

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
                                    <p className="text-center text-2xl text-red-600">Want to Delete - {deleteName.substring(0, 20)}</p>
                                </div>
                              <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                                <button onClick={handelDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                              </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DocTextAllHandel;