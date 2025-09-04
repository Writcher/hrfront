import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { FilaJornada } from "./filaJornada";
import { jornada, tablaImportacionJornadasProps } from "../types";
import { Esqueleto } from "./esqueletoTabla";

export const TablaImportacionJornadas = ({
    jornadasDatos,
    jornadasCargando,
    filasPorPagina,
}: tablaImportacionJornadasProps) => (
    <TableContainer>
        <Table stickyHeader size="small">
            <TableHead
                sx={{
                    '& .MuiTableCell-root': {
                        borderBottom: '2px solid #ED6C02 !important',
                        backgroundColor: '#ffff !important',
                        zIndex: 1100,
                    }
                }}
            >
                <TableRow>
                    <TableCell align="left" width="20%">
                        <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                            Fecha
                        </div>
                    </TableCell>
                    <TableCell align="center" width="25%">
                        <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                            Nombre de Empleado
                        </div>
                    </TableCell>
                    <TableCell align="center" width="15%">
                        <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                            Entrada
                        </div>
                    </TableCell>
                    <TableCell align="center" width="15%">
                        <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                            Salida
                        </div>
                    </TableCell>
                    <TableCell align="right" width="25%">
                        <div style={{ userSelect: "none" }} className="text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]">
                            Acciones
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            {jornadasCargando ? (
                <TableBody>
                    {Array.from({ length: filasPorPagina }).map((_, index) => (
                        <Esqueleto key={index}/>
                    ))}
                </TableBody>
            ) : (
                <TableBody>
                    {jornadasDatos?.jornadas?.length > 0 ? (
                        jornadasDatos.jornadas.map((jornada: jornada) => (
                            <FilaJornada jornada={jornada} key={jornada.id}/>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center" />
                        </TableRow>
                    )}
                </TableBody>
            )}
        </Table>
    </TableContainer>
);