import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Events from "./components/Events"
import React from "react"

export default function App() {

  const [date, setDate] = React.useState(new Date())

  return (
    <div className="main-div flex justify-center items-center min-h-screen">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="flex w-max h-max border border-8 rounded-md"
      />
      <Events/>
    </div>
  )
}


