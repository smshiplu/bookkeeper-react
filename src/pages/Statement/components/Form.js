import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Template } from "./Template";

export const Form = ({transactions}) => {

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dateRangeTransactions, setDateRangeTransactions] = useState([]);
  const [toggleTemplate, setToggleTemplate] = useState(false);

  useEffect(() => {
    const controlFormInput = () => {
      if(transactions.length > 0) {
        const dates = transactions.map(item => item["creation_date"]);
        const uniqueDates = [...new Set(dates)];
        
        const timesArr = [];
        uniqueDates.filter(date => {
          timesArr.push(new Date(date).getTime());
        });

        const minTime = Math.min(...timesArr);
        let tempMinDate = new Date(minTime);
        tempMinDate.setDate(tempMinDate.getDate() + 1);
        setMinDate(tempMinDate.toISOString().split("T")[0]);

        const maxTime = Math.max(...timesArr);
        let tempMaxDate = new Date(maxTime);
        tempMaxDate.setDate(tempMaxDate.getDate() + 1);
        setMaxDate(tempMaxDate.toISOString().split("T")[0]);

        fromDateRef.current.addEventListener("change", () => {
          toDateRef.current.value = "";
          setTimeout(() => {
            toDateRef.current.setAttribute("min", fromDateRef.current.value);
            toDateRef.current.removeAttribute("disabled");
          }, 300);
        });
      }
    }
    controlFormInput();
  }, [transactions]); //eslint-disable-line

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const from = e.target.from_date.value;
    const to = e.target.to_date.value;
    const validation = validate(from, to);
    if(validation) {
      const dateRangList = getDateRangeArr(from, to);
     
      const transactionsByDates = transactions.filter(item => dateRangList.includes(item.creation_date));
      if(transactionsByDates.length > 0) {
        setDateRangeTransactions(transactionsByDates);
        setFromDate(from);
        setToDate(to);
        setToggleTemplate(true);
      } else {
        toast.error("No Transaction Found in date range!");
      }
    }
  }

  function validate(from, to) {
    let validation = true;
    if(!from || !to) {
      validation = false;
      if(!from) {
        toast.error("Pick From Date!");
      }
      if(!to) {
        toast.error("Pick To Date!");
      }
    }
    return validation; 
  }

  // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
  function getDateRangeArr(start, end) {
    let arr = [];
    for( let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1) ){
      arr.push(new Date(dt).toLocaleDateString());
    }
    return arr;
  };

  return (
    <section className="relative">
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-4 rounded-lg text-gray-800 dark:text-gray-100 text-center mb-10">
        <p className="mb-10 text-lg">Generate a statement in between a date range.</p>
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
            <div className="form-group flex flex-col items-start justify-center gap-1">
              <label htmlFor="from_date" className="font-semibold">From Date</label>
              <input ref={fromDateRef} className="border p-1 rounded dark:bg-gray-400" type="date" name="from_date" id="from_date" min={minDate} max={maxDate} />
            </div>
            <div className="form-group flex flex-col items-start justify-center gap-1">
              <label htmlFor="to_date" className="font-semibold">To Date</label>
              <input ref={toDateRef} className="border p-1 rounded dark:bg-gray-400" type="date" name="to_date" id="to_date" min={minDate} max={maxDate}  disabled="disabled" />
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold md:w-[330px] w-full max-w p-2 rounded">Generate</button>
        </form>
      </div>
      {toggleTemplate && <Template setToggleTemplate={setToggleTemplate} fromDate={fromDate} toDate={toDate} dateRangeTransactions={dateRangeTransactions} /> }
    </section>
  )
}
