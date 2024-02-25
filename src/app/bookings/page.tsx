import { getMongoDBUserIDofLoggedInUser } from '@/src/actions/users'
import { connectDB } from '@/src/config/dbConfig'
import { BookingType } from '@/src/interfaces/events'
import BookingModel from '@/src/models/booking-models'
import React from 'react'

connectDB();

async function BookingsPage() {
    const mongoUserId = await getMongoDBUserIDofLoggedInUser();
    const bookedEvents: BookingType[] = (await BookingModel.find({ user: mongoUserId }).populate(
        "event")) as any;
    console.log(bookedEvents);
    return (
        <div className='flex flex-col gap-5'>
            {bookedEvents.map((booking) => {
                return (
                    <div key={booking._id}>
                        <div className='bg-gray-700 p-3 text-white'>
                            <h1 className='text-2xl font-semibold'>
                                {booking.event.name}
                            </h1>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default BookingsPage