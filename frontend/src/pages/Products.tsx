import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from "@heroicons/react/24/outline";

const PRODUCTS = [
    { id: 1, name: "Caramel Macchiato", category: "Coffee", price: 5.50, stock: 156, status: "In Stock" },
    { id: 2, name: "Cappuccino", category: "Coffee", price: 4.50, stock: 89, status: "In Stock" },
    { id: 3, name: "Iced Latte", category: "Coffee", price: 4.75, stock: 45, status: "In Stock" },
    { id: 4, name: "Croissant", category: "Bakery", price: 3.25, stock: 12, status: "Low Stock" },
    { id: 5, name: "Blueberry Muffin", category: "Bakery", price: 3.50, stock: 5, status: "Low Stock" },
    { id: 6, name: "Green Tea", category: "Beverages", price: 3.00, stock: 240, status: "In Stock" },
    { id: 7, name: "Lemonade", category: "Beverages", price: 3.75, stock: 0, status: "Out of Stock" },
    { id: 8, name: "Chocolate Cookie", category: "Snacks", price: 2.50, stock: 67, status: "In Stock" },
    { id: 9, name: "Cheesecake Slice", category: "Bakery", price: 6.00, stock: 8, status: "Low Stock" },
];

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
                    <p className="text-sm text-foreground-muted">Manage your inventory, pricing, and stock levels.</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover active:scale-[0.98]">
                    <PlusIcon className="h-5 w-5" />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm sm:flex-row">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-hover">
                    <FunnelIcon className="h-5 w-5 text-foreground-muted" />
                    Filters
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-foreground-muted">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product Name</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {PRODUCTS.map((product) => (
                                <tr key={product.id} className="group transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-foreground">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-foreground">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${product.status === "In Stock"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : product.status === "Low Stock"
                                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                                : "bg-red-50 text-red-700 border-red-200"
                                            }`}>
                                            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${product.status === "In Stock" ? "bg-green-500" : product.status === "Low Stock" ? "bg-amber-500" : "bg-red-500"
                                                }`}></span>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="rounded-lg p-1.5 text-foreground-muted hover:bg-slate-100 hover:text-primary">
                                                <PencilSquareIcon className="h-4 w-4" />
                                            </button>
                                            <button className="rounded-lg p-1.5 text-foreground-muted hover:bg-red-50 hover:text-destructive">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="flex items-center justify-between border-t border-border px-6 py-4">
                    <span className="text-sm text-foreground-muted">Showing 1 to 9 of 9 entries</span>
                    <div className="flex gap-2">
                        <button className="rounded-md border border-border px-3 py-1 text-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="rounded-md border border-border px-3 py-1 text-sm disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
