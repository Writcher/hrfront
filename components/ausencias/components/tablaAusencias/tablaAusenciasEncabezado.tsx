import { TableCell, TableHead, TableRow } from "@mui/material";

export const Encabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align="left">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Fecha
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Observacion
                </div>
            </TableCell>
            <TableCell align="right">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)