import StudyLayout from "@/modules/study/ui/layouts";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <StudyLayout>{children}</StudyLayout>;
}
