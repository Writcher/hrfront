"use client"

import { Button, TablePagination } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import Link from "next/link";
import React, { useEffect } from "react";
import { useTablaImportacionesFormulario } from "./hooks/useTablaImportacionesForm";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteImportacion, fetchImportaciones } from "@/services/importacion/service.importacion";
import { TablaListaImportaciones } from "./components/tablaImportaciones";
import { FormularioFiltros } from "./components/formularioFiltros";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { deleteImportacionDTO } from "@/lib/dtos/importacion";
import { useSnackbar } from "@/lib/context/snackbarcontext";

export default function TablaImportaciones() {
    const { setValue, watch } = useTablaImportacionesFormulario();
    const { showSuccess, showError, showWarning } = useSnackbar();
    const queryClient = useQueryClient();

    const filtros = useFiltros(setValue, watch);
    const paginacion = usePaginacion(setValue, watch);

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

    const mutacion = useMutation({
        mutationFn: (data: deleteImportacionDTO) => deleteImportacion(data),
        onSuccess: (respuesta) => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportaciones"]
            });
            showSuccess("Importación borrada correctamente");
        },
        onError: () => {
            showError("Error al borrar la importación");
        }
    });

    const onDelete = (id: number) => {
        mutacion.mutate({
            id: id
        });
    };

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
                    href={"/administrativo/importacion/importar"}
                    variant="contained"
                    color="success"
                    disableElevation
                    endIcon={<UploadFileRoundedIcon />}
                >
                    Importar Informe
                </Button>
            </div>
            <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: "2px solid #ED6C02" }}>
                <TablaListaImportaciones
                    importacionesDatos={importacionesDatos}
                    importacionesCargando={importacionesCargando}
                    filasPorPagina={paginacion.filasPorPagina}
                    handleBorrar={onDelete}
                    borrando={mutacion.isPending}
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