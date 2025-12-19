import { CurrencyDollarIcon, ShoppingBagIcon, UserGroupIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import StatCard from "../components/StatCard";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="mt-2 text-foreground-muted">Welcome back! Here is what's happening with your store today.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    change="+20.1%"
                    trend="up"
                    icon={CurrencyDollarIcon}
                />
                <StatCard
                    title="Total Sales"
                    value="+2,350"
                    change="+18.1%"
                    trend="up"
                    icon={ShoppingBagIcon}
                />
                <StatCard
                    title="Active Customers"
                    value="+573"
                    change="+19%"
                    trend="up"
                    icon={UserGroupIcon}
                />
                <StatCard
                    title="Low Stock Alert"
                    value="12"
                    change="-4%"
                    trend="down"
                    icon={ExclamationTriangleIcon}
                />
            </div>

            <div className="rounded-xl border border-border bg-surface shadow-sm">
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Recent Sales</h2>
                </div>
                <div className="p-6">
                    <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                        <span className="text-slate-500">Sales Chart / Data Table Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
