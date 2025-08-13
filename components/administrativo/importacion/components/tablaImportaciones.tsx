import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button, Chip } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import React from "react";
import Link from "next/link";

interface TablaImportacionesProps {
    importacionesDatos: any;
    importacionesCargando: boolean;
    filasPorPagina: number;
}

export const TablaListaImportaciones: React.FC<TablaImportacionesProps> = ({
    importacionesDatos,
    importacionesCargando,
    filasPorPagina
}) => (
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
                            className={`text-gray-700 font-medium md:font-bold text-[17px]`}>
                            Fecha de Importacion
                        </div>
                    </TableCell>
                    <TableCell align="center" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-medium md:font-bold text-[17px]`}>
                            Estado
                        </div>
                    </TableCell>
                    <TableCell align="right" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-medium md:font-bold text-[17px]`}>
                            Acciones
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            {importacionesCargando ? (
                <TableBody>
                    {Array.from({ length: filasPorPagina }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell align="left" size="small" width="33%">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="center" size="small" width="33%">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                            <TableCell align="right" size="small" width="33%">
                                <Skeleton variant="text" width={100} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            ) : (
                <TableBody>
                    {importacionesDatos?.importaciones?.length > 0 ? (
                        importacionesDatos.importaciones.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell align="left" size="small">
                                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                                        {new Intl.DateTimeFormat('es-AR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: '2-digit'
                                        }).format(new Date(row.fecha)).replace(/\//g, '-')}
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                                        <Chip label={row.nombreestado} color={row.nombreestado.toLowerCase() !== 'incompleta' ? "success" : "error"} />
                                    </div>
                                </TableCell>
                                <TableCell align="right" size="small">
                                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                                        <Button
                                            component={Link}
                                            href={`/administrativo/importacion/${row.id}/completar`}
                                            variant="contained"
                                            color="success"
                                            disableElevation
                                            endIcon={<EditNoteRoundedIcon />}
                                            size="small"
                                            disabled={row.nombreestado.toLowerCase() !== 'incompleta'}
                                        >
                                            COMPLETAR
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
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