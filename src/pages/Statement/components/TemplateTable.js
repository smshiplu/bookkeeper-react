import { useEffect, useState } from "react";
import { TemplateTableIncomeTr } from "./TemplateTableIncomeTr";
import { TemplateTableExpenseTr } from "./TemplateTableExpenseTr";

export const TemplateTable = ({date, dateRangeTransactions}) => {

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const transactions = dateRangeTransactions.filter(item => item.creation_date === date);
    const tempIncomes = transactions.filter(item => Number(item.amount) > 0 );
    setIncomes(tempIncomes);

    let sumOfIncomes = 0;
    tempIncomes.forEach(item => {
      sumOfIncomes += Number(item.amount);
    });
    
    const tempExpenses = transactions.filter(item => Number(item.amount) < 0 );
    setExpenses(tempExpenses);

    let sumOfExpenses = 0;
    tempExpenses.forEach(item => {
      sumOfExpenses -= Number(item.amount); // minus(-) sign has been used because of item.amount contains minus sign e.g (-10);
    });
 
    setBalance(sumOfIncomes - sumOfExpenses);

  }, [dateRangeTransactions, date]);

  return (
    <div className="overflow-auto">
      <table className="w-full my-5 border" cellPadding={5}>
        <tbody>
          <tr>
            <td className="w-5/6 font-bold">{date}</td>
            <td className="w-1/6"></td>
          </tr>
          <TemplateTableIncomeTr incomes={incomes} />
          <TemplateTableExpenseTr expenses={expenses} />
          <tr>
            <td className="border text-right font-semibold">Balance</td>
            <td className="border font-semibold text-right">{balance}</td>
          </tr> 
        </tbody>
      </table>
    </div>
  )
}
