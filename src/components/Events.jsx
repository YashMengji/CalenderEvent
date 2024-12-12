import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Events({ dateToday }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('Others');
  const [eventDesc, setEventDesc] = useState('');
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem("eventData")) || {});
  const eventCard = useRef(null);
  const eventBox = useRef(null);

  useEffect(() => {
    const date = new Date();
    let hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    setStartTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    setEvents((prevEvents) => {
      if (!prevEvents[dateToday.toLocaleDateString()]) {
        return { ...prevEvents, [dateToday.toLocaleDateString()]: [] };
      }
      return prevEvents;
    });
  }, [dateToday]);

  useEffect(() => {
    return localStorage.setItem("eventData", JSON.stringify(events))
  }, [events])

  function createEvent(e) {
    e.preventDefault();

    if (!eventName || !startTime) {
      toast.error('Enter event name and start time!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    if (!endTime) {
      toast.error('Enter end time!', { position: 'top-right', autoClose: 3000 });
      return;
    }
    if(startTime>endTime){
      toast.error('End time is smaller than start time!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const currentDate = dateToday.toLocaleDateString();
    const eventsForDate = events[currentDate] || [];

    const slotBooked = eventsForDate.some((event) =>
      (startTime >= event.startTime && startTime < event.endTime) ||
      (endTime > event.startTime && endTime <= event.endTime) ||
      (startTime <= event.startTime && endTime >= event.endTime)
    );

    if (slotBooked) {
      toast.error('Time slot already booked!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const newEvent = {
      id: eventsForDate.length + 1,
      name: eventName,
      desc: eventDesc,
      startTime,
      endTime,
      category: eventCategory,
    };

    setEvents((prevEvents) => ({
      ...prevEvents,
      [currentDate]: [...eventsForDate, newEvent].sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }));

    setEventName('');
    setEventDesc('');
    setEventCategory('Others');
    setEndTime('');

    toast.success('Event created successfully!', { position: 'top-right', autoClose: 3000 });
  }

  function onEdit(event, indexTarget) {
    setEventName(event.name);
    setEventDesc(event.desc);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setEventCategory(event.category);
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateToday.toLocaleDateString()]: prevEvents[dateToday.toLocaleDateString()].filter((_, index) => index !== indexTarget),
    }));
    toast.info('Edit the event here!', { position: 'top-right', autoClose: 3000 });
  }

  function handleMouseDown(e) {
    e.preventDefault();
    e.target.style.cursor = "grabbing"

    function handleMouseUp() {
      e.target.style.cursor = "grab"
      // document.removeEventListener("mouseup", handleMouseUp);
    }

    eventCard.current.addEventListener("drag", (e) => {
      
      e.target.style.top 
    });

    document.addEventListener("mouseup", handleMouseUp);
  }


  return (
    <div className="w-[600px] h-[500px] border-black border border-zinc-500 rounded-xl p-4">
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
                  onChange={(e) => setStartTime(e.target.value)}
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
            <div className="">Label:</div>
            <div className="border border-black rounded-md ">
              <Select className="outline-none border-none" value={eventCategory} onValueChange={(value) => setEventCategory(value)}>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Event category" />
                </SelectTrigger>
                <SelectContent>
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

      <div 
        className="div-events-list relative flex flex-col gap-3 w-full h-[230px] overflow-auto mt-3"
        ref={eventBox}
      >
        {events[dateToday.toLocaleDateString()]?.map((event, indexTarget) => (
          <div
            className={`event-card flex flex-col justify-between w-full min-h-[100px] rounded-xl p-2 ${
              event.category === "Work" ? "bg-blue-500" : event.category === "Personal" ? "bg-green-500" : "bg-zinc-500"
            }`}
            key={event.id}
            ref={eventCard}
            onMouseDown={handleMouseDown}
          >
            <div className="flex justify-between">
              <div className="event-name font-[Montserrat] text-2xl text-white font-extrabold">
                {event.name}
              </div>
              <div className="event-actions flex gap-2">
                <button
                  className="edit-event-button bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => onEdit(event, indexTarget)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="delete-event-button bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setEvents((prevEvents) => {
                      const updatedEvents = prevEvents[dateToday.toLocaleDateString()].filter((_, index) => index !== indexTarget);
                      return { ...prevEvents, [dateToday.toLocaleDateString()]: updatedEvents};
                    });
                    toast.success('Event deleted successfully!', { position: 'top-right', autoClose: 3000 });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <div className="event-desc text-white break-normal break-words break-all ">{event.desc}</div>
            <div className="event-time text-zinc-300">
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
