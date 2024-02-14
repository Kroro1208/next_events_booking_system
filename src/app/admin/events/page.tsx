import PageTitle from '@/src/components/PageTitle';
import { EventType } from '@/src/interfaces/events';
import EventModel from '@/src/models/event-model';
import { Link } from '@nextui-org/react';
import React from 'react';
import EventsTable from './_cpmponents/events-table';
import { connectDB } from '@/src/config/dbConfig';
connectDB();



async function EventsPage() {
    const events: EventType[] = (await EventModel.find().sort({ createdAt: -1 })) as any;
    // createdAt: -1 は、MongoDBでのデータソート時の指定方法の一つで、データを降順（新しいものから古いものへ）でソートすること
    return (
        <div>
            <div className='flex justify-between'>
                <PageTitle title="Events" />
                <Link href="/admin/events/new-event"
                    className="bg-gradient-to-tr rounded-3xl px-5 py-2 from-pink-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                    {/* className='bg-primary text-white px-5 py-2 rounded-3xl' */}
                    <i className="ri-flag-line pr-2"></i>Create New Event</Link>
            </div>

            <EventsTable events={JSON.parse(JSON.stringify(events))} />
            {/* JSON.parse(JSON.stringify(events)) は、events オブジェクト(DBから取得したデータ)のディープコピーを作成。
            JSON.stringify() はオブジェクトをJSON形式の文字列に変換し、JSON.parse() はその文字列を再びオブジェクトに変換します。
            この方法で、元のオブジェクトとは独立した新しいオブジェクトを生成。
            これは特にネストされたオブジェクトや配列を含む複雑なオブジェクトをコピーする */}

        </div>
    )
}

export default EventsPage