"use client";

import { useDrawer } from "@/lib/context/navcontext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { hidden } = useDrawer();

    return (
        <div className="flex flex-row h-screen w-screen">
            <div style={{ width: hidden ? "5vw" : "12.5vw"}}>
                aca un nav de recursos
            </div>
            <div className="flex flex-grow m-[4px]">
                {children}
            </div>
        </div>
    );
};