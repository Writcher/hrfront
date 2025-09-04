import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { tablaJornadasProps, jornada } from "../types";
import { Esqueleto } from "./esqueletoTablaJornada";
import { FilaJornada } from "./filaJornada";

export const TablaJornadas = ({
    jornadasDatos,
    jornadasCargando,
    filasPorPagina,
}: tablaJornadasProps) => {
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
                        <TableCell align="right">
                            <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                                Observacion
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {jornadasCargando ? (
                    <TableBody>
                        {Array.from({ length: filasPorPagina }).map((_, index) => (
                            <Esqueleto key={index} />
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        {jornadasDatos && jornadasDatos.jornadas && jornadasDatos.jornadas.length > 0 ? (
                            jornadasDatos.jornadas.map((jornada: jornada) => (
                                <FilaJornada jornada={jornada} key={jornada.id} />
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