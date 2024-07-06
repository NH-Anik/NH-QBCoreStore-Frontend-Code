
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useAuth } from '../../context/auth';
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import toast from 'react-hot-toast';
import moment from 'moment';

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "deliver",
    "cancel",
  ]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // Get all orders data
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const [selectedStatus, setSelectedStatus] = useState({});
  useEffect(() => {
    getOrders();
    getStatusOptions();
  }, []);

  const getStatusOptions = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/auth/order-status/options`);
      setStatus(data.options);
    } catch (error) {
      console.error('Error fetching order status options:', error);
    }
  };

  const handleChange = async (orderId, value) => {
    console.log(orderId, value);
    try {
      const { data } = await axios.put(`${baseUrl}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      console.log('Order status updated successfully:', data);
      getOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // delete all orders
  const [visibleDelete,setVisibleDelete]=useState(false);
  const handelDelete = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/api/v1/auth/delete-allorders`);
      toast.success('All Orders have been deleted');
      setVisibleDelete(false);
      getOrders();
    } catch (error) {
      toast.error("Something went wrong while deleting orders");
    }
  }

  // Single order delete
  const [singleVisibleDelete,setSingleVisibleDelete]=useState(false);
  const [selectedDeleteId,setSelectedDeleteId]=useState("");
  const handelSingleDelete = async () => {
      try {
        const { data } = await axios.delete(`${baseUrl}/api/v1/auth/delete-singelorder/${selectedDeleteId._id}`);
        toast.success('Order is Delete');
        setSingleVisibleDelete(false);
        getOrders();
      } catch (error) {
        toast.error("Something went wrong in Delete orders");
      }
  }

    return (
        <Layout title={"Users Admin Dashboard"}>
        <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
            <div className='flex'>
                <div>
                    <AdminMenu />
                </div>
                 
                <div className='w-full'>
                    <div>
                         <h1 className='text-3xl text-center text-white'>Admin Orders List</h1>   
                    </div>
                    <div>
                        <div className="border shadow ">
                          <div className="overflow-x-auto">
                            <table className="table">
                              <thead>
                                <tr className="text-white flex gap-24">
                                  <th className='ml-2'>#</th>
                                  <th>Status</th>
                                  <th>Buyer</th>
                                  <th className='ml-14'>Date</th>
                                  <th>Payment</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order, index) => (
                                  <tr key={order._id} >
                                    <div className="flex gap-4">
                                      <td className="text-white ml-2">{index + 1}</td>
                                      <td>
                                        <select
                                          value={selectedStatus[order._id] || order.status}
                                          onChange={(e) => handleChange(order._id, e.target.value)}
                                        >
                                          {status.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                          ))}
                                        </select>
                                      </td>
                                      <td className="text-white mx-2">{order?.buyer?.email}</td>
                                      <td className="text-white mx-2">{moment(order?.createdAt).fromNow()}</td>
                                      <td className="text-white ml-14">{order?.payment}</td>
                                      <td className="text-white ml-28">{order?.products?.length}</td>
                                    </div>
                                      {order?.products?.map((p) => (
                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                          <div className="col-md-4">
                                            <img
                                              src={`${baseUrl}/api/v1/product/product-photo/${p._id}`}
                                              className="card-img-top"
                                              alt={p.name}
                                              width="100px"
                                              height={"100px"}
                                            />
                                          </div>
                                          <div className="flex flex-col">
                                            <p className='text-white'>{p.name}</p>
                                            <p className='text-white'>{p.description.substring(0, 30)}</p>
                                            <p className='text-white'>Price : {p.price}</p>
                                          </div>
                                        </div>
                                      ))}
                                    <button onClick={()=>{setSingleVisibleDelete(true); setSelectedDeleteId(order)}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4 ml-2'>Delete Order</button>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                    </div>
                    <button onClick={()=>{setVisibleDelete(true);}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4'>Clear All Order</button>
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
                                      <p className="text-center text-2xl text-red-600">Want to Delete Orders</p>
                      
                                  </div>
                                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                  <button onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                                  <button onClick={handelDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                                </div>
                              </div>
                          </div>
                      )
                    }

                    {
                      singleVisibleDelete && (
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
                                      <p className="text-center text-2xl text-red-600">Want to Delete Order</p>
                      
                                  </div>

                                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                  <button onClick={()=>setSingleVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                                  <button onClick={handelSingleDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                                </div>
                              </div>
                          </div>
                      )
                    }
                </div>
            </div>
        </div>
    </Layout>
    );
};

export default AdminOrders;