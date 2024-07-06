import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';
import axios from "axios";
import AdminMenu from './../../component/Layout/AdminMenu';

const AdminProfile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address,setAddress]=useState("")

    const baseUrl = import.meta.env.VITE_BASE_URL;
    //get user data
    useEffect(() => {
      const { email, name, address } = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
          name,
          email,
          password,
          address
        });
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    return (
        <Layout title={"Profile User"}>
            <div className='max-w-screen-xl mx-auto px-4 text-white md:px-8'>
                <div className='flex'>
                    <div>
                        <AdminMenu />
                    </div>
                     
                    <div className="mt-10">
                       <h3 className='text-2xl font-bold'>Update to your Profile</h3>
                       <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    disabled
                                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                    Address
                                </label>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Update Profile
                            </button>
                        </form>  
                    </div>
                </div>
               
            </div>
        </Layout>
    );
};

export default AdminProfile;