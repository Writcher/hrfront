import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { tablaJornadasProps, jornada } from "../../types";
import { Esqueleto } from "./tablaAusenciasEsqueleto";
import { FilaJornada } from "./tablaAusenciasFila";
import { Encabezado } from "./tablaAusenciasEncabezado";

export const TablaAusencias = ({
    jornadas,
    cargando,
}: tablaJornadasProps) => {
    return (
        <>
            {cargando || jornadas && jornadas.length > 0 ? (
                <TableContainer className="inner-table-container" id={"tablaJornadaBody"}>
                    <Table stickyHeader size="small">
                        <Encabezado />
                        {cargando ? (
                            <Esqueleto
                                filas={5}
                            />
                        ) : (
                            <TableBody>
                                {jornadas.map((jornada: jornada) => (
                                    <FilaJornada
                                        jornada={jornada}
                                        key={jornada.id}
                                    />
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