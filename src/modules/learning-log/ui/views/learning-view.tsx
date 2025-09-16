import React from "react";
import TimeLineSection from "../sections/timeline-section";
import LearningStatsSection from "../sections/learning-stats-section";

const LearningView = () => {
    return (
        <div>
            <LearningStatsSection />
            <TimeLineSection />
        </div>
    );
};

export default LearningView;
