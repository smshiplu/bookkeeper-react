import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { TimelineTab } from "./TimelineTab";

export const TimelineDateCard = ({date, month, year, transactions}) => {
  const [accordionToggle, setAccordionToggle] = useState(false);
  const [transactionsAccordingDate, setTransactionsAccordingDate] = useState([]);

  useEffect(() => {
    const creationDate = `${month}/${date}/${year}`;
    const transactionOnDate = transactions.filter(item => item.creation_date === creationDate);
    setTransactionsAccordingDate(transactionOnDate);
  }, [date, month, year, transactions]);

  return (
    <li className={`${accordionToggle ? "my-10" : "mb-5"} ms-4`}>
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className={`${accordionToggle ? "text-lg font-bold text-gray-800 dark:text-gray-100 " : "text-sm font-normal mb-1"}   leading-none text-gray-500 dark:text-gray-600 capitalize`}>
        <button onClick={() => setAccordionToggle(!accordionToggle)}>
          {`${month}/${date}/${year}`}
          {accordionToggle ? <FaAngleUp/> : <FaAngleDown/>}
        </button>
      </time>
      {accordionToggle && <TimelineTab transactionsAccordingDate={transactionsAccordingDate} />}
    </li>
  )
}
