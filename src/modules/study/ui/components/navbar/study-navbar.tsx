"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const navItems = [
    {
        title: "Pomodoro",
        link: "/study/pomodoro",
    },
    {
        title: "Analytics",
        link: "/study/analytics",
    },
];
const StudyNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/90 flex justify-center p-3 gap-x-7 my-4">
            {navItems.map((item) => (
                <div
                    key={item.title}
                    className={
                        pathname === item.link
                            ? "text-blue-500 scale-110 underline transform transition duration-300"
                            : ""
                    }
                >
                    <Link href={item.link}>
                        <span className="text-2xl font-extrabold">
                            {item.title}
                        </span>
                    </Link>
                </div>
            ))}
        </nav>
    );
};

export default StudyNavbar;
