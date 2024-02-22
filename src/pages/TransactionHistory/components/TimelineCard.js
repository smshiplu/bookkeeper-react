import { useEffect, useState } from "react";
import { FaRegCalendar, FaPlus, FaMinus} from "react-icons/fa";
import { TimelineMonthCard } from "./TimelineMonthCard";

export const TimelineCard = ({year, timelineObject, transactions}) => {

  const [accordionToggle, setAccordionToggle] = useState(false);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const tempMonths = [];
    timelineObject.forEach(item => {
      if(item.year === year) {
        tempMonths.push(item.month)
      }
    });
    setMonths(tempMonths);
  }, [year, timelineObject]);

  return (
                  
    <li className="mb-5 ms-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 mt-2">
        <FaRegCalendar className=" text-blue-800 dark:text-blue-300"/>
      </span>
      <button onClick={() => setAccordionToggle(!accordionToggle)} className={`${accordionToggle ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-300 hover:bg-blue-500 hover:text-white"}  w-full p-3 flex items-center justify-between font-semibold rounded-xl`}>
        <span>{year}</span>
        {accordionToggle && <FaMinus className="inline-block" />}
        {!accordionToggle && <FaPlus className="inline-block" />}
      </button>
      {accordionToggle && <ol className="my-5 relative border-s border-gray-200 dark:border-gray-700">
        {months.map((month, idx) => (
          <TimelineMonthCard key={idx} month={month} year={year} timelineObject={timelineObject} transactions={transactions} />
        ))}
      </ol>}
      
    </li>
  )
}
