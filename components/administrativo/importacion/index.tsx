"use client"

import { TablePagination } from "@mui/material";
import React, { useEffect } from "react";
import { useTablaImportacionesFormulario } from "./hooks/useTablaImportacionesFormulario";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useQuery } from "@tanstack/react-query";
import { fetchImportaciones } from "@/services/importacion/service.importacion";
import { TablaImportaciones } from "./components/tablaImportaciones";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { EncabezadoTabla } from "./components/encabezadoTabla";

export default function Importaciones() {

    const { setValue, watch } = useTablaImportacionesFormulario();
    const { showWarning } = useSnackbar();

    const filtros = useFiltros({ setValue, watch });
    const paginacion = usePaginacion({ setValue, watch });

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchDatosSelectTablaEmpleados"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false
    });

    const { data: importacionesDatos, isLoading: importacionesCargando, isError: importacionesError } = useQuery({
        queryKey: [
            "fetchImportaciones",
            paginacion.pagina,
            paginacion.filasPorPagina,
            watch("filtroProyecto"),
            watch("filtroIncompletas")
        ],
        queryFn: () => fetchImportaciones({
            filtroIncompletas: watch("filtroIncompletas"),
            filtroProyecto: watch("filtroProyecto"),
            pagina: paginacion.pagina,
            filasPorPagina: paginacion.filasPorPagina
        }),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
        if (importacionesError) {
            showWarning("Error al cargar importaciones");
        };
    }, [selectError, importacionesError, showWarning]);

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full">
            <EncabezadoTabla
                selectDatos={selectDatos || []}
                selectCargando={selectCargando}
                filtroIncompletas={watch("filtroIncompletas")}
                filtroProyecto={watch("filtroProyecto")}
                handleLimpiarFiltros={filtros.handleLimpiarFiltros}
                onCambioFiltroIncompletas={filtros.handleCambioFiltroIncompletas}
                onCambioFiltroProyecto={filtros.handleCambioFiltroProyecto}
            />
            <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: "2px solid #ED6C02" }}>
                <TablaImportaciones
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
                                    anchorOrigin: { vertical: "top", horizontal: "right" },
                                    transformOrigin: { vertical: "top", horizontal: "left" }
                                },
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}