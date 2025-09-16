import React from "react";
import Project from "./project";
import Resource from "./resource";
import PiechartContainer from "./piechart-container";

const LearningStats = () => {
    // const supabase = createClient();
    // const { data, error } = await supabase
    //   .from("category")
    //   .select(
    //     `
    //     title,
    //     color,
    //     time_spent:learning_log(
    //       time_spent.sum()
    //     )
    //   `,
    //   )
    //   .order("title");
    // console.log(getLastMonday().toISOString());
    // const { data: weeklyLogs, error: weeklyLogErrors } = await supabase
    //   .from("learning_log")
    //   .select()
    //   .gte("created_at", getLastMonday().toISOString());

    // if (weeklyLogErrors) throw new Error();

    // const weeklyHours = weeklyLogs.reduce((acc, log) => {
    //   return acc + (log.time_spent ? log.time_spent : 0);
    // }, 0);

    // if (error) console.error(error);
    // const filteredDate = data?.filter((d) => d.time_spent[0].sum > 0) ?? [];
    return (
        <div className="flex flex-row items-center justify-center space-x-4 mb-2 min-w-screen ">
            <Project />
            <PiechartContainer />
            <Resource />
        </div>
    );
};

export default LearningStats;
