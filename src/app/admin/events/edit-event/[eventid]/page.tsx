import PageTitle from '@/src/components/PageTitle'
import React from 'react'
import EventForm from '../../_cpmponents/event-form'
import EventModel from '@/src/models/event-model'
import { connectDB } from '@/src/config/dbConfig'
connectDB();

interface Props {
    params: {
        eventid: string
    }
}


async function EditEventsPage({ params }: Props) {
    const eventid = params.eventid;
    const event = await EventModel.findById(eventid)

    return (
        <div>
            <PageTitle title="Edit Event" />
            <div className='p-5 mt-5'>
                <EventForm initialData={JSON.parse(JSON.stringify(event))} type="edit" />
            </div>
        </div>
    )
}

export default EditEventsPage