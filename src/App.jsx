
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import PageError from './pages/PageError';
import Terms from './pages/info/Terms';
import PrivacyPolicy from './pages/info/PrivacyPolicy';
import Impressum from './pages/info/Impressum';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
import PrivateRoute from './component/Routes/Private';
import AdminRoute from './component/Routes/AdminRoute';
import UserDashboard from './pages/User/UserDashboard';
import Profile from './pages/User/Profile';
import ProductOrders from './pages/User/ProductOrders';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import AdminOrders from './pages/Admin/AdminOrders';
import CreateAdmin from './pages/Admin/CreateAdmin';
import AdminProfile from './pages/Admin/AdminProfile';
import Scripts from './pages/Scripts';
import Discord from './pages/Discord';
import Documentation from './pages/Documentation';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Search from './pages/Search';
// import Test from './pages/hero/Test';
import VerifyEmail from './pages/VerifyEmail';
import FooterInfo from './pages/Admin/FooterInfo';
import AdminDocumentation from './pages/Admin/AdminDocumentation';
import { useAuth } from './context/auth';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PaymentCancel from './pages/PaymentCancel';

function App() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage/>} /> 
        <Route path="/registration" element={auth?.user?<Navigate to="/"/>:<Registration/>}/>
        <Route path="/login" element={auth?.user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/forgot" element={auth?.user?<Navigate to="/"/>:<Forgot/>}/>
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<UserDashboard/>}/>
           <Route path="user/profile" element={<Profile/>}/>
           <Route path="user/orders" element={<ProductOrders/>}/>

           <Route path="user/Payment-success/:tranID" element={<PaymentSuccess/>}/>
           <Route path="user/Payment-failed" element={<PaymentFailed/>}/>
           <Route path="user/Payment-cancel" element={<PaymentCancel/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
           <Route path="admin" element={<AdminDashboard/>}/>
           <Route path="admin/create-category" element={<CreateCategory/>}/>
           <Route path="admin/create-Product" element={<CreateProduct/>}/>
           <Route path="admin/product" element={<Product/>}/>
           <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
           <Route path="admin/users" element={<Users/>}/>
           <Route path="admin/orders" element={<AdminOrders />} />
           <Route path="admin/admin-documentation" element={<AdminDocumentation />} />
           <Route path="admin/create-admin" element={<CreateAdmin />} />
           <Route path="admin/admin-profile" element={<AdminProfile />} />
           <Route path="admin/create-footer" element={<FooterInfo />} />
        </Route>
        <Route path="/script" element={<Scripts />} />
        <Route path="/discord" element={<Discord />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<PageError/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
        <Route path="/impressum" element={<Impressum/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
      </Routes>
    </>
  )
}

export default App
