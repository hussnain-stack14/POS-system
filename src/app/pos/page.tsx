"use client";

import { useState } from "react";
import {
    MagnifyingGlassIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
    BanknotesIcon
} from "@heroicons/react/24/outline";

// Mock Data
const CATEGORIES = ["All", "Coffee", "Bakery", "Beverages", "Snacks"];

const PRODUCTS = [
    { id: 1, name: "Caramel Macchiato", price: 5.50, category: "Coffee", color: "bg-amber-100 text-amber-600" },
    { id: 2, name: "Cappuccino", price: 4.50, category: "Coffee", color: "bg-orange-100 text-orange-600" },
    { id: 3, name: "Iced Latte", price: 4.75, category: "Coffee", color: "bg-amber-50 text-amber-700" },
    { id: 4, name: "Croissant", price: 3.25, category: "Bakery", color: "bg-yellow-100 text-yellow-600" },
    { id: 5, name: "Blueberry Muffin", price: 3.50, category: "Bakery", color: "bg-indigo-100 text-indigo-600" },
    { id: 6, name: "Green Tea", price: 3.00, category: "Beverages", color: "bg-green-100 text-green-600" },
    { id: 7, name: "Lemonade", price: 3.75, category: "Beverages", color: "bg-yellow-50 text-yellow-600" },
    { id: 8, name: "Chocolate Cookie", price: 2.50, category: "Snacks", color: "bg-stone-200 text-stone-600" },
    { id: 9, name: "Cheesecake Slice", price: 6.00, category: "Bakery", color: "bg-rose-100 text-rose-600" },
];

export default function POSTerminal() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (product: typeof PRODUCTS[0]) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: Math.max(0, item.qty + delta) };
                }
                return item;
            }).filter((item) => item.qty > 0)
        );
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
        <div className="flex h-[calc(100vh-6rem)] gap-6">
            {/* Product Section */}
            <div className="flex flex-1 flex-col gap-6">
                {/* Header / Filter */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center">
                    <div className="flex flex-1 gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === cat
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-surface-hover text-foreground-muted hover:bg-slate-200 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
                            >
                                <div className={`h-32 w-full ${product.color} flex items-center justify-center`}>
                                    <span className="text-4xl font-black opacity-20">{product.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                                    <p className="mt-auto pt-2 text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Section */}
            <div className="flex w-96 flex-col rounded-xl border border-border bg-surface shadow-md">
                <div className="border-b border-border p-4">
                    <h2 className="text-lg font-bold text-foreground">Current Order</h2>
                    <p className="text-sm text-foreground-muted">Order #0042</p>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-foreground-muted">
                            <BanknotesIcon className="mb-4 h-12 w-12 opacity-20" />
                            <p>No items in cart</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                                        x{item.qty}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                                        <p className="text-sm text-foreground-muted">${(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="rounded-full border border-border p-1 hover:bg-slate-100"
                                        >
                                            <MinusIcon className="h-4 w-4 text-foreground" />
                                        </button>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="rounded-full border border-border p-1 hover:bg-slate-100"
                                        >
                                            <PlusIcon className="h-4 w-4 text-foreground" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Totals */}
                <div className="border-t border-border bg-slate-50/50 p-4">
                    <div className="space-y-2 text-sm text-foreground">
                        <div className="flex justify-between">
                            <span className="text-foreground-muted">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-foreground-muted">Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="mt-4 w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover active:scale-[0.98]"
                        disabled={cart.length === 0}
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}
