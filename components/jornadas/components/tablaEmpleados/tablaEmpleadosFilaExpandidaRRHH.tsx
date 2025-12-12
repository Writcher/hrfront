import { Button, Divider, TableCell, TablePagination, TableRow } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchMeses } from "@/services/mes/service.mes";
import { fetchJornadas } from "@/services/jornada/service.jornada";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { Formulario } from "../tablaResumen/tablaResumenFiltrosFormulario";
import { TablaResumen } from "../tablaResumen/tablaResumen";
import { filaExpandidaEmpleadoProps } from "../../types";
import { useFiltros } from "../../hooks/useFiltrosHijoRRHH";
import { useTablaJornadaResumenFormulario } from "../../hooks/useTablaJornadasResumenFormulario";
import { TablaObservaciones } from "../tablaObservaciones/tablaObservaciones";
import { fetchObservacionesEmpleado } from "@/services/observacion/service.observacion";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { useTablaJornadaFormulario } from "../../hooks/useTablaJornadasFormulario";
import { useFiltrosInteriores } from "../../hooks/useFiltrosHijoAdministrativo";
import { BotonesRRHH } from "../tablaJornadas/tablaJornadasFiltrosBotones";
import { TablaJornadas } from "../tablaJornadas/tablaJornadas";

export function FilaExpandidaRRHH({
    idFilaExpandida,
    idFilaExpandidaProp,
    es_mensualizado
}: filaExpandidaEmpleadoProps) {

    const { showWarning } = useSnackbar();

    const [alternarLista, setAlternarLista] = useState<"resumen" | "jornadas">("resumen");

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchMeses"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    //resumen

    const { pagina: paginaObservaciones, filasPorPagina: filasPorPaginaObservaciones, handleCambioPagina: handleCambioPaginaObservaciones, handleCambioFilasPorPagina: handleCambioFilasPorPaginaObservaciones } = usePaginacion({ filasIniciales: 5 });

    const { watch: watchResumen, setValue: setValueResumen } = useTablaJornadaResumenFormulario({ meses: selectDatos });

    const {
        handleLimpiarFiltros: handleLimpiarFiltrosResumen,
        handleCambioFiltroMes: handleCambioFiltroMesResumen,
        handleCambioFiltroQuincena: handleCambioFiltroQuincenaResumen
    } = useFiltros({ setValue: setValueResumen });

    useEffect(() => {
        handleCambioPaginaObservaciones(null, 0);
    }, [
        watchResumen("filtroMes"),
        watchResumen("filtroQuincena"),
    ]);

    const { data: resumenDatos, isLoading: resumenCargando, isError: resumenError, refetch: resumenRefetch } = useQuery({
        queryKey: [
            "fetchResumenEmpleado",
            idFilaExpandida,
            watchResumen("filtroMes"),
            watchResumen("filtroQuincena"),
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watchResumen("filtroMes"),
            filtroQuincena: watchResumen("filtroQuincena"),
        }),
        refetchOnWindowFocus: false,
    });

    const { data: observacionesDatos, isLoading: observacionesCargando, isError: observacionesError, refetch: observacionesRefetch } = useQuery({
        queryKey: [
            "fetchResumenEmpleado",
            idFilaExpandida,
            watchResumen("filtroMes"),
            watchResumen("filtroQuincena"),
            paginaObservaciones,
            filasPorPaginaObservaciones
        ],
        queryFn: () => fetchObservacionesEmpleado({
            id_empleado: idFilaExpandida,
            filtroMes: watchResumen("filtroMes"),
            filtroQuincena: watchResumen("filtroQuincena"),
            pagina: paginaObservaciones,
            filasPorPagina: filasPorPaginaObservaciones,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    //jornadas

    const { watch: watchJornadas, setValue: setValueJornadas } = useTablaJornadaFormulario();

    const { 
        handleLimpiarFiltros: handleLimpiarFiltrosJornadas, 
        handleCambioFiltroMes: handleCambioFiltroMesJornadas, 
        handleCambioFiltroQuincena: handleCambioFiltroQuincenaJornadas, 
        handleCambioFiltroMarcasIncompletas: handleCambioFiltroMarcasIncompletasJornadas
    } = useFiltrosInteriores({ setValue: setValueJornadas, watch: watchJornadas });

    const { pagina: paginaJornadas, filasPorPagina: filasPorPaginaJornadas, handleCambioPagina: handleCambioPaginaJornadas, handleCambioFilasPorPagina: handleCambioFilasPorPaginaJornadas } = usePaginacion({ filasIniciales: 16 });

    useEffect(() => {
        handleCambioPaginaJornadas(null, 0);
    }, [
        watchJornadas("filtroMes"),
        watchJornadas("filtroQuincena"),
        watchJornadas("filtroMarcasIncompletas"),
    ]);

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError, refetch: jornadasRefetch } = useQuery({
        queryKey: [
            "fetchJornadasEmpleado",
            idFilaExpandida,
            watchJornadas("filtroMes"),
            watchJornadas("filtroQuincena"),
            watchJornadas("filtroMarcasIncompletas"),
            paginaJornadas,
            filasPorPaginaJornadas
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watchJornadas("filtroMes"),
            filtroQuincena: watchJornadas("filtroQuincena"),
            filtroMarcasIncompletas: watchJornadas("filtroMarcasIncompletas"),
            pagina: paginaJornadas,
            filasPorPagina: filasPorPaginaJornadas
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
        if (resumenError) {
            showWarning("Error al cargar jornadas");
        };
        if (observacionesError) {
            showWarning("Error al cargar observaciones");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [selectError, resumenError, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-4 items-start justify-center h-full rounded bg-white p-[5px] pt-[10px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row items-center justify-start gap-1 w-full rounded border-2 border-[#ED6C02] p-1">
                        <Button
                            variant="contained"
                            className={`!h-[40px] hover:!bg-orange-100 hover:!text-orange-600 ${alternarLista === "resumen" ? "!bg-orange-100 !text-orange-600" : "!bg-gray-100 !text-gray-700"}`}
                            disableElevation
                            fullWidth
                            onClick={() => {
                                setAlternarLista("resumen");
                                handleCambioPaginaObservaciones(null, 0);
                                resumenRefetch();
                                observacionesRefetch();
                            }}
                        >
                            Resumen
                        </Button>
                        <Button
                            variant="contained"
                            className={`!h-[40px] hover:!bg-orange-100 hover:!text-orange-600 ${alternarLista === "jornadas" ? "!bg-orange-100 !text-orange-600" : "!bg-gray-100 !text-gray-700"}`}
                            fullWidth
                            disableElevation
                            onClick={() => {
                                setAlternarLista("jornadas");
                                handleCambioPaginaJornadas(null, 0);
                                jornadasRefetch();
                            }}
                        >
                            Jornadas
                        </Button>
                    </div>
                    {alternarLista === "resumen" &&
                        <>
                            <div className="flex flex-row gap-2 w-full h-11 items-center">
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    className="!h-[40px]"
                                    disableElevation
                                    onClick={handleLimpiarFiltrosResumen}
                                >
                                    Limpiar Quincena
                                </Button>
                                <Formulario
                                    filtroMes={watchResumen("filtroMes")}
                                    filtroQuincena={watchResumen("filtroQuincena")}
                                    selectCargando={selectCargando}
                                    selectDatos={selectDatos}
                                    onCambioFiltroMes={handleCambioFiltroMesResumen}
                                    onCambioFiltroQuincena={handleCambioFiltroQuincenaResumen}
                                />
                                <div className="flex grow" />
                            </div>
                            <div className="flex grow flex-col justify-between w-full gap-2">
                                <div className="flex w-full h-full p-[20px] pt-[10px]">
                                    <TablaResumen
                                        resumen={resumenDatos?.resumen}
                                        cargando={resumenCargando}
                                        es_mensualizado={es_mensualizado}
                                    />
                                </div>
                                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                                {observacionesDatos?.observaciones && observacionesDatos?.observaciones.length > 0 ? (
                                    <>
                                        <div className="flex w-full h-full p-[20px] pt-[10px]">
                                            <TablaObservaciones
                                                observaciones={observacionesDatos?.observaciones}
                                                cargando={observacionesCargando}
                                                filas={filasPorPaginaObservaciones}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center overflow-x-hide">
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                component="div"
                                                count={observacionesDatos?.totalObservaciones || 0}
                                                rowsPerPage={filasPorPaginaObservaciones}
                                                page={paginaObservaciones}
                                                onPageChange={handleCambioPaginaObservaciones}
                                                onRowsPerPageChange={handleCambioFilasPorPaginaObservaciones}
                                                labelRowsPerPage="Filas por página"
                                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
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
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center py-[20px] text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                        No se encontraron observaciones
                                    </div>
                                )}
                            </div>
                        </>
                    }
                    {alternarLista === "jornadas" &&
                        <>
                            <BotonesRRHH
                                handleLimpiarFiltros={handleLimpiarFiltrosJornadas}
                                filtroMes={watchJornadas("filtroMes")}
                                filtroQuincena={watchJornadas("filtroQuincena")}
                                filtroMarcasIncompletas={watchJornadas("filtroMarcasIncompletas")}
                                cargando={selectCargando}
                                meses={selectDatos || []}
                                handleCambioFiltroMarcasIncompletas={handleCambioFiltroMarcasIncompletasJornadas}
                                handleCambioFiltroQuincena={handleCambioFiltroQuincenaJornadas}
                                handleCambioFiltroMes={handleCambioFiltroMesJornadas}
                            />
                            <div className="flex grow flex-col justify-between w-full">
                                <TablaJornadas
                                    jornadas={jornadasDatos?.jornadas}
                                    cargando={jornadasCargando}
                                    filas={filasPorPaginaJornadas}
                                />
                                {(jornadasCargando || (jornadasDatos?.jornadas.length ?? 0) > 0) && (
                                    <div className="flex justify-end items-end overflow-x-hide">
                                        <TablePagination
                                            rowsPerPageOptions={[16, 31]}
                                            component="div"
                                            count={jornadasDatos?.totalJornadas || 0}
                                            rowsPerPage={filasPorPaginaJornadas}
                                            page={paginaJornadas}
                                            onPageChange={handleCambioPaginaJornadas}
                                            onRowsPerPageChange={handleCambioFilasPorPaginaJornadas}
                                            labelRowsPerPage="Filas por página"
                                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
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
                                )}
                            </div>
                        </>
                    }
                </div>
            </TableCell>
        </TableRow >
    )
};