import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiSolidUserAccount } from "react-icons/bi";

import { useDocTitle } from "../hooks";
import { register } from "../services";


export const Register = () => {
  useDocTitle("Register");
  const navigate = useNavigate();

  async function handleRegistration(e) {
    e.preventDefault();
    try {
      const authDetail = {
        name: e.target.name.value.trim(),
        email: e.target.email.value.trim(),
        password: e.target.password.value.trim()
      }

      const data = await register(authDetail);
      if(data.accessToken) {
        e.target.reset();
        navigate("/login");
        toast.success("Registration successful! Login now");
      } else {
        toast.error(data);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <main className="text-gray-800 dark:text-gray-100">
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-center underline underline-offset-8">Register</h2>
      </section>
      <section>
        <form onSubmit={handleRegistration} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold">Your Name:</label>
            <input type="text" name="name" id="name" placeholder="Nasir Uddin" autoComplete="off" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">Your Email:</label>
            <input type="email" name="email" id="email" placeholder="nasir@example.com" autoComplete="off" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold">Your Password:</label>
            <input type="password" name="password" id="password" autoComplete="off" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-500" />
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full md:w-32 bg-blue-600 hover:bg-blue-500 text-white p-2 mb-5 focus:ring-4 rounded-lg">Register <BiSolidUserAccount/></button>

            <p>Or already have an account? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login Now</Link></p>
          </div>
        </form>
      </section>
    </main>
  )
}
