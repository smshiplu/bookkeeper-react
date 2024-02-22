import { useEffect, useState } from "react";
import { TimelineTabContent } from "./TimelineTabContent";

export const TimelineTabResultCard = ({activeToggle, transactionsAccordingDate}) => {
  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setIncomes(transactionsAccordingDate.filter(item => Number(item.amount) > 1));
    setExpenses(transactionsAccordingDate.filter(item => Number(item.amount) < 1));
  }, [transactionsAccordingDate]); //eslint-disable-line

  useEffect(() => {
    if(activeToggle === "All") {
      setTransactions(transactionsAccordingDate);
    }
    if(activeToggle === "Income") {
      setTransactions(incomes);
    }
    if(activeToggle === "Expense") {
      setTransactions(expenses);
    }
  }, [activeToggle, transactionsAccordingDate]); //eslint-disable-line


  switch(activeToggle) {
    case "All":
      return (
        <TimelineTabContent transactions={transactions} title="All Transaction" />
      )
    break; //eslint-disable-line

    case "Income":
      return (
        <TimelineTabContent transactions={transactions} title="Income" />
      )
    break; //eslint-disable-line

    case "Expense":
      return (
        <TimelineTabContent transactions={transactions} title="Expense" />
      )
    break; //eslint-disable-line

    default:
      throw new Error("No case Found!");
  }
}
