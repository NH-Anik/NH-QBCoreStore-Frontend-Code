import Lottie from "lottie-react";
import groovyWalkAnimation from "../../Lotianimation/animation_ll82yjzt.json";
import { useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';

const Registration = () => {
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState(false);
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

  // Email hard validation in code start
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const handelemail = (e) => {
    const newEmail = e.target.value;
    setemail(newEmail);
    setValidEmail(validateEmail(newEmail));
    setemailerror("");
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Email hard validation in code end

  // password hard validation in code start
  const [validLength, setValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [password, setpassword] = useState("");
  const [passworderror, setpassworderror] = useState("");

  const handelpassword = (e) => {
    const newPassword = e.target.value;
    setpassword(newPassword);
    setValidLength(newPassword.length >= 8);
    setHasUppercase(/[A-Z]/.test(newPassword));
    setHasLowercase(/[a-z]/.test(newPassword));
    setHasNumber(/\d/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword));
     setpassworderror("");
  }
  // password hard validation in code end

  const [password2, setpassword2] = useState("");
  const [password2error, setpassword2error] = useState("");
  const handelrepeatpassword = (e) => {
     setpassword2(e.target.value);
     setpassword2error("");
  }

  //name hard validation in code start
  const [validName, setValidName] = useState(false);
  const validateName = (name) => {
    const regex = /^[A-Za-z -]+$/;
    return regex.test(name);
  };
  const [name,setname]=useState("");
  const [nameerror,setnameerror]=useState("");

  const handelname = (e) => {
    const newName = e.target.value;
    setname(newName);
    setValidName(validateName(newName));
    setnameerror("");
  }
  //name hard validation in code end


  
  const [Condition,setCondition]=useState(false);

  const handelAcceptCondition =async (e) => {
    e.preventDefault();
    try {
        const res= await axios.post(
            `${baseUrl}/api/v1/auth/register`,
            {name,email,password}
        )
        if(res.data.success){
            setCondition(false);
            toast.success(res.data.message);
            setTimeout(() => {
               navigate("/login"); 
            }, 2000);
        }else{
          setCondition(false);
          toast.error(res.data.message);
        }
        
    } catch (error) {
        setCondition(false);
        toast.error("Registration Failed");
    }
  }

  const handelsubmit =  (e) => {
    e.preventDefault();
    if(email==""){
    setemailerror("Email is required");
    }else if(!validEmail){
      setemailerror("Invalid Email");
    }else if(password==""){
        setpassworderror("Password is required");
    }else if(!validLength) {
        setpassworderror("Password must be at least 8 characters");
    }else if(!hasUppercase) {
        setpassworderror("Password must contain at least one uppercase letter");
    }else if(!hasLowercase) {
        setpassworderror("Password must contain at least one lowercase letter");
    }else if(!hasNumber) {
        setpassworderror("Password must contain at least one number");
    }else if(!hasSpecialChar) {
        setpassworderror("Password must contain at least one special character");
    }else if(password2==""){
        setpassword2error("Password is required");
    }else if(password2!=password){
        setpassword2error("Password not match");
    }else if(name==""){
        setnameerror("Name is required");
    }else if(!validName){
        setnameerror("Invalid Name");
    }else{
      setCondition(true); 
    }
  }

  const handelAcceptConditionCancel = () => {
    setCondition(false);
    setLoading(false);
  }

    return (
      <Layout title={"Registration"}>
        <div className="container mx-auto mt-20">
          <div className="flex justify-around flex-wrap">
          <div>
            <Lottie animationData={groovyWalkAnimation} loop={true} />
          </div>
          <div className="w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handelsubmit}>
            <h5 className="text-xl font-medium text-white dark:text-white mb-8">Sign-up to our platform</h5>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Email</label>
                <input onChange={handelemail} type="text" value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email" />
                <p className="text-red-700 text-sm mt-2">{emailerror}</p>
              </div>

              <div className="mt-2 relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">password</label>
                <input onChange={handelpassword} type={passwordType} value={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                    {
                        passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                    }
                  </button> 
                <p className="text-red-700 text-sm mt-2">{passworderror}</p>
              </div>

              <div className="mt-2 relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Confirm password</label>
                <input onChange={handelrepeatpassword} type={passwordType} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                    {
                        passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                    }
                  </button>
                <p className="text-red-700 text-sm mt-2">{password2error}</p>
              </div>

              <div className="mt-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Name</label>
                <input onChange={handelname} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your name" />
                <p className="text-red-700 text-sm mt-2">{nameerror}</p>
              </div>

              <button  type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {
                  loading? <RiseLoader color="#36d7b7" />:"Sign-up"
                }
              </button>
              
                

              {
                Condition && (
                  <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
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
                              <h6 className="text-lg text-center text-white mt-2">Terms and agreements?</h6>
                              <div className="mt-4 text-white text-justify">
                                  <p>
                                    Commodo eget a et dignissim dignissim morbi vitae, mi. Mi
                                    aliquam sit ultrices enim cursus. Leo sapien, pretium duis est
                                    eu volutpat interdum eu non. Odio eget nullam elit laoreet.
                                    Libero at felis nam at orci venenatis rutrum nunc. Etiam mattis
                                    ornare pellentesque iaculis enim.
                                  </p>
                                  <p className="mt-2">
                                    Felis eu non in aliquam egestas placerat. Eget maecenas ornare
                                    venenatis lacus nunc, sit arcu. Nam pharetra faucibus eget
                                    facilisis pulvinar eu sapien turpis at. Nec aliquam aliquam
                                    blandit eu ipsum.
                                  </p>
                              </div>
                          </div>
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={handelAcceptCondition} className="px-6 py-2 rounded-sm text-blue-600">Accept</button>
                          <button onClick={handelAcceptConditionCancel} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Decline</button>
                        </div>
                      </div>
                  </div>
                )
              }

            </form>
          </div>
          </div>
        </div>
        
      </Layout>
    );
};

export default Registration;