import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaImportacionesEsqueleto";
import { importacion, tablaImportacionesProps } from "../types";
import Fila from "./tablaImportacionesFila";
import { Encabezado } from "./tablaImportacionesEncabezado";

export const TablaImportaciones = ({
    importaciones,
    cargando,
    filas,
    esAdministrativo
}: tablaImportacionesProps) => (
    <TableContainer className="outer-table-container">
        <Table stickyHeader>
            <Encabezado 
                esAdministrativo={esAdministrativo}
            />
            {cargando ? (
                <Esqueleto filas={filas} esAdministrativo={esAdministrativo}/>
            ) : (
                <TableBody>
                    {importaciones?.length > 0 ? (
                        importaciones.map((importacion: importacion) => (
                            <Fila
                                importacion={importacion}
                                key={importacion.id}
                                esAdministrativo={esAdministrativo}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center" />
                        </TableRow>
                    )}
                </TableBody>
            )}
        </Table>
    </TableContainer>
);