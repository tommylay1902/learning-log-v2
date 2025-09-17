interface StudyLayoutProps {
    children: React.ReactNode;
}

import React from "react";
import StudyNavbar from "../components/study-navbar";

const StudyLayout = ({ children }: StudyLayoutProps) => {
    return (
        <div className="w-full">
            <StudyNavbar />
            <div className="flex min-h-screen pt-[4rem]">
                <main className="flex-1 overflow-y-scroll">{children}</main>
            </div>
        </div>
    );
};

export default StudyLayout;
