import { Table, TableContainer } from "@mui/material";
import React from "react";
import { tablaJornadasResumenProps } from "../../types";
import { EncabezadoMensual } from "./tablaResumenEncabezadoMensual";
import { EncabezadoNoMensual } from "./tablaResumenEncabezadoNoMensual";
import { EsqueletoMensual } from "./tablaResumenEsqueletoMensual";
import { EsqueletoNoMensual } from "./tablaResumenEsqueletoNoMensual";
import { FilaMensual } from "./tablaResumenFilaMensual";
import { FilaNoMensual } from "./tablaResumenFilaNoMensual";

export const TablaResumen = ({
    resumen,
    cargando,
    es_mensualizado
}: tablaJornadasResumenProps) => {
    return (
        <TableContainer className="inner-table-container">
            <Table stickyHeader size="small">
                {es_mensualizado 
                    ?   <EncabezadoMensual />
                    :   <EncabezadoNoMensual />
                }
                {cargando ? (
                    es_mensualizado
                        ?   <EsqueletoMensual />
                        :   <EsqueletoNoMensual />
                ) : (
                    es_mensualizado
                        ?   <FilaMensual
                                resumen={resumen}
                            />
                        :   <FilaNoMensual
                                resumen={resumen}
                            />
                )}
            </Table>
        </TableContainer>
    );
};