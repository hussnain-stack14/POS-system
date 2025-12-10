import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ElementType;
}

export default function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
    return (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground-muted">{title}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                {trend === 'up' ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-success" />
                ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4 text-destructive" />
                )}
                <span className={trend === 'up' ? 'text-success font-medium' : 'text-destructive font-medium'}>
                    {change}
                </span>
                <span className="ml-2 text-foreground-muted">vs last month</span>
            </div>
        </div>
    );
}
