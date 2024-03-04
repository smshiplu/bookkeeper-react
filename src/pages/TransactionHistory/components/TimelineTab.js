import { useState } from "react";
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney  } from "react-icons/gi";

import { TimelineTabBtnCard } from "./TimelineTabBtnCard";
import { TimelineTabResultCard } from "./TimelineTabResultCard";

export const TimelineTab = ({transactionsAccordingDate}) => {
  const [activeToggle, setActiveToggle] = useState("All");

  const tabs = [
    {id:1, text: "All", icon:<GiTakeMyMoney size={"30px"} />},
    {id:2, text: "Income", icon:<GiReceiveMoney size={"30px"} />},
    {id:3, text: "Expense", icon:<GiPayMoney size={"30px"} />}
  ];

  return (
    <div className="my-4 p-2 text-base font-normal bg-gray-100 dark:bg-gray-500 text-gray-500 dark:text-gray-300 rounded-xl">
      <div className="md:flex">
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {tabs.map(tab => (
            <TimelineTabBtnCard key={tab.id} tab={tab} activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
          ))}
        </ul>
        <TimelineTabResultCard activeToggle={activeToggle} transactionsAccordingDate={transactionsAccordingDate} />
      </div>
    </div>
  )
}
