import { useEffect, useState } from "react";
import UserMenu from "../../component/Layout/UserMenu";
import axios from "axios";
import Layout from './../../component/Layout/Layout';
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import moment from 'moment';

const ProductOrders = () => {
    const [orders, setOrders] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/auth/orders`);
        setOrders(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={"Product Orders User"}>
            <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
                <div className='flex'>
                    <div>
                        <UserMenu />
                    </div>
                     
                    <div>
                      <h6 className="text-2xl font-bold">Welcome to your ProductOrders </h6>
                      <hr />
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
                                      <td className="text-white ml-14">{order?.status}</td>
                                      <td className="text-white mx-16 capitalize">{order?.buyer?.name}</td>
                                      <td className="text-white mx-14">{moment(order?.createdAt).fromNow()}</td>
                                      <td className="text-white">{order?.payment}</td>
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
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductOrders;