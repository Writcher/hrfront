"use client"

import { Button, TablePagination } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import Link from "next/link";
import React from "react";
import { useTablaImportacionesFormulario } from "./hooks/useTablaImportacionesForm";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useQuery } from "@tanstack/react-query";
import { fetchImportaciones } from "@/services/importacion/service.importacion";
import { TablaListaImportaciones } from "./components/tablaImportaciones";
import { fetchDatosSelectTablaEmpleados } from "@/services/jornadas/service.jornadas";
import { FormularioFiltros } from "./components/formularioFiltros";

export default function TablaImportaciones() {
    const { setValue, watch } = useTablaImportacionesFormulario();

    const filtros = useFiltros(setValue, watch);
    const paginacion = usePaginacion(setValue, watch);

    const { data: selectDatos, isLoading: selectCargando } = useQuery({
        queryKey: ["fetchDatosSelectTablaEmpleados"],
        queryFn: () => fetchDatosSelectTablaEmpleados(),
        refetchOnWindowFocus: false
    });

    const { data: importacionesDatos, isLoading: importacionesCargando } = useQuery({
        queryKey: ["fetchImportaciones", paginacion.pagina, paginacion.filasPorPagina, watch("filtroProyecto"), watch("filtroIncompletas")],
        queryFn: () => fetchImportaciones({
            filtroIncompletas: watch("filtroIncompletas"),
            filtroProyecto: watch("filtroProyecto"),
            pagina: paginacion.pagina,
            filasPorPagina: paginacion.filasPorPagina
        }),
        refetchOnWindowFocus: false
    });

    return (
        <div className="flex flex-col gap-2 items-start justify-between w-[95%] h-full mb-1">
            <div className="flex flex-row gap-2 w-full">
                <Button
                    variant="contained"
                    color="error"
                    disableElevation
                    onClick={filtros.handleLimpiarFiltros}
                    endIcon={<FilterAltOffRoundedIcon />}
                >
                    Limpiar Filtro
                </Button>
                <FormularioFiltros
                    filtroIncompletas={watch("filtroIncompletas")}
                    filtroProyecto={watch("filtroProyecto")}
                    onCambioFiltroProyecto={filtros.handleCambioFiltroProyecto}
                    onCambioFiltroIncompletas={filtros.handleCambioFiltroIncompletas}
                    selectDatos={selectDatos}
                    selectCargando={selectCargando}
                />
                <div className="flex grow" />
                <Button
                    component={Link}
                    href={"/administrativo/importacion/excel"}
                    variant="contained"
                    color="success"
                    disableElevation
                    endIcon={<UploadFileRoundedIcon />}
                >
                    Importar Informe
                </Button>
            </div>
            <div className="flex grow flex-col justify-between w-full rounded overflow-y-auto" style={{ border: "2px solid #ED6C02" }}>
                <TablaListaImportaciones
                    importacionesDatos={importacionesDatos}
                    importacionesCargando={importacionesCargando}
                    filasPorPagina={paginacion.filasPorPagina}
                />
                <div className="flex justify-end items-center overflow-x-hide"
                    style={{ borderTop: "2px solid #ED6C02" }}>
                    <TablePagination
                        rowsPerPageOptions={[16, 31]}
                        component="div"
                        count={importacionesDatos?.totalImportaciones || 0}
                        rowsPerPage={paginacion.filasPorPagina}
                        page={paginacion.pagina}
                        onPageChange={paginacion.handleCambioPagina}
                        onRowsPerPageChange={paginacion.handleCambioFilasPorPagina}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                        }
                        slotProps={{
                            select: {
                                MenuProps: {
                                    anchorOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left",
                                    }
                                },
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}