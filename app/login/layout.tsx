"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="flex flex-grow">
                {children}
            </div>
        </div>
    );
};