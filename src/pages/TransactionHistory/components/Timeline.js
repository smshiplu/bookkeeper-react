import { useEffect, useState } from "react";
import { TimelineCard } from "./TimelineCard";
import { useTransaction } from "../../../contexts";



export const Timeline = () => {

  const { timelineListCtx } = useTransaction();
 
  const [years, setYears] = useState([]);
  useEffect(() => {
    const tempYears = timelineListCtx.map(item => item["year"]);
    const uniqueTempYears = [...new Set(tempYears)];
    const sortedYears = uniqueTempYears.sort((a, b) => a-b);
    setYears(sortedYears);
  }, [timelineListCtx]);

  return (
    <section>
      <ol className="relative ml-5 border-s border-gray-200 dark:border-gray-700">    
        {years.map((year, idx) => (
          <TimelineCard key={idx} year={year} />
        ))}
      </ol>
    </section>
  )
}
