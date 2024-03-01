import { useEffect, useState } from "react";
import { TimelineCard } from "./TimelineCard";

export const Timeline = ({timelineObject, transactions}) => {
  const [years, setYears] = useState([]);
  useEffect(() => {
    const tempYears = timelineObject.map(item => item["year"]);
    const uniqueTempYears = [...new Set(tempYears)];
    const sortedYears = uniqueTempYears.sort((a, b) => a-b);
    setYears(sortedYears);
  }, [timelineObject]);

  return (
    <section>
      <ol className="relative ml-5 border-s border-gray-200 dark:border-gray-700">    
        {years.map((year, idx) => (
          <TimelineCard key={idx} year={year} timelineObject={timelineObject} transactions={transactions} />
        ))}
      </ol>
    </section>
  )
}
