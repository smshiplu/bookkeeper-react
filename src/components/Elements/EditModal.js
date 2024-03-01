import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

import { Loading } from "./Loading";

import { getTransaction, editTransaction } from "../../services";


export const EditModal = ({id, setEditModalToggle, fetchUserTransactions}) => {
  const [transaction, setTransaction] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  const editDateRef = useRef(null);
  const editTitleRef = useRef(null);
  const editAmountRef = useRef(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setShowLoading(true);
        const data = await getTransaction(id);
        setTransaction(data);
        
        if(data) {
          setShowLoading(false);
 
          const dateArr = data.creation_date.split("/");
          let formattedDate = `${dateArr[2]}-${dateArr[0].length === 1 ? `0${dateArr[0]}`:dateArr[0]}-${dateArr[1].length === 1 ? `0${dateArr[1]}` : `${dateArr[1]}`}`;

          editDateRef.current.value = formattedDate;
          editTitleRef.current.value = data.title;
          editAmountRef.current.value = data.amount;
        } else {
          setShowLoading(false);
          toast.error(data);
        }
      } catch(error) {
        setShowLoading(false);
        toast.error(error.message);
      }
    }
    fetchTransaction();
  }, []); //eslint-disable-line


  const handleEdit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if(validation) {
      try {
        const dataToEdit = {
          title: editTitleRef.current.value,
          amount: editAmountRef.current.value,
          user:transaction.user,
          creation_date: new Date(editDateRef.current.value).toLocaleDateString(),
          creation_time: new Date().toLocaleTimeString()
        }
        
        const data = await editTransaction(transaction.id, dataToEdit);
        if(data) {
          if(document.getElementById(id)) {
            const trEl = Array.from(document.getElementById(id).children);
            const trChildren = trEl.filter((item, idx) => idx !== trEl.length - 1);
            trChildren[0].firstChild.innerText = `#${id}`;
            trChildren[1].firstChild.innerText = `${dataToEdit.title}`;
            trChildren[2].firstChild.innerText = `${dataToEdit.creation_time}`;
            trChildren[3].firstChild.innerText = `${dataToEdit.amount}`;
          } else {
            fetchUserTransactions();
          }
          
          setEditModalToggle(false);
          toast.success("Transaction Updated Successfully!");
        } else {
          toast.error(data);
        }
      } catch(error) {
        toast.error(error.message);
      }
    }
  }

  const validate = () => {
    let isValid = true;
    const form = Array.from(document["editForm"].elements);
    const formFields = form.filter((item, idx) => idx !== form.length - 1);
    for (let index = 0; index < formFields.length; index++) {
      const element = formFields[index];
      if(!element.value) {
        isValid = false;
        toast.error(`${element.name.toUpperCase()} can't be empty!`);
        break;
      }
    }
    return isValid;
  }


  return (
    <>
    {showLoading && <Loading />}
    <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
      <div className="w-96 min-h-96 bg-gray-500 p-4 border rounded-xl">
        <div className="flex items-center justify-between gap-2 py-2 mb-4 border-b">
          <h4 className="flex-1 capitalize text-white font-bold">Edit transaction ID: #{id}</h4>
          <button onClick={() => setEditModalToggle(false)} type="button" className=" text-white"><FaTimes/></button>
        </div>
        
        <form onSubmit={handleEdit} name="editForm" className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="editDate" className="block text-white font-semibold">Date&nbsp;</label>
            <input ref={editDateRef} max={new Date().toISOString().split("T")[0]} type="date" name="date" id="editDate" autoComplete="off" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg"/>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="editTitle" className="block text-white font-semibold">Title&nbsp;</label>
            <input ref={editTitleRef} type="text" name="title" id="editTitle" autoComplete="off" maxLength="30" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="editAmount" className="block text-white font-semibold">Amount&nbsp;</label>
            <input ref={editAmountRef} type="number" name="amount" id="editAmount" autoComplete="off" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold focus:ring-4 p-2 mt-5 rounded-lg">Edit Transaction</button>
        </form>
      </div>
    </div>
    </>
  )
}
