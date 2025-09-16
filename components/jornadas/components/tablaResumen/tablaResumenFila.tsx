import { TableBody, TableCell, TableRow } from "@mui/material";
import { formatHorasMinutos } from "../../utils";
import { tablaResumenFilaProps } from "../../types";

export const Fila = ({ resumen }: tablaResumenFilaProps) => (
    <TableBody>
        <TableRow>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {formatHorasMinutos(resumen.suma_total)}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {formatHorasMinutos(resumen.suma_total_normal)}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {formatHorasMinutos(resumen.suma_total_50)}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {formatHorasMinutos(resumen.suma_total_100)}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {formatHorasMinutos(resumen.suma_total_feriado)}
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
);