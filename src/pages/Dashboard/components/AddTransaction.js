import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";

import { getUser, addTransaction } from "../../../services/dataService";

export const AddTransaction = ({fetchUserTransactions}) => {

  const [amountToolTip, setAmountToolTip] = useState(false);
  const [titleToolTip, setTitleToolTip] = useState(false);
  const titleInputRef = useRef();

  useEffect(() => {
    titleInputRef.current.focus();
  }, []); //eslint-disable-line

  async function handleAddTransaction(e) {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const amount = e.target.amount.value.trim();
    if(title.length && amount.length){
      try {
        const userData = await getUser();
        
        const dataToSave = {
          title: title,
          amount: amount,
          user: {
            name: userData.name,
            email: userData.email,
            id: userData.id
          },
          creation_date: new Date().toLocaleDateString(),
          creation_time: new Date().toLocaleTimeString()
        }
        
        const data = await addTransaction(dataToSave);
        if(data) {
          fetchUserTransactions();
          e.target.reset();
          titleInputRef.current.focus();
          toast.success("Transaction added!");
        } else {
          toast.error(data);
        }
  
      } catch(error) {
        toast.error(error)
      }
    } else {
      toast.error("Add a expense or income!");
    }
    
  }

  return (
    <div className="flex-1 md:order-first order-last bg-gray-50 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-500 rounded-lg">
      <form onSubmit={handleAddTransaction} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="block relative font-semibold">Title&nbsp;
            {titleToolTip && 
              <p className="bg-gray-900 text-gray-100 inline-flex flex-col absolute -top-6 left-0 w-34 p-1 text-xs rounded-lg shadow-xl">
                <span className="inline-block line-clamp-1 whitespace-nowrap text-ellipsis">Title of your transaction</span>
                <BiCaretDown className="absolute -bottom-3 left-8 text-gray-900"/>
              </p>
            }
            <FaRegQuestionCircle onMouseEnter={() => setTitleToolTip(true)} onMouseLeave={() => setTitleToolTip(false)} size="12px" className="cursor-pointer" />
          </label>
          <input ref={titleInputRef} type="text" name="title" id="title" autoComplete="off" maxLength="30" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="block relative font-semibold">Amount&nbsp;
            {amountToolTip && 
              <p className="bg-gray-900 text-gray-100 inline-flex flex-col absolute -top-10 left-0 w-52 p-1 text-xs rounded-lg shadow-xl">
                <span className="inline-block line-clamp-1 whitespace-nowrap text-ellipsis">Positive number treated as income</span>
                <span className="inline-block line-clamp-1 whitespace-nowrap text-ellipsis">Negative number treated as expense</span>
                <BiCaretDown className="absolute -bottom-3 left-14 text-gray-900"/>
              </p>
            }
            <FaRegQuestionCircle onMouseEnter={() => setAmountToolTip(true)} onMouseLeave={() => setAmountToolTip(false)} size="12px" className="cursor-pointer" />
          </label>
          <input type="number" name="amount" id="amount" autoComplete="off" className="w-full bg-gray-100 dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 focus:ring-4 p-2 mt-5 rounded-lg">Add Transaction</button>
      </form>
    </div>
  )
}
