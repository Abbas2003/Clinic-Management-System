"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function DatePicker({ session }) {
    const [date, setDate] = React.useState(new Date())
    const {toast} = useToast();

    const handleBookApt = () => {
        let isDateInFuture = Date.now() < new Date(date);
        console.log("isDateInFuture", isDateInFuture);
        if(!isDateInFuture) return toast({ title: "Please select a future date" });
        const obj = { user: session.user._id, request: request, date };   
    }

    return (
        <div className="w-full my-5">
            <h1 className="font-semibold mb-3">Pick your Appointment Date</h1>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick your Appointment Date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            {session ? (
                <Button className="w-full w-3/2 my-3" onClick={handleBookApt}>Book Appointment</Button>
            ) : (
                <Link href="/signin">
                    <Button className="w-full my-3">Login to Book Appointment</Button>
                </Link>
            )}
        </div>
    )
}
