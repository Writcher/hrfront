import { TableCell, TableHead, TableRow } from "@mui/material";

export const EncabezadoMensual = () => (
    <TableHead>
        <TableRow>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total de Asistencias
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total de Ausencias Justificadas
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total de Ausencias Injustificadas
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);