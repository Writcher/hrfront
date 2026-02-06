import { TableCell, TableHead, TableRow } from "@mui/material";

export const Encabezado = () => (
    <TableHead
        sx={{
            '& .MuiTableCell-root': {
                borderBottom: '2px solid #ED6C02 !important',
                backgroundColor: '#ffff !important',
                zIndex: 1100,
            }
        }}
    >
        <TableRow>
            <TableCell align="left" >
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Fecha
                </div>
            </TableCell>
            <TableCell align="center" >
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Tipo
                </div>
            </TableCell>
            <TableCell align="center" width="25%">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Nombre de Empleado
                </div>
            </TableCell>
            <TableCell align="center" colSpan={2}>
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Entrada y Salida / Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align="right" width="25%">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)