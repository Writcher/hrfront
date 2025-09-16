import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Fila } from "./tablaJornadasFila";
import { jornada, tablaJornadasProps } from "../types";
import { Esqueleto } from "./tablaJornadasEsqueleto";
import { Encabezado } from "./tablaJornadasEncabezado";

export const TablaJornadas = ({ jornadas, cargando, filas }: tablaJornadasProps) => (
    <TableContainer>
        <Table stickyHeader size="small">
            <Encabezado/>
            {cargando ? (
                <Esqueleto filas={filas}/>
            ) : (
                <TableBody>
                    {jornadas?.length > 0 ? (
                        jornadas.map((jornada: jornada) => (
                            <Fila jornada={jornada} key={jornada.id}/>
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