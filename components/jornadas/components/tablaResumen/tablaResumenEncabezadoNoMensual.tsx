import { TableCell, TableHead, TableRow } from "@mui/material";

export const EncabezadoNoMensual = () => (
    <TableHead>
        <TableRow>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total Normal
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total 50%
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total 100%
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total Feriado
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total Nocturno
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);