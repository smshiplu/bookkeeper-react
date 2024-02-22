export const Summary = ({income, expense, balance}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 text-gray-800 p-4 border border-gray-300 dark:border-gray-500 rounded-lg">
      <h4 className="text-xl dark:text-white text-center font-bold mb-6 underline underline-offset-8">Summary</h4>
      <p className="w-full bg-green-100 text-center font-bold p-2 rounded-lg">Income: ${income}</p>
      <p className="w-full bg-rose-100 text-center font-bold p-2 rounded-lg">Expense: ${expense}</p>
      <p className="w-full bg-orange-200 text-center font-bold p-2 rounded-lg">Balance: ${balance}</p>
    </div>
  )
}
