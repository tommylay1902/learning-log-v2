import AuthButton from "@/modules/auth/ui/components/auth-button";
import Image from "next/image";
import Link from "next/link";
const navItems = [
    {
        title: "Learning Log",
        link: "/learning",
        // isAuth?
    },
    {
        title: "Study",
        link: "/study",
    },
];
const RootNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/90 flex justify-between p-3">
            <div className="flex justify-center items-center justify-items-center gap-x-7">
                <Link href="/">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={40}
                            height={40}
                            className="invert inline"
                        />
                        <p className="text-white font-bold">Exchange</p>
                    </div>
                </Link>
                {navItems.map((item) => (
                    <div key={item.link}>
                        <Link href={item.link}>{item.title}</Link>
                    </div>
                ))}
            </div>

            <AuthButton />
        </nav>
    );
};

export default RootNavbar;
