import { SearchInput } from "@/components/search-input";
import { Navbar } from "./(dashboard)/_components/navbar";
import { Button } from "@/components/ui/button";
import { Categories } from "./(dashboard)/(routes)/search/_components/categories";
import { CoursesList } from "@/components/courses-list";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Logo } from "./(dashboard)/_components/logo";
import { getAllCourses } from "@/actions/get-all-courses";
import { CoursesListHome } from "@/components/courses-list-home";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
  };

export default async function Home({
    searchParams
}: SearchPageProps) {

    // const { userId } = await auth();
    // if(!userId) {
    //     return redirect("/");
    //   }

    const categories = await db.category.findMany({
              orderBy: {
                  name: "asc",
              },
          });
      
        const resolvedSearchParams = await searchParams;
    
        const courses = await getAllCourses({
            ...resolvedSearchParams,
        }); 
    return ( 
        
        <div>
            <div className="h-[75px] fixed inset-y-0 w-full z-50">    
                        <Navbar />
            </div>
            <div className="relative bg-sky-600 py-24 px-4 text-center mt-24 mx-6">
            <div className="max-w-3xl mx-auto p-6 space-y-4">
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
                <a href="#courses">
                <Button className="bg-white dark:bg-gray-800 text-sky-600 rounded-full hover:bg-gray-200 mt-5">Explore Courses</Button>
                </a>
            </div>
        </div>
        <div className="p-6 space-y-4">
            <div>
            <h1 className="text-3xl font-semibold text-center text-sky-600 py-5">Categories</h1>
            <Categories
                items={categories}
            />
            </div>
            <div>
            <h1 className="text-3xl font-semibold text-center text-sky-600 py-5" id="courses">Our Courses</h1>
            <CoursesListHome items={courses} />
            </div>
        </div>
        </div>
     );
}