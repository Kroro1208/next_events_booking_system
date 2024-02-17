'use client';
import { EventType } from '@/src/interfaces/events';
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

interface TicketSelectionProps {
    event: EventType;
}

function TicketSelection({ event }: TicketSelectionProps) {
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedTicketType, setSelectedTicketType] = useState(event.ticketTypes[0].name);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const ticketType = event.ticketTypes.find(
            (ticketType) => ticketType.name === selectedTicketType
        );

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        }

    }, [ticketCount, selectedTicketType])
    return (
        <div className='mt-7'>
            <div>
                <h1 className='text-xl font-semibold text-gray-700'>チケットの種類を選んでください</h1>
                <div className="grid grid-cols-4 gap-5 mt-2">
                    {event.ticketTypes.map((ticketType) => (
                        <div key={ticketType.name}
                            className={`${selectedTicketType === ticketType.name ? 'border-indigo-600' : "border-gray-200"} bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-lg divide-y divide-gray-200 hover:-translate-y-1.5 transition duration-300 ease-in-out cursor-pointer`}
                            onClick={() => setSelectedTicketType(ticketType.name)}
                        >
                            <h1 className='font-semibold'>{ticketType.name}</h1>
                            <h1 className='text-gray-600'>{ticketType.price}円</h1>
                            <h1 className='text-gray-600'>残り{ticketType.limit}枚</h1>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className='mt-7'>
                    <h1 className='text-xl font-semibold text-gray-700'>チケット枚数を選択してください</h1>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {[...Array(10)].map((_, index) => (
                            <div className={`${ticketCount === index + 1 ? 'border-indigo-600' : "border-gray-200"} bg-gray-100 border border-gray-300 h-12 w-14 rounded flex justify-center items-center hover:-translate-y-1.5 transition duration-300 ease-in-out cursor-pointer`}
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
                    <button className="relative rounded-2xl inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0">
                            購入する
                        </span>
                    </button>
                    {/* <Button className='bg-gradient-to-tr rounded-xl p-5 from-pink-500 to-yellow-500 text-white shadow-lg hover:-translate-y-1.5 transition duration-500 ease-in-out cursor-pointer'></Button> */}
                </div>
            </div>
        </div>
    )
}

export default TicketSelection