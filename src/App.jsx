import React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Events from "./components/Events"
import { ToastContainer } from 'react-toastify';

export default function App() {

  const [date, setDate] = React.useState(new Date())

    useEffect(() => {
    }, [date])


  return (
    <div className="main-div flex justify-evenly items-center min-h-screen bg-[url('/images/image.png')] bg-no-repeat object-fill bg-center bg-yellow-300 ">
      <ToastContainer />
      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => {d && setDate(d)}}
        className="flex w-max h-max border-black border-2 rounded-md z-20"
      />
      <Events dateToday={date}/>
    </div>
  )
}


