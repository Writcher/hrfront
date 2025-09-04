import { TableRow, TableCell } from "@mui/material";
import { formatHorasMinutos } from "../utils";
import { TooltipObservaciones } from "./tooltipObservaciones";
import { filaJornadaProps } from "../types";

export const FilaJornada = ({ jornada }: filaJornadaProps) => (
    <TableRow>
        <TableCell align="left" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                {jornada.entrada}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                {jornada.salida}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {jornada.entrada_r}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {jornada.salida_r}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {formatHorasMinutos(jornada.total)}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {jornada.tipojornada}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {jornada.tipoausencia === null ? "" : jornada.tipoausencia}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <TooltipObservaciones observaciones={jornada.observaciones} />
        </TableCell>
    </TableRow>
)