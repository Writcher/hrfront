import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { formatHorasMinutos } from "../utils";
import { Esqueleto } from "./esqueletoTablaJornada";
import { tablaJornadasProps } from "../types";

export const TablaJornadas = ({
    jornadasDatos,
    jornadasCargando
}: tablaJornadasProps) => {
    return (
        <TableContainer className="inner-table-container">
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Total
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Total Normal
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Total 50%
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Total 100%
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Total Feriado
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {jornadasCargando ? (
                    <Esqueleto/>
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