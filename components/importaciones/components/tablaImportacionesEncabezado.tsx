import { TableCell, TableHead, TableRow } from "@mui/material";
import { encabezadoProps } from "../types";

export const Encabezado = ({ esAdministrativo }: encabezadoProps) => (
    <TableHead
        sx={{
            '& .MuiTableCell-root': {
                borderBottom: '2px solid #ED6C02 !important',
                backgroundColor: '#fff !important',
                zIndex: 1100,
            }
        }}
    >
        <TableRow>
            <TableCell align="left" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Nombre del Archivo
                </div>
            </TableCell>
            <TableCell align="center" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Fecha de Importacion
                </div>
            </TableCell>
            <TableCell align="center" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Estado
                </div>
            </TableCell>
            {esAdministrativo &&
                <TableCell align="right" width="25%">
                    <div style={{ userSelect: "none" }}
                        className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                        Acciones
                    </div>
                </TableCell>
            }
        </TableRow>
    </TableHead>
); 