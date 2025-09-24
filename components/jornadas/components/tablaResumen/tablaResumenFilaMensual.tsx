import { TableBody, TableCell, TableRow } from "@mui/material";
import { tablaResumenFilaProps } from "../../types";

export const FilaMensual = ({ resumen }: tablaResumenFilaProps) => (
    <TableBody>
        <TableRow>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {resumen.total_asistencias}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {resumen.total_ausencias_justificadas}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {resumen.total_ausencias_injustificadas}
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
);