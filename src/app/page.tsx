import { handleNewUserRegistration, getMongoDBUserIDofLoggedInUser } from "../actions/users";
import { connectDB } from "../config/dbConfig";
import EventModel from "../models/event-model";
import { EventType } from "../interfaces/events";
import Link from "next/link";
import Filters from "../components/Filters";

connectDB();

interface Props {
  searchParams: {
    name: string;
    date: string;
  };
}

export default async function Home({ searchParams }: Props) {
  await handleNewUserRegistration();
  await getMongoDBUserIDofLoggedInUser();
  let filters = {};
  if (searchParams.name) {
    filters = {
      name: {
        $regex: searchParams.name,
        $options: "i" // 大文字小文字を区別しないオプションi
      },
    };
  }

  if (searchParams.date) {
    filters = {
      ...filters,
      date: searchParams.date
    };
  }

  console.log(searchParams);
  const events: EventType[] = await EventModel.find(filters).sort({ createdAt: -1 }) as any;
  return (
    <div>
      <Filters />
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div key={event._id}
            className="grid grid-cols-1 md:grid-cols-3 bg-sky-100 rounded-xl md:gap-10 p-5 shadow-xl"
          >
            <div className="col-span-1">
              <img src={event.images[0]} //<Image />コンポーネントだと画像の最適化が自動で行われて画質が悪くなったので通常のimgタグにした
                alt="picture of the event"
                height={130} width={250}
                className="w-full object-contain rounded-xl"
              />
            </div>
            <div className="col-span-2 flex flex-col mt-4 gap-5 justify-between">
              <h1 className="font-semibold text-gray-700 text-3xl">
                {event.name}
              </h1>
              <p className="text-gray-500 w-full line-clamp-3">
                {event.description}
              </p>
              <div className="flex justify-between item-center p-3">
                <div className="text-sm">
                  <h1>
                    <i className="ri-map-pin-line pr-3"></i>
                    {event.location}
                  </h1>
                  <h1>
                    <i className="ri-calendar-schedule-line pr-3"></i>
                    {event.date} at{""} {event.time}
                  </h1>
                </div>
                <Link href={`/book-event/${event._id}`}>
                  <div className="bg-gradient-to-tr rounded-3xl px-5 py-2 from-pink-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out flex justify-center items-center cursor-pointer">
                    Eventの詳細を見る
                  </div>
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <div className="w-full mt-100 flex justify-center">
          <h1 className="text-sm">
            一致するイベントはありません
          </h1>
        </div>
      )}
    </div>
  );
}
