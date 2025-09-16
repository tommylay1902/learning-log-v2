import LearningView from "@/modules/learning-log/ui/views/learning-view";
import { HydrateClient, trpc } from "@/trpc/server";

const Learning = () => {
    void trpc.learningLogs.getByManyByUser.prefetch();
    void trpc.learningLogs.getLearningSegments.prefetch();
    void trpc.categories.getManyByUser.prefetch();
    return (
        <HydrateClient>
            <LearningView />
        </HydrateClient>
    );
};

export default Learning;
