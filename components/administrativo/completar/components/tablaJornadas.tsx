import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { Fila } from "./tablaJornadasFila";
import { jornada, tablaJornadasProps } from "../types";
import { Esqueleto } from "./tablaJornadasEsqueleto";
import { Encabezado } from "./tablaJornadasEncabezado";

export const TablaJornadas = ({ jornadas, cargando }: tablaJornadasProps) => {
    return (
        <>
            {cargando || jornadas && jornadas.length > 0 ? (
                <TableContainer>
                    <Table stickyHeader size="small">
                        <Encabezado />
                        {cargando ? (
                            <Esqueleto filas={5} />
                        ) : (
                            <TableBody>
                                {jornadas.map((jornada: jornada) => (
                                    <Fila jornada={jornada} key={jornada.id} />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            ) : null}
            {!cargando && (!jornadas || jornadas.length === 0) && (
                <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    No se encontraron jornadas
                </div>
            )}
        </>
    );
};