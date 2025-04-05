import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const ParentPage = async () => {
  const { userId } = auth();
  // const currentUserId = userId;
  
  // const students = await prisma.student.findMany({
  //   where: {
  //     parentId: currentUserId!,
  //   },
  // });

  return (
    <div className="flex gap-4 w-full h-screen">
        <div className="leftside flex-1 h-full">
          <BigCalendarContainer type="teacherId" id={userId!}/>
     
            {/* {students.map((stud,index)=>{
              console.log(stud.parentId)
              return (
                <div className="container" key={index} >
                  <BigCalendarContainer type="classId" id={stud.parentId}/>
                </div>
              )
            })} */}
        </div>
        <div className="rightside w-[30%] ">
           <Announcements/>
        </div>
    </div>
  );
};

export default ParentPage;