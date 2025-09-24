import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { observacionResumen, tablaJornadasResumenObservacionesProps } from "../../types";
import { Encabezado } from "./tablaObservacionesEncabezado";
import { Esqueleto } from "./tablaObservacionesEsqueleto";
import { Fila } from "./tablaObservacionesFila";

export const TablaObservaciones = ({
    observaciones,
    cargando,
    filas
}: tablaJornadasResumenObservacionesProps) => {
    return (
        <TableContainer className="inner-table-container">
            <Table stickyHeader size="small">
                <Encabezado />
                {cargando ? (
                    <Esqueleto
                        filas={filas}
                    />
                ) : (
                    <TableBody>
                        {observaciones && (
                            observaciones.map((observacion: observacionResumen, index) => (
                                <Fila
                                    observacion={observacion}
                                    key={index}
                                />
                            ))
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};