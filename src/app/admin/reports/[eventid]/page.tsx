import { connectDB } from '@/src/config/dbConfig';
import { EventType } from '@/src/interfaces/events';
import BookingModel from '@/src/models/booking-models';
import EventModel from '@/src/models/event-model';
import React from 'react'

connectDB();

interface Props {
    params: {
        eventid: string;
    };
}

async function EventReportsPage({ params }: Props) {
    const event: EventType = (await EventModel.findById(params.eventid)) as any;
    const eventBookings = await BookingModel.find({ event: params.eventid, status: 'booked' });


    let ticketTypeAndTheirRevenue: any = {};
    eventBookings.forEach((booking) => {
        if (!ticketTypeAndTheirRevenue[booking.ticketType]) {
            ticketTypeAndTheirRevenue[booking.ticketType] = { ticketSold: 0, revenue: 0 };
        }
        ticketTypeAndTheirRevenue[booking.ticketType].ticketSold += booking.ticketCount;
        ticketTypeAndTheirRevenue[booking.ticketType].revenue += booking.totalAmount;
    });

    const totalRevenue = Object.keys(ticketTypeAndTheirRevenue).reduce(
        (total, ticketType) => {
            return total + ticketTypeAndTheirRevenue[ticketType].revenue;
        }, 0);

    console.log(totalRevenue);

    return (
        <div>
            <div className='flex flex-col gap-3 bg-gradient-to-tr rounded-xl p-5 from-pink-500 to-yellow-500 text-white shadow-lg'>
                <h1 className="text-3xl">{event.name} - Reports</h1>
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
            <div className='grid grid-cols-1 md:grid-cols-4 mt-5 gap-5'>
                {Object.keys(ticketTypeAndTheirRevenue).map((ticketType) => (
                    <div className='p-3 bg-white rounded-xl  shadow border'>
                        <h1 className='font-semibold text-lg'>{ticketType}</h1>
                        <div className='flex flex-col gap-1 mt-2 font-semibold'>
                            <span className='text-sm text-gray-600 flex justify-between items-center'>
                                Ticket Sold{" "}
                            </span>
                            <span className='text-sm text-gray-600 flex justify-between items-center'>
                                Revenue{""}
                                <b>${ticketTypeAndTheirRevenue[ticketType].revenue}</b>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-5 bg-white rounded-xl shadow-md p-5 flex justify-between'>
                <h1 className='text-3xl font-semibold'>合計収支</h1>
                <h1 className='text-3xl font-semibold'>${totalRevenue}</h1>
            </div>
        </div>
    );
}
export default EventReportsPage