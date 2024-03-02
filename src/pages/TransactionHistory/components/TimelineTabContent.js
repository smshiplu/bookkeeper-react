import { Actions } from "./Actions";

export const TimelineTabContent = ({transactions, title}) => {

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{transactions.length > 1 ? `${title}s` : title }({transactions.length})</h3>
      <div className="w-full overflow-auto">
        <table className="w-full overflow-hidden">
          <thead>
            <tr className="border bg-gray-200 dark:bg-gray-600">
              <th className="border p-1">ID</th>
              <th className="border p-1">Title</th>
              <th className="border p-1">Time</th>
              <th className="border p-1">Amount</th>
              <th className="border p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
            
            <tr id={transaction.id} key={transaction.id} className={`${Number(transaction.amount) < 0 ? "bg-rose-100" : "bg-green-100"} text-gray-800 border overflow-hidden`}>
              <td className="p-4"><span>#{transaction.id}</span></td>
              <td><span className="line-clamp-1">{transaction.title}</span></td>
              <td><span className="line-clamp-1">{transaction.creation_time}</span></td>
              <td><span>{transaction.amount}</span></td>
              <td><Actions id={transaction.id} /></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}
