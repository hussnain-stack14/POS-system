import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    PhoneIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";

const CUSTOMERS = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "+1 (555) 010-1001", points: 450, totalSpent: 1250.50, lastVisit: "2023-10-25" },
    { id: 2, name: "Bob Smith", email: "bob.smith@test.com", phone: "+1 (555) 012-3344", points: 120, totalSpent: 300.75, lastVisit: "2023-11-01" },
    { id: 3, name: "Carol White", email: "carol.w@domain.org", phone: "+1 (555) 098-7654", points: 890, totalSpent: 2100.00, lastVisit: "2023-10-20" },
    { id: 4, name: "David Brown", email: "david.b@example.net", phone: "+1 (555) 123-4567", points: 50, totalSpent: 85.20, lastVisit: "2023-11-05" },
    { id: 5, name: "Eve Davis", email: "eve.davis@corp.com", phone: "+1 (555) 987-6543", points: 1250, totalSpent: 3400.00, lastVisit: "2023-11-07" },
];

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
                    <p className="text-sm text-foreground-muted">Manage customer relationships and loyalty points.</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover active:scale-[0.98]">
                    <UserPlusIcon className="h-5 w-5" />
                    Add Customer
                </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                <div className="relative max-w-md">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-foreground-muted">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Contact Info</th>
                                <th className="px-6 py-4 font-semibold">Loyalty Points</th>
                                <th className="px-6 py-4 font-semibold">Total Spent</th>
                                <th className="px-6 py-4 font-semibold">Last Visit</th>
                                <th className="px-6 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {CUSTOMERS.map((customer) => (
                                <tr key={customer.id} className="group transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-foreground">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-foreground-muted">
                                            <div className="flex items-center gap-2 text-xs">
                                                <EnvelopeIcon className="h-3 w-3" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <PhoneIcon className="h-3 w-3" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                                            {customer.points} pts
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        ${customer.totalSpent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-foreground-muted">
                                        {customer.lastVisit}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="rounded-lg p-2 text-foreground-muted hover:bg-slate-100 hover:text-foreground">
                                            <EllipsisHorizontalIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
