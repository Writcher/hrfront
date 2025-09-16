import { Table, TableContainer } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaResumenEsqueleto";
import { tablaJornadasResumenProps } from "../../types";
import { Encabezado } from "./tablaResumenEncabezado";
import { Fila } from "./tablaResumenFila";

export const TablaResumen = ({
    resumen,
    cargando
}: tablaJornadasResumenProps) => {
    return (
        <TableContainer className="inner-table-container">
            <Table stickyHeader size="small">
                <Encabezado/>
                {cargando ? (
                    <Esqueleto/>
                ) : (
                    <Fila 
                        resumen={resumen}
                    />
                )}
            </Table>
        </TableContainer>
    );
};