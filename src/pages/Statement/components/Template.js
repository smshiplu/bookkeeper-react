import { useRef, useState } from "react";
import { useReactToPrint  } from "react-to-print";
import { BsPrinter } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { TemplateTable } from "./TemplateTable";

export const Template = ({setToggleTemplate, fromDate, toDate, dateRangeTransactions}) => {
  const printRef = useRef();
  const [allDates, setAllDates] = useState([]);
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [balance, setBalance] = useState(null);

  useState(() => {
    const dates = dateRangeTransactions.map(item => item["creation_date"]);
    const allUniqueDates = [...new Set(dates)];
    setAllDates(allUniqueDates);

    const tempIncomes = dateRangeTransactions.filter(item => Number(item.amount) > 0);
    let totalIncome = 0;
    tempIncomes.forEach(item => {
      totalIncome += Number(item.amount);
    });
    setIncome(totalIncome);

    const tempExpense = dateRangeTransactions.filter(item => Number(item.amount) < 0);
    let totalExpense = 0;
    tempExpense.forEach(item => {
      totalExpense -= Number(item.amount);
    });
    setExpense(totalExpense);

    setBalance(totalIncome - totalExpense);
  }, [dateRangeTransactions]); //eslint-disable-line

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Bookkeeper"
  });

  return (
    <div  className="bg-white text-gray-800 p-6 w-full absolute -top-24 left-0 ">
      <div className="flex items-center justify-end gap-3">
        <button onClick={handlePrint} title="Print"><BsPrinter /></button>
        <button onClick={() => setToggleTemplate(false)} title="Close"><IoIosCloseCircleOutline/></button>
      </div>
      <div ref={printRef} className="p-4 h-full">
        <h3 className="text-2xl text-center font-semibold underline my-4">Transactions form the date {fromDate} to {toDate} </h3>

        <div className="overflow-auto">
          <table className="my-8 font-bold" align="center">
            <tbody>
              <tr>
                <td>Total Income</td>
                <td>:</td>
                <td>{income}</td>
              </tr>
              <tr>
                <td>Total Expense</td>
                <td>:</td>
                <td>{expense}</td>
              </tr>
              <tr>
                <td>Total Balance</td>
                <td>:</td>
                <td>{balance}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {allDates.map((date, idx) => (
          <TemplateTable key={idx} date={date} dateRangeTransactions={dateRangeTransactions} />
        ))}
      </div>
    </div>
  )
}
