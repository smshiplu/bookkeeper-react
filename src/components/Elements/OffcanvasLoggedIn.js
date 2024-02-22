import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {BsSun, BsMoon, BsPersonCircle} from "react-icons/bs";
import {AiOutlineLogout, AiOutlineDashboard} from "react-icons/ai";
import { TbCalendarStats } from "react-icons/tb";
import { MdBarChart } from "react-icons/md";

import { logout } from "../../services/authService";
import { getUser } from "../../services/dataService";


export const OffcanvasLoggedIn = ({setOffcanvasToggle, darkMode, setDarkMode}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchUser();
  }, []); //eslint-disable-line

  const handleLogOut = () => {
    logout();
    setOffcanvasToggle(false);
  }

  return (
    <div className="flex flex-col mt-16 divide-y divide-gray-700 text-sm font-semibold">
      <span className="flex items-center gap-1 p-3 pointer-events-none"><BsPersonCircle/> {user.email}</span>
      <Link to="/" className="flex items-center gap-1 hover:bg-gray-800 p-3"><AiOutlineDashboard /> Dashboard</Link>
      <Link onClick="" to="/transaction-history" className="hover:bg-gray-800 p-3 flex items-center gap-1"><TbCalendarStats /> Transaction History</Link>
      <Link onClick="" to="/statement" className="hover:bg-gray-800 p-3 flex items-center gap-1"><MdBarChart /> Statement</Link>
      <Link onClick={handleLogOut} to="/login" className="hover:bg-gray-800 p-3 flex items-center gap-1"><AiOutlineLogout /> Logout</Link>
      {!darkMode && 
        <span onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-1 hover:bg-gray-600 cursor-pointer p-3"><BsMoon /> Dark mode <span className="text-rose-500">off</span></span>
      }
      {darkMode &&
        <span onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-1 hover:bg-gray-800 cursor-pointer p-3"><BsSun /> Dark mode <span className="text-green-500">on</span></span>
      }
      
    </div>
  )
}
