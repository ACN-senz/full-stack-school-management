import prisma from "@/lib/prisma";
type Event = {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  classId: number | null;
  class: {
    id: number;
    name: string;
  } | null;
};


const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    include: {
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return data.map((event: Event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-plSky even:border-t-plPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
      {event.class && (
        <div className="mt-2 text-xs text-gray-500">
          Class: {event.class.name}
        </div>
      )}
    </div>
  ));
};

export default EventList;
