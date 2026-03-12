'use client';

import Nav from '@/components/navegacion/nav';
import NavLinksRRHH from '@/components/rrhh/navegacion/navlinks';
import { useDrawer } from '@/lib/context/navcontext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { hidden } = useDrawer();

    return (
        <div className='flex flex-row h-screen w-screen overflow-hidden'>
            <div
                style={{
                    width: hidden ? '60px' : '200px',
                    minWidth: hidden ? '60px' : '200px'
                }}
            >
                <Nav links={NavLinksRRHH}/>
            </div>
            <div className='flex flex-1 min-w-0 overflow-hidden'>
                <div className='w-full h-full max-w-[2000px] mx-auto px-2 sm:px-3 lg:px-4 pt-2 sm:pt-3 lg:pt-4 pb-1 overflow-hidden'>
                    {children}
                </div>
            </div>
        </div>
    );
};