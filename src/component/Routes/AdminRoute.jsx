import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../context/auth";

export default function AdminRoute() {
   const [ok,setOk]=useState(false)
   const [auth,setAuth]=useAuth()
   const baseUrl = import.meta.env.VITE_BASE_URL;
    useEffect( ()=>{
        const authCheck=async()=>{
            const res=await axios.get(`${baseUrl}/api/v1/auth/admin-auth`);
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token])
   return ok ? <Outlet/>: <Spinner path=""/>
}