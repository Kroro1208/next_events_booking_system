import PageTitle from '@/src/components/PageTitle'
import React from 'react'
import EventModel from '@/src/models/event-model'
import EventsTableForReports from './_components/reports-for-events';
import { connectDB } from '@/src/config/dbConfig';

connectDB();

async function ReportsPage() {
    const events = await EventModel.find({});
    return (
        <div>
            <PageTitle title="Reports" />
            <EventsTableForReports events={JSON.parse(JSON.stringify(events))} />
        </div>
    )
}

export default ReportsPage