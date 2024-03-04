export const TimelineTabBtnCard = ({tab, activeToggle, setActiveToggle}) => {
  return (
    <li>
      <button onClick={() => setActiveToggle(`${tab.text}`)} className={`${activeToggle === tab.text ? "text-white bg-blue-700  dark:bg-blue-600" : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"} tab inline-flex items-center px-4 py-3 rounded-lg  w-full`}>
        {tab.icon} {tab.text}
      </button>
    </li>
  )
}
