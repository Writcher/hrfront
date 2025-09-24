import { TableBody, TableCell, TableRow } from "@mui/material";
import { tablaObservacionesFilaProps } from "../../types";

export const Fila = ({ observacion }: tablaObservacionesFilaProps) => (
    <TableRow>
        <TableCell align="center" size="small" width="15%">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(observacion.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align="left" size="small" width="85%">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                {observacion.texto}
            </div>
        </TableCell>
    </TableRow>
);