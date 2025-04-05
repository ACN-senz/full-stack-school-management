import prisma from "@/lib/prisma";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

import BigCalendar from "./BigCalender";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  // Log the ID being passed
  console.log("BigCalendarContainer id:", id);

  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  // Log the fetched lessons
  console.log("Fetched lessons:", dataRes);

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  // Log data before adjustment
  console.log("Data before adjustment:", data);

  const schedule = adjustScheduleToCurrentWeek(data);

  // Log data after adjustment
  console.log("Data after adjustment:", schedule);

  return (
    <div className="h-full w-full">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
