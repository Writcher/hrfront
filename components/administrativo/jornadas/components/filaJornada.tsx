import { TableRow, TableCell } from "@mui/material";
import { formatHorasMinutos, getDia } from "../utils";
import { TooltipObservaciones } from "./tooltipObservaciones";
import { filaJornadaProps } from "../types";

export const FilaJornada = ({ jornada }: filaJornadaProps) => {

    const dia = getDia(jornada.fecha);

    return (
        <TableRow>
            <TableCell align="left" size="small" className={`${dia === 0 ? 'bg-gradient-to-l from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-l from-green-300 via-green-300 to-transparent' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {new Intl.DateTimeFormat('es-AR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'numeric',
                        year: '2-digit'
                    }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {jornada.entrada}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    {jornada.salida}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {jornada.entrada_r}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {jornada.salida_r}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {formatHorasMinutos(jornada.total)}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {jornada.tipojornada}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                    {jornada.tipoausencia === null ? "" : jornada.tipoausencia}
                </div>
            </TableCell>
            <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-green-300 via-green-300 to-transparent' : ''}`}>
                <div className="flex w-full items-center justify-end gap-2">
                    <TooltipObservaciones observaciones={jornada.observaciones} />
                </div>
            </TableCell>
        </TableRow >
    );
};