'use client';
import { EventType } from '@/src/interfaces/events';
import React, { useState } from 'react';

interface TicketSelectionProps {
    event: EventType;
}

function TicketSelection({ event }: TicketSelectionProps) {
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedTicketType, setSelectedTicketType] = useState(event.ticketTypes[0].name);
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
            </div>
        </div>
    )
}

export default TicketSelection