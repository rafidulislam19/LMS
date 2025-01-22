import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { CourseHomeSidebarItem } from "./course-home-sidebar-item";

interface CourseHomeSidebarProps {
    course: Course & {
        chapters: Chapter[]
    };
    // progressCount: number;
}
export const CourseHomeSidebar = async ({
    course,
    // progressCount,
}: CourseHomeSidebarProps) => {

    // const { userId } = await auth();

    // if(!userId) {
    //     return redirect("/home");
    // }

    // const purchase = await db.purchase.findUnique({
    //     where: {
    //         userId_courseId: {
    //             userId,
    //             courseId: course.id,
    //         }
    //     }
    // });

    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-6 flex flex-col border-b">
                <h1 className="font-semibold text-lg">
                    {course.title}
                </h1>
            
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseHomeSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        // isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree}
                    />
                ))}
            </div>
        </div>
     );
}