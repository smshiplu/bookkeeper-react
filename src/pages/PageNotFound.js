import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center md:flex-row gap-5 text-gray-800 dark:text-white  text-center">
        <h1 className="text-6xl font-bold">
          Oops, 404 Error! <br />
          Page Not Found
        </h1>
        <Link to="/" className="bg-blue-600 hover:bg-blue-500 p-2 font-semibold rounded my-5">Go Back Home</Link>
      </section>
    </main>
  )
}
