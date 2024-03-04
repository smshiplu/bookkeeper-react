import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Loading } from "../../components";
import { AddTransaction } from "./components/AddTransaction";
import { Summary } from "./components/Summary";
import { IncomeCard } from "./components/IncomeCard";
import { ExpenseCard } from "./components/ExpenseCard";

import { useDocTitle } from "../../hooks";

import { getUserTransactions } from "../../services";

import { useTransaction } from "../../contexts";


export const Dashboard = () => {

  const {setTransactionListCtx, transactionListCtx} = useTransaction();
  useDocTitle("Dashboard");
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [lastTenExpense, setLastTenExpense] = useState([]);
  const [lastTenIncome, setLastTenIncome] = useState([]);

  async function fetchUserTransactions() {
    setLoading(true);
    try{
      const data = await getUserTransactions();
      if(data) {
        setTransactionListCtx(data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(data);
      }
    } catch(error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchUserTransactions();
  }, []); //eslint-disable-line

  useEffect(() => {
    const expenseArr = transactionListCtx.filter(item => Number(item.amount) < 0 );
    let totalExpense = 0;
    expenseArr.forEach(item => totalExpense -= Number(item.amount));
    setExpense(totalExpense);

    const last10Expense = expenseArr.filter((item, idx) => {
      return idx >= expenseArr.length - 10;
    });
    setLastTenExpense(last10Expense.reverse());

    const incomeArr = transactionListCtx.filter(item => item.amount > 0 );
    let totalIncome = 0;
    incomeArr.forEach(item => totalIncome += Number(item.amount));
    setIncome(totalIncome);

    const last10Income = incomeArr.filter((item, idx) => {
      return idx >= incomeArr.length - 10;
    });
    setLastTenIncome(last10Income.reverse());
    
    setBalance(totalIncome - totalExpense);
  }, [transactionListCtx]);
  

  return (
    <main>
      {loading && (
        <Loading/>
      )}
      <section className="flex flex-col md:flex-row gap-5 text-gray-800 dark:text-white">
        <Summary income={income} expense={expense} balance={balance} />
        <AddTransaction fetchUserTransactions={fetchUserTransactions} />
      </section>
      <section className="my-5 text-gray-800 dark:text-white p-4 border border-gray-300 dark:border-gray-500 rounded-lg">
        <h3 className="text-xl text-center font-bold mb-6 underline underline-offset-8">Transaction History</h3>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-4 rounded-lg">
            <h4 className="text-lg text-center font-semibold mb-4 underline underline-offset-4">Last 10 Incomes</h4>
            <ul className="flex flex-col gap-3">
              {lastTenIncome.map(income => (
                <IncomeCard key={income.id} income={income} fetchUserTransactions={fetchUserTransactions} />
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-4 rounded-lg">
            <h4 className="text-lg text-center font-semibold mb-4 underline underline-offset-4">Last 10 Expenses</h4>
            <ul className="flex flex-col gap-3">
              {lastTenExpense.map(expense => (
                <ExpenseCard key={expense.id} expense={expense} fetchUserTransactions={fetchUserTransactions} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
