"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


export default function AppointmentFilterTabs({ status }) {
    
  const [activeFilter, setActiveFilter] = useState(status);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (activeFilter) {
      params.set("status", activeFilter);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);

  }, [activeFilter]);


  return (
  <>
    <div className="grid grid-cols-2 md:grid-cols-5 w-full lg:w-1/2 gap-2 sm:gap-4 mx-auto p-2 md:p-0 my-2">
      <div
        className={`border-secondory cursor-pointer p-2 sm:p-3 text-center border rounded text-sm sm:text-base ${
          activeFilter == "pending" && "bg-primary text-white dark:text-black dark:bg-white"
        }`}
        value="pending"
        onClick={() => setActiveFilter("pending")}
      >
        Pending 
      </div>
      <div
        className={`border-secondory cursor-pointer p-2 sm:p-3 text-center border rounded text-sm sm:text-base ${
          activeFilter == "accepted" && "bg-primary text-white dark:text-black dark:bg-white"
        }`}
        value="accepted"
        onClick={() => setActiveFilter("accepted")}
      >
        Accepted
      </div>
      <div
        className={`border-secondory cursor-pointer p-2 sm:p-3 text-center border rounded text-sm sm:text-base ${
          activeFilter == "cancelled" && "bg-primary text-white dark:text-black dark:bg-white"
        }`}
        value="cancelled"
        onClick={() => setActiveFilter("cancelled")}
      >
        Rejected
      </div>
      <div
        className={`border-secondory cursor-pointer p-2 sm:p-3 text-center border rounded text-sm sm:text-base ${
          activeFilter == "upcoming" && "bg-primary text-white dark:text-black dark:bg-white"
        }`}
        value="upcoming"
        onClick={() => setActiveFilter("upcoming")}
      >
        Upcoming
      </div>
      <div
        className={`border-secondory cursor-pointer p-2 sm:p-3 text-center border rounded text-sm sm:text-base ${
          activeFilter == "past" && "bg-primary text-white dark:text-black dark:bg-white"
        }`}
        value="past"
        onClick={() => setActiveFilter("past")}
      >
        Past
      </div>
    </div>
  </>
);
}