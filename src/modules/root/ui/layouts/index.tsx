import RootNavbar from "../components/root-navbar";

interface ExchangeRootLayoutProps {
    children: React.ReactNode;
}

const ExchangeRootLayout: React.FC<ExchangeRootLayoutProps> = ({
    children,
}) => {
    return (
        <div className="w-full">
            <RootNavbar />
            <div className="flex min-h-screen pt-[4rem]">
                <main className="flex-1 overflow-y-scroll">{children}</main>
            </div>
        </div>
    );
};

export default ExchangeRootLayout;
