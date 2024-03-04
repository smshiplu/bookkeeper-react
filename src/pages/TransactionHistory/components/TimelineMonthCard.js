import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { TimelineDateCard } from "./TimelineDateCard";

import { useTransaction } from "../../../contexts";

export const TimelineMonthCard = ({month, year}) => {

  const { timelineListCtx } = useTransaction();

  const [accordionToggle, setAccordionToggle] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    timelineListCtx.forEach(item => {
      if(item.month === month && item.year === year) {
        setDates(item.dates.sort((a, b) => a -b));
      }
    });
    
  }, [ month, year, timelineListCtx]);

 

  const textMonth = () => {
    switch(month) {
      case "1": 
        return "January";
        break; //eslint-disable-line

      case "01": 
        return "January";
        break; //eslint-disable-line

      case "2": 
        return "February";
        break; //eslint-disable-line

      case "02": 
        return "February";
        break; //eslint-disable-line

      case "3": 
      return "March";
      break; //eslint-disable-line

      case "03": 
        return "March";
        break; //eslint-disable-line

      case "4": 
        return "April";
        break; //eslint-disable-line

      case "04": 
        return "April";
        break; //eslint-disable-line

      case "5": 
        return "May";
        break; //eslint-disable-line

      case "05": 
        return "May";
        break; //eslint-disable-line

      case "6": 
        return "June";
        break; //eslint-disable-line

      case "06": 
        return "June";
        break; //eslint-disable-line

      case "7": 
        return "July";
        break; //eslint-disable-line

      case "07": 
        return "July";
        break; //eslint-disable-line

      case "8": 
        return "August";
        break; //eslint-disable-line

      case "08": 
        return "August";
        break; //eslint-disable-line

      case "9": 
        return "September";
        break; //eslint-disable-line

      case "09": 
        return "September";
        break; //eslint-disable-line

      case "10": 
        return "October";
        break; //eslint-disable-line

      case "11": 
        return "November";
        break; //eslint-disable-line

      case "12": 
        return "December";
        break; //eslint-disable-line
      
      default:
        console.log("No Case Found!");
        break;
    }
  }

  return (
    <li className={`${accordionToggle ? "my-10" : "mb-5"} ms-4`}>
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className={`${accordionToggle ? "text-lg font-bold text-gray-800 dark:text-gray-100 -mt-10" : "text-sm font-normal mb-1"} leading-none text-gray-500 dark:text-gray-600 capitalize`}>
        <button onClick={() => setAccordionToggle(!accordionToggle)}>
          {textMonth()} {year}
          {accordionToggle ? <FaAngleUp/> : <FaAngleDown/>}
        </button>
      </time>
      {accordionToggle && 
        <ol className="my-5 relative border-s border-gray-200 dark:border-gray-700">                  
          {dates.map((date, idx) => (
             <TimelineDateCard key={idx} date={date}  month={month} year={year} />
          ))}
        </ol>
      }
    </li>
  )
}
