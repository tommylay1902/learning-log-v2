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
            <div className="flex min-h-screen pt-[4rem] overflow-clip">
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
};

export default ExchangeRootLayout;
