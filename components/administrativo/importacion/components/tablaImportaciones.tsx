import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button, Chip } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import React from "react";
import Link from "next/link";
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LightTooltip from "@/components/ui/tooltip";

interface TablaImportacionesProps {
    importacionesDatos: any;
    importacionesCargando: boolean;
    filasPorPagina: number;
    handleBorrar: (id: number) => void;
    borrando: boolean;
}

export const TablaListaImportaciones: React.FC<TablaImportacionesProps> = ({
    importacionesDatos,
    importacionesCargando,
    filasPorPagina,
    handleBorrar,
    borrando
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
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                            Fecha de Importacion
                        </div>
                    </TableCell>
                    <TableCell align="center" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                            Estado
                        </div>
                    </TableCell>
                    <TableCell align="right" width="33%">
                        <div style={{ userSelect: "none" }}
                            className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
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
                                <div className="flex items-center justify-start">
                                    <Skeleton variant="text" width={100} />
                                </div>
                            </TableCell>
                            <TableCell align="center" size="small" width="33%">
                                <div className="flex items-center justify-center">
                                    <Skeleton variant="text" width={100} />
                                </div>
                            </TableCell>
                            <TableCell align="right" size="small" width="33%">
                                <div className="flex items-center justify-end">
                                    <Skeleton variant="rectangular" className="!rounded" width={80} height={30} />
                                </div>
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
                                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                                        {new Intl.DateTimeFormat('es-AR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: '2-digit'
                                        }).format(new Date(row.fecha)).replace(/\//g, '-')}
                                    </div>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                                        <Chip
                                            label={row.nombreestado}
                                            className="!rounded"
                                            color={
                                                row.nombreestado.toLowerCase() === 'completa'
                                                    ? "success"
                                                    : row.nombreestado.toLowerCase() === 'incompleta'
                                                        ? "error"
                                                        : "warning"
                                            }
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="right" size="small">
                                    <div className="flex justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)] gap-2">
                                        <LightTooltip title="Revisar" placement="left" arrow>
                                            <Button
                                                component={Link}
                                                href={`/administrativo/importacion/${row.id}/completar`}
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                disableElevation
                                                disabled={row.nombreestado.toLowerCase() === 'completa' || borrando}
                                            >
                                                <EditNoteRoundedIcon />
                                            </Button>
                                        </LightTooltip>
                                        <LightTooltip title="Borrar" placement="left" arrow>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                disableElevation
                                                size="small"
                                                disabled={borrando || row.nombreestado.toLowerCase() === 'completa'}
                                                onClick={() => handleBorrar(row.id)}
                                            >
                                                {!borrando ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                                            </Button>
                                        </LightTooltip>
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