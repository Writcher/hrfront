import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { tablaJornadasProps, jornada } from "../../types";
import { Esqueleto } from "./tablaJornadasEsqueleto";
import { FilaJornada } from "./tablaJornadasFila";
import { Encabezado } from "./tablaJornadasEncabezado";

export const TablaJornadas = ({
    jornadas,
    cargando,
    filas,
}: tablaJornadasProps) => {
    return (
        <TableContainer className="inner-table-container"  id={"tablaJornadaBody"}> 
            <Table stickyHeader size="small">
                <Encabezado/>
                {cargando ? (
                    <Esqueleto
                        filas={filas}
                    />
                ) : (
                    <TableBody>
                        {jornadas && jornadas.length > 0 ? (
                            jornadas.map((jornada: jornada) => (
                                <FilaJornada
                                    jornada={jornada}
                                    key={jornada.id}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" />
                            </TableRow>
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};