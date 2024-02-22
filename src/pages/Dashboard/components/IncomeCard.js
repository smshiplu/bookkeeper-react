import { toast } from "react-toastify";
import { BsBoxArrowInUpRight} from "react-icons/bs";
import { BiEdit, BiTrash} from "react-icons/bi";

import { deleteTransaction } from "../../../services/dataService";

export const IncomeCard = ({income, fetchUserTransactions}) => {

  async function handleDelete(id) {
    if(window.confirm("Are you sure to delete?")) {
      try {
        const data = await deleteTransaction(id);
        fetchUserTransactions();
        data ? toast.success("Item deleted!") : toast.error(data);
      } catch(error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <li className="bg-green-100 text-gray-800 flex flex-col gap-1 p-2 rounded-lg">
      <p className="flex items-center justify-between gap-3">
        <span className="inline-block line-clamp-1 whitespace-nowrap text-ellipsis">{income.title}</span>
        <span>${income.amount}</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-xs text-gray-500 italic">{income.creation_date} {income.creation_time}</span>
        <span className="flex items-center gap-2">
          <BsBoxArrowInUpRight className="text-violet-600 hover:text-violet-500 cursor-pointer" title="Open"/>
          <BiEdit className="text-blue-600 hover:text-blue-500 cursor-pointer" title="Edit"/>
          <BiTrash onClick={() => handleDelete(income.id)} className="text-rose-600 hover:text-rose-500 cursor-pointer" title="Delete"/>
        </span>
      </p>
    </li>
  )
}
