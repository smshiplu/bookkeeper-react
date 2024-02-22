import { toast } from "react-toastify";
import { BiEdit, BiTrash} from "react-icons/bi";
import { BsBoxArrowInUpRight} from "react-icons/bs";

import { deleteTransaction } from "../../../services/dataService";


export const ExpenseCard = ({expense, fetchUserTransactions}) => {

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
    <li className="bg-rose-100 text-gray-800 flex flex-col gap-1 p-2 rounded-lg">
      <p className="flex items-center justify-between gap-3">
        <span className="inline-block line-clamp-1 whitespace-nowrap text-ellipsis">{expense.title}</span>
        <span>${expense.amount.split("-").filter(item => item !== "")[0]}</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-xs text-gray-500 italic">{expense.creation_date} {expense.creation_time}</span>
        <span className="flex items-center gap-2">
          <BsBoxArrowInUpRight className="text-violet-600 hover:text-violet-500 cursor-pointer" title="Open"/>
          <BiEdit className="text-blue-600 hover:text-blue-500 cursor-pointer" title="Edit"/>
          <BiTrash onClick={() => handleDelete(expense.id)} className="text-rose-600 hover:text-rose-500 cursor-pointer" title="Delete"/>
        </span>
      </p>
    </li>
  )
}
