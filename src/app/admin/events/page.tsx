import PageTitle from '@/src/components/PageTitle';
import { Link } from '@nextui-org/react';
import React from 'react';


function EventsPage() {
    return (
        <div className='flex justify-between'>
            <PageTitle title="Events" />
            <Link href="/admin/events/new-event"
                className="bg-gradient-to-tr rounded-3xl px-5 py-2 from-pink-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                {/* className='bg-primary text-white px-5 py-2 rounded-3xl' */}
                <i className="ri-flag-line pr-2"></i>Create New Event</Link>
        </div>
    )
}

export default EventsPage