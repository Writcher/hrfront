import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

interface TablaJornadasProps {
    jornadasDatos: any;
    jornadasCargando: boolean;
}

export const TablaJornadas: React.FC<TablaJornadasProps> = ({
    jornadasDatos,
    jornadasCargando
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
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                                Total
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                                Total Normal
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                                Total 50%
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                                Total 100%
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                                Total Feriado
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {jornadasCargando ? (
                    <TableBody>
                        <TableRow>
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
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    {formatHorasMinutos(jornadasDatos.resumen.suma_total)}
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    {formatHorasMinutos(jornadasDatos.resumen.suma_total_normal)}
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    {formatHorasMinutos(jornadasDatos.resumen.suma_total_50)}
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    {formatHorasMinutos(jornadasDatos.resumen.suma_total_100)}
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    {formatHorasMinutos(jornadasDatos.resumen.suma_total_feriado)}
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};