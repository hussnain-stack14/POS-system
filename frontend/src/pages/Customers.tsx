import { useState, useEffect } from "react";
import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    PhoneIcon,
    EllipsisHorizontalIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    points: number;
    totalSpent: number;
    lastVisit: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/customers');
            const data = await res.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ name: "", email: "", phone: "" });
                fetchCustomers();
                alert("Customer added successfully!");
            } else {
                const err = await res.json();
                alert(err.message || "Failed to add customer");
            }
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("Error adding customer");
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
                    <p className="text-sm text-foreground-muted">Manage customer relationships and loyalty points.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover active:scale-[0.98]"
                >
                    <UserPlusIcon className="h-5 w-5" />
                    Add Customer
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl ring-1 ring-black/5">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-foreground">Add New Customer</h2>
                            <button onClick={() => setIsModalOpen(false)} className="rounded-full p-1 text-foreground-muted hover:bg-slate-100">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
                                >
                                    Save Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-foreground-muted">Loading customers...</td>
                                </tr>
                            ) : customers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-foreground-muted">No customers found.</td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer._id} className="group transition-colors hover:bg-slate-50/50">
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
                                            ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 text-foreground-muted">
                                            {new Date(customer.lastVisit).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="rounded-lg p-2 text-foreground-muted hover:bg-slate-100 hover:text-foreground">
                                                <EllipsisHorizontalIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
