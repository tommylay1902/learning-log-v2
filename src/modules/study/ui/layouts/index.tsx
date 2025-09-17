interface StudyLayoutProps {
    children: React.ReactNode;
}

import React from "react";
import StudyNavbar from "../components/navbar/study-navbar";

const StudyLayout = ({ children }: StudyLayoutProps) => {
    return (
        <div className="w-full h-full">
            {children}
            <StudyNavbar />
        </div>
    );
};

export default StudyLayout;
