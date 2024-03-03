'use client'
import { BookingType } from '@/src/interfaces/events'
import { Button } from '@nextui-org/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function CancelBookingButton({ booking }: { booking: BookingType }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const cancelBooking = async () => {
        try {
            setLoading(true);
            await axios.put(`/api/bookings/${booking._id}`, {
                status: 'cancelled'
            });
            toast.success('イベントをキャンセルしました');
            router.refresh();
        } catch (error: any) {
            toast.error('キャンセルできませんでした');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                className='text-gray-800 bg-yellow-500 hover:bg-yellow-300 hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out'
                isLoading={loading}
                onClick={cancelBooking}
            >イベントキャンセル</Button>
        </div>
    )
}

export default CancelBookingButton