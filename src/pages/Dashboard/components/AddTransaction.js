import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaRegQuestionCircle, FaTimes } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";

import { getUser, addTransaction } from "../../../services";

export const AddTransaction = ({fetchUserTransactions}) => {
  const [dateToolTip, setDateToolTip] = useState(false);
  const [amountToolTip, setAmountToolTip] = useState(false);
  const [titleToolTip, setTitleToolTip] = useState(false);
  const [keepEntering, setKeepEntering] = useState(false);
  const [maxDate, setMaxDate] = useState(new Date().toISOString().split("T")[0]);
  const dateInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const amountInputRef = useRef(null);

  useEffect(() => {
    dateInputRef.current.focus();
  }, []); //eslint-disable-line

  async function handleAddTransaction(e) {
    e.preventDefault();

    const isValid = validation();

    if(isValid) {
      try {
        const userData = await getUser();
        const dataToSave = {
          title: titleInputRef.current.value,
          amount: amountInputRef.current.value,
          user: {
            name: userData.name,
            email: userData.email,
            id: userData.id
          },
          creation_date: new Date(dateInputRef.current.value).toLocaleDateString(),
          creation_time: new Date().toLocaleTimeString()
        }
        
        const data = await addTransaction(dataToSave);
        if(data) {
          fetchUserTransactions();
          if(keepEntering) {
            titleInputRef.current.value="";
            amountInputRef.current.value="";
          } else {
            e.target.reset();
            dateInputRef.current.focus();
          }
          toast.success("Transaction added!");
        } else {
          toast.error(data);
        }
      } catch(error) {
        toast.error(error.message);
      }
    }
  }

  const handleCheckboxChange = () => {
    setKeepEntering(current => !current);
  }

  const validation = () => {
    let isValid = true;
    const formElements = Array.from(document['addForm'].elements);
    const fields = formElements.filter((item, idx) => idx !== formElements.length - 1);
   
    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      if(!element.value || element.value === "") {
        isValid = false;
        toast.error(element.name.toUpperCase() + " can't be empty!");
        break;
       }
    }
    return isValid;
  }

  return (
    <div className="flex-1 md:order-first order-last bg-gray-50 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-500 rounded-lg">
      <form onSubmit={handleAddTransaction} name="addForm" className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="date" className="block font-semibold">Date&nbsp;
          {dateToolTip && 
            <div className="bg-gray-900 text-gray-100 inline-flex flex-col absolute -top-14 left-0 w-full min-h-12 p-2 text-xs rounded-lg shadow-xl z-50">
              <div className="flex items-baseline justify-between gap-2">
                <p>Pick a date for transaction.</p>
                <button onClick={() => setDateToolTip(false)} type="button" className="p-1 text-red-500"><FaTimes size={12} className="-mt-5"/></button>
              </div>
              <BiCaretDown className="absolute -bottom-3 left-8 text-gray-900"/>
            </div>
          }
          <FaRegQuestionCircle onClick={() => setDateToolTip(!dateToolTip)} size="14px" className="cursor-pointer" />
          </label>
          <input ref={dateInputRef} max={maxDate} type="date" name="date" id="date" autoComplete="off" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg "/>
        </div>
        <div className="flex items-center gap-2 relative">
          <input onChange={handleCheckboxChange} type="checkbox" name="keepEnter" id="keepEnter" value={keepEntering} />
          <label htmlFor="keepEnter">Keep entering for the date.</label>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="title" className="block font-semibold">Title&nbsp;
            {titleToolTip && 
              <div className="bg-gray-900 text-gray-100 inline-flex flex-col absolute -top-14 left-0 w-full min-h-12 p-2 text-xs rounded-lg shadow-xl z-50">
                <div className="flex items-baseline justify-between gap-2">
                  <p>Title of your transaction. E.g. Salary, Gas, Electricity</p>
                  <button onClick={() => setTitleToolTip(false)} type="button" className="p-1 text-red-500"><FaTimes size={12} className="-mt-5"/></button>
                </div>
                <BiCaretDown className="absolute -bottom-3 left-8 text-gray-900"/>
              </div>
            }
            <FaRegQuestionCircle onClick={() => setTitleToolTip(!titleToolTip)} size="14px" className="cursor-pointer" />
          </label>
          <input ref={titleInputRef} type="text" name="title" id="title" autoComplete="off" maxLength="30" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="amount" className="block font-semibold">Amount&nbsp;
            {amountToolTip && 
              <div className="bg-gray-900 text-gray-100 inline-flex flex-col absolute -top-14 left-0 w-full min-h-10 p-2 text-xs rounded-lg shadow-xl z-50">
                <div className="flex items-baseline justify-between gap-2">
                  <p>Negative number treated as expense. Positive number treated as income. E.g. 1 is income and -1 is expense.</p>
                  <button onClick={() => setAmountToolTip(false)} type="button" className="p-1 text-red-500"><FaTimes size={12} className="-mt-5"/></button>
                </div>
                <BiCaretDown className="absolute -bottom-3 left-14 text-gray-900"/>
              </div>
            }
            <FaRegQuestionCircle onClick={() => setAmountToolTip(!amountToolTip)}  size="14px" className="cursor-pointer" />
          </label>
          <input ref={amountInputRef} type="number" name="amount" id="amount" autoComplete="off" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold focus:ring-4 p-2 mt-5 rounded-lg">Add Transaction</button>
      </form>
    </div>
  )
}
