import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000); // Update every second
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <footer className=" m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between relative">
            <Link to={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/qbcore_Store-icon.png" className="h-10" alt="QBCore Store" />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to={"/terms"} className="hover:underline me-4 md:me-6">Terms</Link>
              </li>
              <li>
                <Link to={"/privacypolicy"} className="hover:underline me-4 md:me-6">Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/impressum"} className="hover:underline me-4 md:me-6">Impressum</Link>
              </li>
            </ul>
            <Link to={"https://www.dmca.com/r/4e7g7rz"}  title="DMCA.com Protection Status" className="dmca-badge absolute top-[74px]"> <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120h.png?ID=6e82b3c2-18c9-45ba-80a1-28479b8108c9"  alt="DMCA.com Protection Status" /></Link> 
          </div>
          <hr className="mt-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <Link to={"/"} className="hover:underline">QBCore Store™</Link>. All Rights Reserved.</span>
          <span className='hidden'>Made by NH-Anik niamulhasan515@gmail.com +8801877506611 BD</span>
        </div>
      </footer>
      
    </div>
  );
};

export default Footer;