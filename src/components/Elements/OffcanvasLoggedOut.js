import { Link } from "react-router-dom";
import {BsPersonCircle, BsMoon, BsSun} from "react-icons/bs";
import {AiOutlineLogin, AiOutlineDashboard} from "react-icons/ai";

export const OffcanvasLoggedOut = ({setOffcanvasToggle, darkMode, setDarkMode}) => {
  return (
    <div className="flex flex-col mt-16 divide-y  divide-gray-700 text-sm font-semibold">
      <Link to="/" className="hover:bg-gray-800 p-3 flex items-center gap-1"><AiOutlineDashboard /> Dashboard</Link>
      <Link to="/register" className="hover:bg-gray-800 p-3 flex items-center gap-1"><BsPersonCircle /> Register</Link>
      <Link to="/login" className="hover:bg-gray-800 p-3 flex items-center gap-1"><AiOutlineLogin /> Login</Link>
      {!darkMode && 
        <span onClick={() => setDarkMode(!darkMode)} className="hover:bg-gray-800 cursor-pointer p-3 flex items-center gap-1"><BsMoon /> Dark mode <span className="text-rose-500">off</span></span>
      }
      {darkMode &&
        <span onClick={() => setDarkMode(!darkMode)} className="hover:bg-gray-800 cursor-pointer p-3 flex items-center gap-1"><BsSun /> Dark mode <span className="text-green-500">on</span></span>
      }
    </div>
  )
}
