"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useTablaImportacionJornadasFormulario } from "./hooks/useTablaImportacionJornadasFormulario";
import { fetchImportacionJornadas, setImportacionCompleta } from "@/services/importacion/service.importacion";
import { Button, FormControlLabel, Link, TablePagination } from "@mui/material";
import { IOSSwitch } from "@/components/ui/switch";
import { TablaImportacionJornadas } from "./components/tablaJornadas";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface CompletarInformacionProps {
    idImportacion: number
}

export default function TablaCompletarImportacion({ idImportacion }: CompletarInformacionProps) {
    const { setValue, watch } = useTablaImportacionJornadasFormulario();

    const filtros = useFiltros(setValue, watch);
    const paginacion = usePaginacion(setValue, watch);
    const router = useRouter();

    const { data: jornadasDatos, isLoading: jornadasCargando } = useQuery({
        queryKey: ["fetchImportacionJornadas", paginacion.pagina, paginacion.filasPorPagina, watch("filtroMarcasIncompletas")],
        queryFn: () => fetchImportacionJornadas({
            idImportacion,
            filtroMarcasIncompletas: watch("filtroMarcasIncompletas"),
            pagina: paginacion.pagina,
            filasPorPagina: paginacion.filasPorPagina,
        }),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (jornadasDatos && jornadasDatos.totalIncompleto !== undefined && !jornadasCargando) {
            setValue("totalIncompleto", jornadasDatos.totalIncompleto)
        }
    }, [jornadasDatos?.totalIncompleto])

    const botonDeshabilitado = Number(watch("totalIncompleto")) !== 0

    const mutacion = useMutation({
        mutationFn: (id: number) => setImportacionCompleta(id),
        onSuccess: (respuesta) => {
            if (respuesta.ok) {
                router.push(`/administrativo/importacion`);
            };
        }
    });
    return (
        <div className="flex flex-col gap-2 items-start justify-between w-[95%] h-full mb-1">
            <div className="flex flex-row gap-2 w-full">
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} />}
                    label="Solo Importaciones con Fichajes Incompletos"
                    className="w-full !text-gray-700"
                    onChange={filtros.handleCambioFiltroIncompletas}
                    checked={watch("filtroMarcasIncompletas")}
                />
                <div className="flex grow" />
            </div>
            <div className="flex grow flex-col justify-between w-full rounded overflow-y-auto" style={{ border: "2px solid #ED6C02" }}>
                <TablaImportacionJornadas
                    jornadasDatos={jornadasDatos}
                    jornadasCargando={jornadasCargando}
                    filasPorPagina={paginacion.filasPorPagina}
                    paginacion={paginacion}
                    filtro={watch("filtroMarcasIncompletas")}
                />
                <div className="flex justify-end items-center overflow-x-hide"
                    style={{ borderTop: "2px solid #ED6C02" }}>
                    <TablePagination
                        rowsPerPageOptions={[25, 50]}
                        component="div"
                        count={jornadasDatos?.totalJornadas || 0}
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
            <div className="flex w-full justify-between">
                <Button
                    component={Link}
                    variant="contained"
                    color="warning"
                    href={"/administrativo/importacion"}
                    disableElevation
                    startIcon={<ArrowBackRoundedIcon />}
                >
                    Importaciones
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    disableElevation
                    disabled={botonDeshabilitado || jornadasCargando}
                    onClick={() => mutacion.mutate(idImportacion)}
                >
                    Confirmar
                </Button>
            </div>
        </div>
    );
};