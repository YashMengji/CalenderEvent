import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Events({ ...props }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCategory, setEventCategory] = useState('Others');
  const [events, setEvents] = useState([{id: 1, name: 'sadfdf', desc: '', startTime: '11:01', endTime: '11:01'}]);

  useEffect(() => {
    const date = new Date();
    let hours = date.getHours()
    hours = hours.toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const startTime = `${hours}:${minutes}`;
    setStartTime(startTime);
    setEndTime(startTime);
  }, []);

  useEffect(() => {
    console.log(events)
  }, [events])

  function createEvent(e) {
    e.preventDefault();
    if (!eventName || !startTime || !endTime) {
      toast.error('Enter event details!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newEvent = {
      id: events.length + 1,
      name: eventName,
      desc: eventDesc,
      startTime: startTime,
      endTime: endTime,
      category: eventCategory,
      date: props.date,
    };
    setEvents([...events, newEvent]);

    setEventName('');
    setEventDesc('');
    setEventCategory('');

    toast.success('Event created successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="w-[600px] h-[500px] border-black border-2 rounded-xl p-4">
      <form>
        <div className="div-create-event-input flex flex-col gap-4 w-full rounded-xl">
          <div className="div-event-name-input flex flex-col relative w-full">
            <span className="absolute text-red-500 top-[-2px] left-[-8px] text-xl">*</span>
            <input
              type="text"
              className="event-name-input w-1/2 bg-transparent border-b border-black rounded-tl-xl outline-none text-md placeholder-gray-700"
              placeholder="Event Name (max 30 characters)"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              maxLength="30"
              required
            />
          </div>

          <div className="div-event-desc-input flex justify-start w-full">
            <input
              type="text"
              className="event-desc-input w-3/4 bg-transparent border-b border-black rounded-tl-xl outline-none text-md placeholder-gray-700"
              placeholder="Event Description (max 100 characters)"
              value={eventDesc}
              maxLength="100"
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>

          <div className="div-event-time flex items-end gap-6">
            <div className="flex gap-2 relative">
              <span className="absolute text-red-500 top-[-3px] left-[-8px] text-xl">*</span>
              <div className="div-from-label">From:</div>
              <div className="div-event-start-time">
                <input
                  type="time"
                  className="event-start-time-input w-[160px] bg-transparent outline-none border-b border-black cursor-pointer"
                  value={startTime}
                  onFocus={(e) => e.target.showPicker()}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  id="startTime"
                />
              </div>
            </div>
            <div className="flex gap-2 relative">
              <span className="absolute text-red-500 top-[-3px] left-[-8px] text-xl">*</span>
              <div className="div-to-label">To:</div>
              <div className="div-event-end-time">
                <input
                  type="time"
                  className="event-end-time-input w-[160px] bg-transparent outline-none border-b border-black cursor-pointer"
                  value={endTime}
                  onChange={(e) => {
                    if (e.target.value < startTime) {
                      setEndTime(startTime);
                    } else {
                      setEndTime(e.target.value);
                    }
                  }}
                  onFocus={(e) => e.target.showPicker()}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ">
            <div className="">
              Label:
            </div>
            <div className="border border-black rounded-md " >
              <Select className="outline-none border-none" value={eventCategory} onValueChange={(value) => setEventCategory(value)}>
                <SelectTrigger className="w-[180px] " > 
                  <SelectValue placeholder="Event category" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem className="bg-blue-500 text-white" value="Work">Work</SelectItem>
                  <SelectItem className="bg-green-500 text-white" value="Personal">Personal</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="create-event-button flex items-center justify-center gap-2 w-[115px] h-[40px] bg-gray-300 text-sm text-white bg-zinc-800"
              onClick={createEvent}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Event
            </button>
          </div>
        </div>
      </form>

      <div className="div-events-list flex flex-col gap-3 w-full h-[230px] overflow-auto mt-3">
        {events.map((event) => (
          <div className={`event-card flex flex-col justify-between w-full min-h-[100px] bg-white rounded-xl p-2 ${event.category === "Work" ? "bg-blue-500" : event.category === "Personal" ? "bg-green-500" : "bg-zinc-500"}`} key={event.id}>
            <div className="flex justify-between">
              <div className="event-name font-[Montserrat] text-2xl text-white font-extrabold">{event.name}</div>
              <div className="flex items-start gap-3 bg-blue-500 ">
                <div className="">
                  <FontAwesomeIcon icon={faPenToSquare} className='text-xl text-white' />
                </div>
                <div className="">
                  <FontAwesomeIcon icon={faTrash} className='text-xl text-red-500' />
                </div>
              </div>
            </div>
            <div className="event-desc text-white break-normal break-words break-all ">{event.desc}</div>
            <div className="event-time text-zinc-300">
              {console.log(Math.floor(Number(event.endTime.substring(3)) / 12))}
              {Number(event.startTime.substring(0, 2)) % 12 === 0 ? "12" : String(Number(event.startTime.substring(0, 2)) % 12).padStart(2, '0')}:{event.startTime.substring(3)} {Math.floor(Number(event.startTime.substring(0, 2)) / 12) === 0 ? "am" : "pm"} -
              {Number(event.endTime.substring(0, 2)) % 12 === 0 ? "12" : String(Number(event.endTime.substring(0, 2)) % 12).padStart(2, '0')}:{event.endTime.substring(3)} {Math.floor(Number(event.endTime.substring(0, 2)) / 12) === 0 ? "am" : "pm"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
