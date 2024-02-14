'use client'
import React from "react";
import { EventType } from "@/src/interfaces/events";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";


function EventsTable({ events }: { events: EventType[] }) {

    const router = useRouter();


    return (
        <div className="mt-5">
            <Table aria-label="Example static collection table" className="shadow-sm">
                <TableHeader className="text-primary font-semibold">
                    {["イベント名", "主催者", "開催日", "開催時間", "開催場所", "削除 / 編集"].map((column) => (
                        <TableColumn className="bg-gradient-to-tr from-gray-800 to-gray-400 text-white" key={column}>{column}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event._id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.organizer}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.time}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>
                                <div className="flex gap-5">
                                    <Button isIconOnly className="bg-red-300 hover:bg-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                                        <i className="ri-delete-bin-6-line"></i>
                                    </Button>
                                    <Button isIconOnly onClick={() => router.push(`/admin/events/edit-event/${event._id}`)} className="bg-blue-300 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                                        <i className="ri-edit-2-line"></i>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventsTable;