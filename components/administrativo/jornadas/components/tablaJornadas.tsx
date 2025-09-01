import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Box, Typography } from "@mui/material";
import React from "react";
import { TooltipObservaciones } from "./tooltipObservaciones";

interface TablaJornadasProps {
    jornadasDatos: any;
    jornadasCargando: boolean;
    filasPorPagina: number;
}

export const TablaJornadas: React.FC<TablaJornadasProps> = ({
    jornadasDatos,
    jornadasCargando,
    filasPorPagina,
}) => {
    function formatHorasMinutos(total: number) {
        const horas = Math.floor(total);
        const minutos = Math.round((total - horas) * 60);
        const minutosFormateados = String(minutos).padStart(2, "0");
        return `${horas}:${minutosFormateados} hs`;
    };
    return (
        <TableContainer className="inner-table-container">
            <Table stickyHeader size="small">
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
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Observacion
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {jornadasCargando ? (
                    <TableBody>
                        {Array.from({ length: filasPorPagina }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" size="small">
                                    <div className="flex items-center justify-start">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="text" width={100} />
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="flex items-center justify-center">
                                        <Skeleton variant="rectangular" className="!rounded" width={45} height={30} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        {jornadasDatos && jornadasDatos.jornadas && jornadasDatos.jornadas.length > 0 ? (
                            jornadasDatos.jornadas.map((row: any) => (
                                <React.Fragment key={row.id}>
                                    <TableRow>
                                        <TableCell align="left" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {new Intl.DateTimeFormat('es-AR', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'numeric',
                                                    year: '2-digit'
                                                }).format(new Date(row.fecha)).replace(/\//g, '-')}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                                {row.entrada}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                                {row.salida}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {row.entrada_r}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {row.salida_r}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {formatHorasMinutos(row.total)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {row.tipojornada}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                                                {row.tipoausencia === null ? "" : row.tipoausencia}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <TooltipObservaciones row={row} />
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" />
                            </TableRow>
                        )}
                        {Array.from({ length: filasPorPagina - (jornadasDatos?.jornadas?.length || 0) }).map((_, index) => (
                            <TableRow key={`empty-row-${index}`}>
                                <TableCell colSpan={9} />
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};