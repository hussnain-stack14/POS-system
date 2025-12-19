import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <main className="flex-1 ml-64 min-w-0">
                {/* Main content wrapper with simple fade-in for page transitions */}
                <div className="p-8 animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
