import { Chip, TableCell, TableRow } from "@mui/material";
import { filaImportacionProps } from "../types";

export const FilaImportacion = ({ importacion }: filaImportacionProps) => (
    <TableRow>
        <TableCell align="left" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                {importacion.nombre}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(importacion.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align="right" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                <Chip
                    label={importacion.nombreestado}
                    className="!rounded"
                    color={
                        importacion.nombreestado.toLowerCase() === 'completa'
                            ? "success"
                            : importacion.nombreestado.toLowerCase() === 'incompleta'
                                ? "error"
                                : "warning"
                    }
                />
            </div>
        </TableCell>
    </TableRow>
)