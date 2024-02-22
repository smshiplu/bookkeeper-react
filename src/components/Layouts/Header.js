import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {BsThreeDotsVertical} from "react-icons/bs";
import {FaTimes} from "react-icons/fa";

import {useCheckToken} from "../../hooks/useCheckToken";

import { OffcanvasLoggedIn } from "../Elements/OffcanvasLoggedIn";
import { OffcanvasLoggedOut } from "../Elements/OffcanvasLoggedOut";

import Logo from "../../assets/logo.svg";


export const Header = () => {

  const token = useCheckToken();

  const [isTokenExpired, setIsTokenExpired] = useState(token);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("bookkeeper-darkMode")) || false);
  const [offcanvasToggle, setOffcanvasToggle] = useState(false);

  useEffect(() => {
   token ? setIsTokenExpired(true) : setIsTokenExpired(false);
  }, [token])
  
  useEffect(() => {
    if(darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-white");
      document.body.classList.add("bg-gray-800");
      localStorage.setItem("bookkeeper-darkMode", JSON.stringify(darkMode));
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-800");
      document.body.classList.add("bg-white");
      localStorage.removeItem("bookkeeper-darkMode");
    }
  }, [darkMode]);

  return (
    <header className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 shadow">
      <section className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center ">
          <img src={Logo} alt="Daily Bookkeeper" width={"40px"} className="-ml-2"/>
          <h1 className="text-2xl font-bold">Bookkeeper</h1>
        </Link>
        <button onClick={() => setOffcanvasToggle(!offcanvasToggle)} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center rounded-lg focus:outline-none">
          <BsThreeDotsVertical/>
        </button>
      </section>
      {offcanvasToggle &&
        <section className="w-60 h-full bg-slate-900 text-gray-100 fixed top-0 left-0 border border-r border-gray-700 z-10">
          <button onClick={() => setOffcanvasToggle(false)} className="hover:bg-gray-700 p-3 flex items-center justify-center absolute top-0 right-0"><FaTimes /></button>

          {isTokenExpired ? <OffcanvasLoggedOut setOffcanvasToggle={setOffcanvasToggle} darkMode={darkMode} setDarkMode={setDarkMode} /> : <OffcanvasLoggedIn setOffcanvasToggle={setOffcanvasToggle} darkMode={darkMode} setDarkMode={setDarkMode} />}
        </section>
      }
    </header>
  )
}
