import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Events({ ...props }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const date = new Date();
    let hours = date.getHours()
    hours = hours.toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const startTime = `${hours}:${minutes}`;
    setStartTime(startTime);
    setEndTime(startTime);
  }, []);

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
      date: props.date,
    };
    setEvents([...events, newEvent]);

    setEventName('');
    setEventDesc('');

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
        <div className="div-create-event-input flex flex-col gap-5 w-full rounded-xl">
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

          <div className="div-event-time flex items-end gap-5">
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
      <div className="div-events-list flex flex-col gap-3 w-full h-[277px] overflow-auto mt-3">
          {events.map((event) => (
            <div className="event-card flex flex-col justify-between w-full min-h-[100px] bg-white rounded-xl p-2" key={event.id}>
              <div className="event-name font-[Montserrat] text-2xl font-extrabold">{event.name}</div>
              <div className="event-desc break-normal break-words break-all ">{event.desc}</div>
              <div className="event-time text-zinc-500">
                {console.log(Math.floor(Number(event.endTime.substring(3)) / 12))}
                {Number(event.startTime.substring(0, 2)) % 12 === 0 ? "12" : Number(event.startTime.substring(0, 2) % 12).padStart(2, '0') }:{event.startTime.substring(3)} {Math.floor(Number(event.startTime.substring(0, 2)) / 12) === 0 ? "am" : "pm"} - 
                {Number(event.endTime.substring(0, 2)) % 12 === 0 ? "12" : String(Number(event.endTime.substring(0, 2)) % 12).padStart(2, '0')}:{event.endTime.substring(3)} {Math.floor(Number(event.endTime.substring(0, 2)) / 12) === 0 ? "am" : "pm"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Events;
