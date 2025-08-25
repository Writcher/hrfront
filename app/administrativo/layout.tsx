"use client";

import Nav from "@/components/navegacion/nav";
import NavLinksAdministrativo from "@/components/administrativo/navegacion/navlinks";
import { useDrawer } from "@/lib/context/navcontext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { hidden } = useDrawer();

    return (
        <div className="flex flex-row h-screen w-screen">
            <div style={{ width: hidden ? "5vw" : "12.5vw"}}>
                <Nav links={NavLinksAdministrativo}/>
            </div>
            <div className="flex flex-grow m-[4px]">
                {children}
            </div>
        </div>
    );
};