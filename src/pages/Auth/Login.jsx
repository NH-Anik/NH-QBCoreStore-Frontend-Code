import Lottie from "lottie-react";
import groovyWalkAnimation from "../../Lotianimation/animation_ll80h82t.json";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import Layout from "../../component/Layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // password show hide work start
  const [passwordType, setPasswordType] = useState("password");
  const handelShowHide = () => {
      if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }
  // password show hide work end

  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const handelemail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handelpassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }
 
  const [chackbox, setcheckbox] = useState(false);
  const [chackboxerror, setcheckboxerror] = useState("");

  const handelcheckbox = (e) => {
    setcheckbox(e.target.checked);
    setcheckboxerror("");
  }

  const navigate = useNavigate(false);

  const [loading, setLoading] = useState(false);

  const [auth,setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email==""){
      setEmailError("Email is required");
    }else if(password==""){
      setPasswordError("Password is required");
    }else if(chackbox==false){
      setcheckboxerror("Please check the checkbox");
    }else {
      setLoading(true);
      try {
        const res= await axios.post(
          `${baseUrl}/api/v1/auth/login`,
          {email,password}
        )
        if(res.data.success){
          toast.success(res.data.message);
          setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
          })
          
          localStorage.setItem("auth", JSON.stringify(res.data));
          setTimeout(() => {
             navigate(location.state || "/"); 
          }, 2000);

          setLoading(false);

        }else{
            toast.error(res.data.message);
            setLoading(false);
        }
        
      } catch (error) {
          toast.error("Registration Failed");
          setLoading(false);
      }
    }   
  }



  return (
    <Layout title={"Login - QBCore"}>
        <div className="container mx-auto mt-20">
            <div className="flex justify-around flex-wrap">
                <div>
                      <Lottie animationData={groovyWalkAnimation} loop={true} />
                </div>
                <div className="w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-white dark:text-white">Sign in to our platform</h5>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Your email</label>
                      <input onChange={handelemail} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email" />
                      <p className="text-red-700">{emailerror}</p>
                    </div>
                    <div className="relative">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Your password</label>
                      <input onChange={handelpassword} type={passwordType} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                      <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                      {
                          passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                      }
                    </button>  
                      <p className="text-red-700">{passworderror}</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input onChange={handelcheckbox} id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Remember me</label>
                      </div>
                      <Link to={'/forgot'} className="ml-auto text-sm text-red-700 hover:underline dark:text-red-500">Forgot Password?</Link>
                    </div>
                    <p className="text-red-700">{chackboxerror}</p>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {
                        loading ?<RiseLoader color="#36d7b7" /> : "Sign in"
                      } 
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered? <Link to={'/registration'} href="#" className="text-green-700 hover:underline dark:text-green-500">Create account</Link>
                    </div>
                  </form>

                </div>
            </div>
        </div>
  </Layout>
  );
};

export default Login;