"use client"

import { useDrawer } from "@/lib/context/navcontext";
import { Button, IconButton } from "@mui/material";
import { usePathname } from 'next/navigation';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Link from "next/link";

const linksadmin = [
    { name: 'Inicio', href: '/rrhh', icon: HomeRoundedIcon },
    { name: 'Jornadas', href: '/rrhh/jornadas', icon: SummarizeRoundedIcon },
    { name: 'Informes', href: '/rrhh/importacion', icon: UploadFileRoundedIcon },
    { name: 'Empleados', href: '/rrhh/empleados', icon: PeopleAltRoundedIcon },

    //Añadir links segun necesario aca.
];

export default function NavLinksRRHH() {
    const pathname = usePathname();
    const { hidden } = useDrawer();

    return (
        <>
            {linksadmin.map((link) => {
                const LinkIcon = link.icon;
                const isActive =
                    link.href === "/rrhh"
                        ? pathname === link.href
                        : pathname.startsWith(link.href);

                return hidden ? (
                    <div className="flex h-[5vh]" key={link.href}>
                        <IconButton
                            key={link.name}
                            component={Link}
                            href={link.href}
                            color="warning"
                            sx={{ marginX: "0.25vw", marginY: "0.125vw" }}
                            className={`!grow !items-center !justify-center !rounded !font-medium hover:!bg-orange-100 hover:!text-orange-600 ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                        >
                            <span className="flex items-center justify-center"><LinkIcon /></span>
                        </IconButton>
                    </div>
                ) : (
                    <div className="flex h-[5vh]" key={link.href}>
                        <Button
                            key={link.name}
                            component={Link}
                            href={link.href}
                            variant="text"
                            color="warning"
                            className={`!grow !items-center !justify-start !rounded !font-medium hover:!bg-orange-100 hover:!text-orange-600 ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                            sx={{ textTransform: "none", marginX: "0.25vw", marginY: "0.125vw", paddingLeft: "10.5%" }}
                            fullWidth
                            disableElevation
                            startIcon={<span className="flex items-center justify-center"><LinkIcon /></span>}
                        >
                            <span className="text-[clamp(0.1rem,5vw,1rem)]">{link.name}</span>                           
                        </Button>
                    </div>
                );
            })}
        </>
    );
};