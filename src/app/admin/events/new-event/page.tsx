import PageTitle from '@/src/components/PageTitle'
import React from 'react'
import EventForm from '../_cpmponents/event-form'

function NewEventsPage() {
    return (
        <div className='mt-5 bg-white p-5'>
            <PageTitle title="New Event" />
            <div className='mt-5'>
                <EventForm />
            </div>
        </div>
    )
}

export default NewEventsPage