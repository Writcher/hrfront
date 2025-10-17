import { TableCell, TableHead, TableRow } from "@mui/material";
import { encabezadoProps } from "../types";

export const Encabezado = () => (
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
            <TableCell align="left" width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Numero
                </div>
            </TableCell>
            <TableCell align="center" width="60%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Nombre y Apellido
                </div>
            </TableCell>
            <TableCell align="center" width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Tipo de Empleado
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);