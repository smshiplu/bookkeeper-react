import { CgSpinner } from "react-icons/cg";

export const Loading = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-90 z-10 flex items-center justify-center ">
      <button type="button" className="bg-indigo-0 text-white" disabled>
        <CgSpinner className="animate-spin h-5 w-5 mr-3"/>
        Processing...
      </button>
    </div>
  )
}
