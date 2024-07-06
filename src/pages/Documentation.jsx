import { useEffect, useState } from 'react';
import Layout from '../component/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';

const Documentation = () => {
    const [allCategories, setAllCategories] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const getAllCategory = async () => {
        try {
          const res  = await axios.get(`${baseUrl}/api/v1/documentation/get-docCategory`);
          if (res.data?.success) {
           setAllCategories(res.data?.DocCategory);
          }
        } catch (error) {
          toast.error("Something went wrong in getting document-Category");
        }
    }
  
    useEffect(() => {
        getAllCategory();
    }, []);

    // all data show
    const [allData, setAllData] = useState([]);
    const  docText=async()=>{
        try {
            const res =await axios.get(`${baseUrl}/api/v1/documentation/get-doctext`);
            if (res.data?.success) {
                setAllData(res.data?.products);
            } else {
              throw new Error('No Data Found');
            } 
        } catch (error) {
            toast.error("Something went wrong in getting document-Category");
        }
    }
    useEffect(() => {
        docText();
    }, []);

    // documentation search 
    const [search, setSearch] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const handelSearch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/documentation/search/${categoryId}`);
        setSearch(res.data?.products);
      } catch (error) {
        toast("Not Found");
      }
    }

    useEffect(() => {
      if (categoryId) {
        handelSearch();
      }
    }, [categoryId]);

    return (
        <Layout title={"Documentation"}>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                <h1 className="text-center text-4xl font-black mb-8">Documentation</h1>
                <div className="flex flex-col md:flex-row">

                  <div className="w-full md:w-1/6 border-r">
                    <div className="flex flex-col">
                      <ul className=" w-full">
                        <li onClick={() => setCategoryId("")} className="text-pro  px-4 md:px-6 py-3 md:py-4 rounded-md mb-2 w-full border-b text-center hover:tracking-wide cursor-pointer">Documentation</li>
                        {allCategories?.map((item) => (
                          <li key={item._id} className="border-b text-center">
                            <button onClick={() => setCategoryId(item._id)} className="text-pro  px-4 md:px-6 py-3 md:py-4 rounded-md mb-2 w-full hover:tracking-wide">
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
          
                  <div className="w-full md:w-5/6 p-4">
                    {
                      categoryId.length===0? 
                      <>
                        {
                          allData?.map((item) => (
                              <div key={item._id} className="border-b p-4">
                                 <div dangerouslySetInnerHTML={{ __html: item.name }} />
                              </div>
                          ))
                        }
                      </>
                      :
                      <>
                       {
                        search?.map((item) => (
                          <div key={item._id} className="border-b p-4">
                            <div dangerouslySetInnerHTML={{ __html: item.name }} />
                          </div>
                        ))
                       }
                      </>
                    }
                  </div>
                </div>
            </div>
        </Layout>
    );
};

export default Documentation;