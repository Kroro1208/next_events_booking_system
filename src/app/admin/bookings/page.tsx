import PageTitle from '@/src/components/PageTitle'
import { connectDB } from '@/src/config/dbConfig'
import { BookingType } from '@/src/interfaces/events'
import BookingModel from '@/src/models/booking-models'
import React from 'react'
import CancelBookingButton from './_components/cancel-booking-button'
import dayjs from "dayjs";

connectDB();

async function BookingsPage() {
    const bookedEvents: BookingType[] = (await BookingModel.find({})
        .populate("event")
        .populate('user')) as any;
    console.log(bookedEvents);

    const getProperty = ({ key, value }: { key: string; value: any; }) => {
        return (
            <div>
                <h1 className='font-semibold'>{key}</h1>
                <h1 className="text-gray-700 text-sm mt-2">{value}</h1>
            </div>
        )
    }

    return (
        <div>
            <PageTitle title="全てのイベント" />
            <div className='flex flex-col gap-5 mt-5'>
                {bookedEvents.map((booking) => {
                    return (
                        <div key={booking._id} className='border border-gray-300 p-3 bg-gray-100 flex flex-col gap-5 rounded-xl'>
                            <div className='flex justify-between items-center p-5 text-white lg:w-full bg-gradient-to-tr rounded-xl from-gray-800 to-slate-500 shadow-lg'>
                                <div>
                                    <h1 className='text-2xl font-semibold mb-3'>{booking.event.name}</h1>
                                    <div className='flex flex-col gap-3'>
                                        <div className="text-sm flex gap-10 ">
                                            <h1>
                                                <i className="ri-map-pin-line pr-3"></i>
                                                {booking.event.location}
                                            </h1>
                                            <h1>
                                                <i className="ri-calendar-schedule-line pr-3"></i>
                                                {booking.event.date} at{""} {booking.event.time}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                {booking.status !== "cancelled" &&
                                    <CancelBookingButton booking={JSON.parse(JSON.stringify(booking))} />}
                            </div>

                            <div className='grid grid-cols-3 gap-5 p-5'>
                                {getProperty({ key: "予約ID", value: booking._id })}
                                {getProperty({ key: "ユーザーID", value: booking.user._id })}
                                {getProperty({ key: "ユーザー名", value: booking.user.username })}
                                {getProperty({ key: "チケットの種類", value: booking.ticketType })}
                                {getProperty({ key: "購入枚数", value: `${booking.ticketCount} 枚` })}
                                {getProperty({ key: "合計金額", value: `${booking.totalAmount} 円` })}
                                {getProperty({ key: "お支払いID", value: booking.paymentId })}
                                {getProperty({ key: "予約日", value: dayjs(booking.createdAt).format('YYYY/MM/DD hh:mm A') })}
                                {getProperty({ key: "ステータス", value: booking.status || "予約済み" })}

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default BookingsPage