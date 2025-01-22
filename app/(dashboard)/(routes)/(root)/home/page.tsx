import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "../_components/info-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/search-input";
import { Categories } from "../../search/_components/categories";
import { getCourses } from "@/actions/get-courses";
import { db } from "@/lib/db";

interface SearchPageProps {
  searchParams: {
      title: string;
      categoryId: string;
  }
};

export default async function Dashboard({
  searchParams
}: SearchPageProps) {
  
  const { userId } = await auth();

  if(!userId) {
    return redirect("/home");
  }

  const categories = await db.category.findMany({
          orderBy: {
              name: "asc",
          },
      });
  
    const resolvedSearchParams = await searchParams;

    const courses = await getCourses({
        userId,
        ...resolvedSearchParams,
    }); 

  // const {
  //   completedCourses,
  //   coursesInProgress
  // } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      {/* <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
      </div> */}
      <div className="relative bg-indigo-600 py-24 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-white text-4xl font-bold mb-4">
                Find the Best Courses for You
                </h1>
                <p className="text-gray-200 dark:text-gray-400 mb-8">
                Discover, Learn, and Upskill with our wide range of courses
                </p>

                <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
                {/* <Input
                    type="text"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Courses"
                    className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button> */}
                <div className="flex-grow">
                <SearchInput />
                </div>
                </form>
                <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
            </div>
        </div>
        <div className="p-6 space-y-4">
            <Categories
                items={categories}
            />
            <CoursesList items={courses} />
        </div>
    </div>
  );
}
