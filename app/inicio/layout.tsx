"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="flex flex-grow m-[4px]">
                {children}
            </div>
        </div>
    );
};