import { useState } from "react";
import { toast } from "react-toastify";
import { BiEdit, BiTrash} from "react-icons/bi";

import { EditModal } from "../../../components";

import { deleteTransaction } from "../../../services";
import { useTransaction } from "../../../contexts";

export const Actions = ({id}) => {

  const { deleteTransactionCtx } = useTransaction();

  const [editModalToggle, setEditModalToggle] = useState(false);
  
  const showEditModal = () => {
    setEditModalToggle(true);
  }

  const handleDelete = async () => {
    if(window.confirm(`Are you sure to delete the item ID: #${id}?`)) {
      try {
        const data = await deleteTransaction(id);
        deleteTransactionCtx(id);
        if(data) {
          // document.getElementById(id).remove();
          
          toast.success("Item deleted!");
        } else {
          toast.error(data);
        }
      } catch(error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
    <div className="flex items-center justify-evenly">
      <BiEdit onClick={showEditModal} className="text-blue-600 hover:text-blue-500 cursor-pointer" title="Edit" />
      <BiTrash onClick={handleDelete} className="text-rose-600 hover:text-blue-500 cursor-pointer" title="Delete" />
    </div>
    {editModalToggle && <EditModal id={id} setEditModalToggle={setEditModalToggle} />}
    </>

  )
}
