import { connectDB } from '@/src/config/dbConfig'
import { EventType } from '@/src/interfaces/events';
import EventModel from '@/src/models/event-model'
import React from 'react'
import TicketSelection from '../_components/ticket-selection';
import BookingModel from '@/src/models/booking-models';
connectDB();

interface Props {
    params: {
        eventid: string;
    };
}

async function BookEventPage({ params }: Props) {
    const event: EventType = (await EventModel.findById(params.eventid)) as any;
    const eventBookings = await BookingModel.find({ event: params.eventid, status: 'booked' });

    const getEventProperty = (property: string) => {
        return <div className='flex flex-col'>
            <h1 className='font-semibold capitalize'>{property}</h1>
            <h1 className='text-gray-600'>{event[property as keyof EventType]}</h1>
        </div>
    }
    return (
        <div className='bg-white rounded-xl p-3 shadow-2xl'>
            <div className='flex flex-col gap-3 bg-gradient-to-tr rounded-xl p-5 from-pink-500 to-yellow-500 text-white shadow-lg'>
                <h1 className="md:text-3xl text-xl">{event.name}</h1>
                <div className="text-sm flex gap-10 ">
                    <h1>
                        <i className="ri-map-pin-line pr-3"></i>
                        {event.location}
                    </h1>
                    <h1>
                        <i className="ri-calendar-schedule-line pr-3"></i>
                        {event.date} at{""} {event.time}
                    </h1>
                </div>
            </div>

            <div className='p-3'>
                <div className="flex gap-5 flex-wrap overflow-x-auto mt-10">
                    {event.images.map((image, index) => (
                        <img src={image}
                            key={index}
                            alt="picture of the event"
                            height={280} width={280}
                            className="rounded-xl object-cover"
                        />
                    ))}
                </div>
                <p className="text-gray-500 w-full mt-7">
                    {event.description}
                </p>

                <div className="mt-7 border border-gray-200 p-3 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-5">
                    {getEventProperty('organizer')}
                    {getEventProperty('location')}
                    {getEventProperty('date')}
                    {getEventProperty('time')}

                    <div className='flex flex-col'>
                        <h1 className='font-semibold capitalize'>メインゲスト</h1>
                        <h1 className='text-gray-600'>{event.guests.join(", ")}</h1>
                    </div>
                </div>
                <TicketSelection event={JSON.parse(JSON.stringify(event))}
                    eventBookings={JSON.parse(JSON.stringify(eventBookings))}
                />
            </div>
        </div>
    )
}

export default BookEventPage