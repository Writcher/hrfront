import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

interface TablaEmpleadosProps {
    jornadasDatos: any;
    jornadasCargando: boolean;
    filasPorPagina: number;
}

export const TablaJornadas: React.FC<TablaEmpleadosProps> = ({
    jornadasDatos,
    jornadasCargando,
    filasPorPagina,
}) => (
    <TableContainer className="inner-table-container">
        <Table stickyHeader size="small">
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Fecha
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Entrada
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Salida
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Entrada con Redondeo
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Salida con Redondeo
                        </div>
                    </TableCell>
                    <TableCell align="right">
                        <div style={{ userSelect: "none" }} className={`text-gray-700 font-medium md:font-bold text-[15px]`}>
                            Total Jornada
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
                                <div className="flex items-center justify-start">
                                    <Skeleton variant="text" width={100} />
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="flex items-center justify-start">
                                    <Skeleton variant="text" width={100} />
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="flex items-center justify-start">
                                    <Skeleton variant="text" width={100} />
                                </div>
                            </TableCell>
                            <TableCell align="right" size="small">
                                <div className="flex items-center justify-start">
                                    <Skeleton variant="text" width={100} />
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
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {new Intl.DateTimeFormat('es-AR', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: '2-digit'
                                            }).format(new Date(row.fecha)).replace(/\//g, '-')}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {row.entrada}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {row.salida}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {row.entrada_r}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {row.salida_r}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right" size="small">
                                        <div className="text-gray-700 text-sm" style={{ userSelect: "none" }}>
                                            {row.total}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center" />
                        </TableRow>
                    )}
                    {Array.from({ length: filasPorPagina - (jornadasDatos?.jornadas?.length || 0) }).map((_, index) => (
                        <TableRow key={`empty-row-${index}`}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    ))}
                </TableBody>
            )}
        </Table>
    </TableContainer>
);