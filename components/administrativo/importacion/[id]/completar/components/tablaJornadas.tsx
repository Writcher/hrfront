import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { FormularioJornada } from "./formularioJornada";

interface TablaImportacionJornadasProps {
    jornadasDatos: any;
    jornadasCargando: boolean;
    filasPorPagina: number;
}

export const TablaImportacionJornadas: React.FC<TablaImportacionJornadasProps> = ({
    jornadasDatos,
    jornadasCargando,
    filasPorPagina
}) => (
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
                    <TableCell align="left">
                        <div style={{ userSelect: "none" }}
                            className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                            Fecha
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }}
                            className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                            Nombre de Empleado
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }}
                            className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                            Entrada
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ userSelect: "none" }}
                            className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                            Salida
                        </div>
                    </TableCell>
                    <TableCell align="right">
                        <div style={{ userSelect: "none" }}
                            className="text-gray-700 font-bold [clamp(0.25rem,5vw,1rem)]">
                            Acciones
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            {jornadasCargando ? (
                <TableBody>
                    {Array.from({ length: filasPorPagina }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell align="left" size="small">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="center" size="small">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="center" size="small">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="center" size="small">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="right" size="small">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            ) : (
                <TableBody>
                    {jornadasDatos?.jornadas?.length > 0 ? (
                        jornadasDatos.jornadas.map((row: any) => (
                            <FormularioJornada
                                jornada={row}
                                key={row.id}
                            />
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