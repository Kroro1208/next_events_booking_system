'use client';
import { EventType } from '@/src/interfaces/events';
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaymentModal from './payment-modal';

const stripePromise = loadStripe('pk_test_51ORmOaCnXs4jpJa18hC08mHfzMBD2fpZ0y71v644J6P95jXwNKOESA5D43yX4Lvplfc4LzKzUwttqpsk1XVXEwXD00mW0bAs34');

interface TicketSelectionProps {
    event: EventType;
    eventBookings: any;
}

function TicketSelection({ event, eventBookings }: TicketSelectionProps) {
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedTicketType, setSelectedTicketType] = useState(event.ticketTypes[0].name);
    const [totalAmount, setTotalAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const ticketType = event.ticketTypes.find(
            (ticketType) => ticketType.name === selectedTicketType
        );

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        }

    }, [ticketCount, selectedTicketType]);

    const limits: any = {

    }

    event.ticketTypes.forEach((ticketType) => {
        let bookedTickets = 0
        eventBookings.forEach((booking: any) => {
            if (booking.ticketType === ticketType.name) {
                bookedTickets += booking.ticketsCount
            }
        });

        limits[ticketType.name] = ticketType.limit - bookedTickets
    });

    // フロントエンド側の処理
    const getClientSecret = async () => {
        try {
            // チケットの残り枚数に達しているかチェック

            if (limits[selectedTicketType] === 0) {
                toast.error('チケットは売り切れました');
                return;
            }
            if (limits[selectedTicketType] < ticketCount) {
                toast.error(`残り${limits[selectedTicketType]}枚です`);
                return;
            }

            setLoading(true);
            console.log('Sending request to /api/stripe/client-secret');
            const response = await axios.post("/api/stripe/client-secret", {
                amount: totalAmount
            });
            setClientSecret(response.data.clientSecret);
            console.log('clientSecret set to:', response.data.clientSecret);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showPaymentModal) {
            getClientSecret();
        }
    }, [showPaymentModal]);


    return (
        <div className='mt-7'>
            <div>
                <h1 className='text-xl font-semibold text-gray-700'>チケットの種類を選んでください</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-2">
                    {event.ticketTypes.map((ticketType) => (
                        <div key={ticketType.name}
                            className={`${selectedTicketType === ticketType.name ? 'border-indigo-600' : "border-gray-200"} bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-lg divide-y divide-gray-200 hover:-translate-y-1.5 transition duration-300 ease-in-out cursor-pointer`}
                            onClick={() => setSelectedTicketType(ticketType.name)}
                        >
                            <h1 className='font-semibold'>{ticketType.name}</h1>
                            <h1 className='text-gray-600 text-sm flex justify-between'>{ticketType.price}円<span>残り{limits[ticketType.name]}枚</span></h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-7'>
                <h1 className='text-xl font-semibold text-gray-700'>チケット枚数を選択してください</h1>
                <div className="flex flex-wrap gap-1 mt-2">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className={`${ticketCount === index + 1 ? 'border-indigo-600' : "border-gray-200"} bg-gray-100 border border-gray-300 h-12 w-14 rounded flex justify-center items-center hover:-translate-y-1.5 transition duration-300 ease-in-out cursor-pointer`}
                            onClick={() => setTicketCount(index + 1)}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-7 bg-gray-100 border border-gray-200 p-3 rounded flex justify-between items-center'>
                <h1 className='font-semibold text-2xl uppercase text-gray-500'>
                    合計: <b className='text-primary'>{totalAmount} 円</b>
                </h1>
                <Button onClick={() =>
                    setShowPaymentModal(true)}
                    isLoading={loading}
                    className="relative rounded-2xl inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0">
                        購入する
                    </span>
                </Button>
                {/* <Button className='bg-gradient-to-tr rounded-xl p-5 from-pink-500 to-yellow-500 text-white shadow-lg hover:-translate-y-1.5 transition duration-500 ease-in-out cursor-pointer'></Button> */}
            </div>

            {showPaymentModal && clientSecret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret
                }}>
                    <PaymentModal
                        showPaymentModal={showPaymentModal}
                        setShowPaymentModal={setShowPaymentModal}
                        event={event}
                        ticketType={selectedTicketType}
                        ticketCount={ticketCount}
                        totalAmount={totalAmount}
                    />
                </Elements>
            )}
        </div>
    );
}

export default TicketSelection;