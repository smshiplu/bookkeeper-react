
export const TemplateTableExpenseTr = ({expenses}) => {
  return (
    <>
      {expenses.map((expense, idx) => (
        <tr key={idx} className="bg-rose-100">
          <td className="border">
            <div className="flex flex-col">
              <span>{expense.title}</span>
              <span className="text-xs text-gray-500">{expense.creation_time}</span>
            </div>
          </td>
          <td className="border text-right">{expense.amount}</td>
        </tr>
      ))}
    </>
  )
}
