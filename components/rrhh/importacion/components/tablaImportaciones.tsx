import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Esqueleto } from "./esqueletoTabla";
import { FilaImportacion } from "./filaImportacion";
import { importacion, tablaImportacionesProps } from "../types";

export const TablaImportaciones = ({
    importacionesDatos,
    importacionesCargando,
    filasPorPagina,
}: tablaImportacionesProps) => (
    <TableContainer className="outer-table-container">
        <Table stickyHeader>
            <TableHead
                sx={{
                    '& .MuiTableCell-root': {
                        borderBottom: '2px solid #ED6C02 !important',
                        backgroundColor: '#fff !important',
                        zIndex: 1100,
                    }
                }}
            >
                <TableRow>
                    <TableCell align="left" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                            Nombre del Archivo
                        </div>
                    </TableCell>
                    <TableCell align="center" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                            Fecha de Importacion
                        </div>
                    </TableCell>
                    <TableCell align="right" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                            Estado
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            {importacionesCargando ? (
                <TableBody>
                    {Array.from({ length: filasPorPagina }).map((_, index) => (
                        <Esqueleto key={index}/>
                    ))}
                </TableBody>
            ) : (
                <TableBody>
                    {importacionesDatos?.importaciones?.length > 0 ? (
                        importacionesDatos.importaciones.map((importacion: importacion) => (
                            <FilaImportacion 
                                importacion={importacion}
                                key={importacion.id}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center" />
                        </TableRow>
                    )}
                </TableBody>
            )}
        </Table>
    </TableContainer>
);