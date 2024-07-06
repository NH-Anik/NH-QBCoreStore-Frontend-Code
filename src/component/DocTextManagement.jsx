import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from "./Loading";

const DocTextManagement = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  //get all doc-category from backend
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

  //create product function
  const handelcategorize = (e) => {
      setCategory(e.target.value);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      if(!category) {
        toast.error("Please select a category");
        setLoading(false); 
        return;
      }
      const res = await axios.post(`${baseUrl}/api/v1/documentation/create-doctext`, {name, category});
      if (res.data?.success) {
        toast.success("DocText Created Successfully");
        setName("");
        window.location.reload();
        setLoading(false); 
      } else {
        toast.error(res.data?.message);
        setLoading(false); 
      }
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
      setLoading(false); 
    }
  };
    
  return (
      <div>
          {
             loading && (<Loading/>)
          }
          <select onChange={handelcategorize} value={category} className="mb-12 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length} placeholder="Select a category">
              <option value="">Select a Doc-Category</option>
              {
                  allCategories?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))
              }
          </select>
          <div>
              <ReactQuill theme="snow" value={name} onChange={setName} />
          </div>
          <button onClick={handleCreate} className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-2"> 
              Create DocText?&nbsp;
          </button>
      </div>
  );
};

export default DocTextManagement;