"use client"

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { Logo } from "@/app/(dashboard)/_components/logo";

export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return ( 
        <>
        { isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage ? (
                <Link href="/home">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2 font-semibold"/>
                    Exit
                </Button>
                </Link>
            ) : isTeacher(userId) ? (
                <Link href="/teacher/courses">
                 <Button size="sm" variant="ghost" className="font-semibold">
                    Teacher Mode
                 </Button>
                </Link>
            ): !userId ? (
                <div>
                <Link href="/sign-up">
                 <Button size="sm" variant="ghost" className="text-white bg-slate-500 mr-3">
                    Sign up
                 </Button>
                </Link>
                <Link href="/sign-in">
                 <Button size="sm" variant="ghost" className="text-white bg-slate-500 mr-3">
                    Login
                 </Button>
                </Link>
                </div>
            ): (
                <Link href="/search">
                 <Button size="sm" variant="ghost" className="text-white bg-slate-500 mr-3">
                    My Courses
                 </Button>
                </Link>
            ) }
            <UserButton
            afterSignOutUrl="/" />
        </div>
        </>
     );
}
