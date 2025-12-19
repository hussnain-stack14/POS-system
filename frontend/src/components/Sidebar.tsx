import { Link, useLocation } from "react-router-dom";
import {
    Squares2X2Icon,
    ShoppingCartIcon,
    CubeIcon,
    UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/", icon: Squares2X2Icon },
    { name: "POS Terminal", href: "/pos", icon: ShoppingCartIcon },
    { name: "Products", href: "/products", icon: CubeIcon },
    { name: "Customers", href: "/customers", icon: UsersIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
    { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface shadow-sm transition-transform">
            <div className="flex h-full flex-col justify-between">
                <div className="px-4 py-6">
                    <div className="mb-10 flex items-center gap-3 px-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
                            <span className="text-xl font-bold">P</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">POS Pro</span>
                    </div>

                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                    group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                            : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                                        }
                  `}
                                >
                                    <Icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : "text-foreground-muted group-hover:text-foreground"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-border">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-red-50">
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
