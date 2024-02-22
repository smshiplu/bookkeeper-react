
export const TemplateTableIncomeTr = ({incomes}) => {
  return (
    <>
      {incomes.map((income, idx) => (
        <tr key={idx} className="bg-green-100">
          <td className="border">
            <div className="flex flex-col">
              <span>{income.title}</span>
              <span className="text-xs text-gray-500">{income.creation_time}</span>
            </div>
          </td>
          <td className="border text-right">{income.amount}</td>
        </tr>
      ))}
    </>


  )
}
