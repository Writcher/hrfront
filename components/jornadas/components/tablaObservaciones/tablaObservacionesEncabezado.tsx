import { TableCell, TableHead, TableRow } from "@mui/material";

export const Encabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align="center" width="15%">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Fecha
                </div>
            </TableCell>
            <TableCell align="left" width="85%">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Observacion
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);