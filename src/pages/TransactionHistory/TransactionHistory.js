import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDocTitle } from "../../hooks";

import { Loading } from "../../components";
import { Timeline } from "./components/Timeline";

import { getUserTransactions } from "../../services";


export const TransactionHistory = () => {
  useDocTitle("History");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creationDates, setCreationDates] = useState([]);
  const [years, setYears] = useState([]);
  const [timelineObject, setTimelineObject] = useState([]);

  useEffect(() => {
    const fetchUserTransaction = async () => {
      try {
        setLoading(true);
        const data = await getUserTransactions();
        
        if(data.length > 0) {
          setTransactions(data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data);
        }
  
      } catch(error) {
        setLoading(false);
        toast.error(error);
      }
    }
    fetchUserTransaction();
  }, []); //eslint-disable-line

  useEffect(() => {
    const allTransactionDates = () => {
      const creationDates =  transactions.map(item => item["creation_date"]);
      const uniqueDates =  [...new Set(creationDates)];
      setCreationDates(uniqueDates);
    }
    allTransactionDates();
  }, [transactions]);
    
  
  useEffect(() => {
    const makeYears = () => {
      const yearArr = [];
      creationDates.forEach(item => {
        yearArr.push(item.split("/")[2]);
      });
      const uniqYearArr = [...new Set(yearArr)];
      setYears(uniqYearArr);
    }
    makeYears();
  }, [creationDates]);

  useEffect(() => {
    const getMonthsByYear = (year) => {
      const tempMonths = [];
      creationDates.forEach(item => {
        if(item.split("/")[2] === year) {
          tempMonths.push(item.split("/")[0]);
        }
      });
      return [...new Set(tempMonths)];
    }

    const getDatesByMonthAndYear = (month, year) => {
      const tempDates = [];
      creationDates.forEach(item => {
        if(item.split("/")[0] === month  && item.split("/")[2] === year) {
          tempDates.push(item.split("/")[1]);
        }
      });
      return tempDates;
    }

    let ObjArr = [];
    for(const year of years) {
      const months = getMonthsByYear(year);
      for(const month of months) {
        const dates = getDatesByMonthAndYear(month, year);
        ObjArr.push({year, month, dates})
      }
    }
    setTimelineObject(ObjArr);
  }, [creationDates, years]);
  

  return (
    <main>
      {loading && 
        <Loading/>
      }
      <section className="text-gray-800 dark:text-gray-100 text-center mb-10">
        <h3 className="text-2xl font-bold underline underline-offset-8">Transaction History</h3>
      </section>
      <Timeline timelineObject={timelineObject} transactions={transactions} />
    </main>
  )
}
