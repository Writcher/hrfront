"use client"

import { useDrawer } from "@/lib/context/navcontext";
import { Button, IconButton } from "@mui/material";
import { usePathname } from 'next/navigation';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import Link from "next/link";

const linksadmin = [
    { name: 'Inicio', href: '/administrativo', icon: HomeRoundedIcon },
    { name: 'Jornadas', href: '/administrativo/jornadas', icon: SummarizeRoundedIcon },
    { name: 'Importar Informe', href: '/administrativo/excel', icon: UploadFileRoundedIcon },

    //Añadir links segun necesario aca.
];

export default function NavLinksAdministrativo() {
    const pathname = usePathname();
    const { hidden } = useDrawer();

    return (
        <>
            {linksadmin.map((link) => {
                const LinkIcon = link.icon;
                const isActive =
                    link.href === "/administrativo"
                        ? pathname === link.href
                        : pathname.startsWith(link.href);

                return hidden ? (
                    <IconButton
                        key={link.name}
                        component={Link}
                        href={link.href}
                        color="warning"
                        sx={{ margin: "2px" }}
                        className={`!items-center !justify-center !h-[4%] hover:!text-orange-600 !font-medium hover:!bg-orange-100 !rounded ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                    >
                        <span className="text-2xl flex items-center justify-center">
                            <LinkIcon />
                        </span>
                    </IconButton>
                ) : (
                    <Button
                        key={link.name}
                        component={Link}
                        href={link.href}
                        variant="text"
                        color="warning"
                        className={`!pl-6 !items-center !h-[4%] !justify-start hover:!text-orange-600 !font-medium hover:!bg-orange-100 !rounded ${isActive ? '!text-orange-600 !bg-orange-100' : '!text-gray-800'}`}
                        sx={{ margin: "2px", textTransform: "none" }}
                        fullWidth
                        disableElevation
                        startIcon={
                            <span className="text-2xl flex items-center justify-center">
                                <LinkIcon />
                            </span>
                        }
                    >
                        {link.name}
                    </Button>
                );
            })}
        </>
    );
};