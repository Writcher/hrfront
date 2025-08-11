"use client";

import Nav from "@/components/administrativo/navegacion/nav";
import { useDrawer } from "@/lib/context/navcontext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { hidden } = useDrawer();

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="h-full" style={{ width: hidden ? "4.5vw" : "12.5vw"}}>
                <Nav />
            </div>
            <div className="flex flex-grow">
                {children}
            </div>
        </div>
    );
};