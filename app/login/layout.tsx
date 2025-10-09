"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row h-screen w-screen">
            {children}
        </div>
    );
};