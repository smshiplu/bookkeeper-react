import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";

import { useDocTitle } from "../hooks";
import { login } from "../services";

export const Login = () => {
  useDocTitle("Login");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const authDetail = {
        email: e.target.email.value,
        password: e.target.password.value
      }
      const data = await login(authDetail);

      if(data.accessToken) {
        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error(data)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return ( 
    <main className="text-gray-800 dark:text-gray-100">
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-center underline underline-offset-8">Login</h2>
      </section>
      <section>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">Your Email:</label>
            <input type="email" name="email" id="email" placeholder="nasir@example.com" autoComplete="off" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold">Your Password:</label>
            <input type="password" name="password" id="password" autoComplete="off" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-500" />
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full md:w-32 bg-blue-600 hover:bg-blue-500 text-white p-2 mb-5 focus:ring-4 rounded-lg">Login <BiLogIn/></button>

            <p>Or <button className="text-blue-600 hover:underline font-semibold">Login as Guest</button></p>

            <p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register Now</Link></p>
          </div>
        </form>
      </section>
    </main>
  )
}
