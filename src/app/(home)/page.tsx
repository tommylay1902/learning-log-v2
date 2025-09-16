import HomeView from "@/modules/home/ui/views/home-view";
import { HydrateClient } from "@/trpc/server";

import * as React from "react";

const Home = () => {
    return (
        <HydrateClient>
            <HomeView />
        </HydrateClient>
    );
};

export default Home;
