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
}: tablaImportacionesProps) => {
    return (
        <>
            {cargando || importaciones && importaciones.length > 0 ? (
                <TableContainer className="outer-table-container">
                    <Table stickyHeader>
                        <Encabezado
                            esAdministrativo={esAdministrativo}
                        />
                        {cargando ? (
                            <Esqueleto filas={filas} esAdministrativo={esAdministrativo} />
                        ) : (
                            <TableBody>
                                {importaciones.map((importacion: importacion) => (
                                    <Fila
                                        importacion={importacion}
                                        key={importacion.id}
                                        esAdministrativo={esAdministrativo}
                                    />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            ) : null}
            {!cargando && (!importaciones || importaciones.length === 0) && (
                <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                    No se encontraron informes
                </div>
            )}
        </>
    );
};