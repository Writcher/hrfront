'use client'

import { useDrawer } from '@/lib/context/navcontext';
import { Button, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import Link from 'next/link';

const linksadmin = [
    { name: 'Inicio', href: '/administrativo', icon: HomeRoundedIcon },
    { name: 'Jornadas', href: '/administrativo/jornadas', icon: SummarizeRoundedIcon },
    { name: 'Ausencias', href: '/administrativo/ausencias', icon: SummarizeRoundedIcon },
    { name: 'Informes', href: '/administrativo/importaciones', icon: UploadFileRoundedIcon },
    { name: 'Empleados', href: '/administrativo/empleados', icon: PeopleAltRoundedIcon },
];

export default function NavLinksAdministrativo() {
    
    const pathname = usePathname();
    const { hidden } = useDrawer();

    return (
        <>
            {linksadmin.map((link) => {
                const LinkIcon = link.icon;
                const isActive =
                    link.href === '/administrativo'
                        ? pathname === link.href
                        : pathname.startsWith(link.href);

                return hidden ? (
                    <div className='flex h-10' key={link.href}>
                        <IconButton
                            key={link.name}
                            component={Link}
                            href={link.href}
                            color='warning'
                            sx={{ marginX: '4px', marginY: '2px' }}
                            className={`!grow !items-center !justify-center !rounded !font-medium hover:!bg-orange-100 hover:!text-orange-600 ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                        >
                            <span className='flex items-center justify-center'><LinkIcon /></span>
                        </IconButton>
                    </div>
                ) : (
                    <div className='flex h-10' key={link.href}>
                        <Button
                            key={link.name}
                            component={Link}
                            href={link.href}
                            variant='text'
                            color='warning'
                            className={`!grow !items-center !justify-start !rounded !font-medium hover:!bg-orange-100 hover:!text-orange-600 ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                            sx={{ textTransform: 'none', marginX: '4px', marginY: '2px', paddingLeft: '10.5%' }}
                            fullWidth
                            disableElevation
                            startIcon={<span className='flex items-center justify-center'><LinkIcon /></span>}
                        >
                            <span className='text-base'>{link.name}</span>                           
                        </Button>
                    </div>
                );
            })}
        </>
    );
};