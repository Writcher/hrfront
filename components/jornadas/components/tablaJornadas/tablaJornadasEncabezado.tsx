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
                    Entrada
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Salida
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Entrada con Redondeo
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Salida con Redondeo
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Total Jornada
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Tipo de Jornada
                </div>
            </TableCell>
            <TableCell align="center">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align="right">
                <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                    Observacion
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)