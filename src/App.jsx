import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import React from "react"

export default function App() {

  const [date, setDate] = React.useState(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}


