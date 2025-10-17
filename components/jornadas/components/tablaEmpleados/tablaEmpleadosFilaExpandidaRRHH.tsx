import { Button, Divider, TableCell, TablePagination, TableRow } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchMeses } from "@/services/mes/service.mes";
import { fetchJornadas } from "@/services/jornada/service.jornada";
import { useEffect } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { Formulario } from "../tablaResumen/tablaResumenFiltrosFormulario";
import { TablaResumen } from "../tablaResumen/tablaResumen";
import { filaExpandidaEmpleadoProps } from "../../types";
import { useFiltros } from "../../hooks/useFiltrosHijoRRHH";
import { useTablaJornadaResumenFormulario } from "../../hooks/useTablaJornadasResumenFormulario";
import { TablaObservaciones } from "../tablaObservaciones/tablaObservaciones";
import { fetchObservacionesEmpleado } from "@/services/observacion/service.observacion";
import { usePaginacion } from "@/components/hooks/usePaginacion";

export function FilaExpandidaRRHH({
    idFilaExpandida,
    idFilaExpandidaProp,
    es_mensualizado
}: filaExpandidaEmpleadoProps) {

    const { showWarning } = useSnackbar();

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 5 });

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchMeses"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    const { watch, setValue } = useTablaJornadaResumenFormulario({ meses: selectDatos });

    const {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena
    } = useFiltros({ setValue });

    useEffect(() => {
        handleCambioPagina(null, 0);
    }, [
        watch("filtroMes"),
        watch("filtroQuincena"),
    ]);

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError } = useQuery({
        queryKey: [
            "fetchResumenEmpleado",
            idFilaExpandida,
            watch("filtroMes"),
            watch("filtroQuincena"),
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
        }),
        refetchOnWindowFocus: false,
    });

    const { data: observacionesDatos, isLoading: observacionesCargando, isError: observacionesError } = useQuery({
        queryKey: [
            "fetchResumenEmpleado",
            idFilaExpandida,
            watch("filtroMes"),
            watch("filtroQuincena"),
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchObservacionesEmpleado({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
            pagina: pagina,
            filasPorPagina: filasPorPagina,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
        if (observacionesError) {
            showWarning("Error al cargar observaciones");
        };
    }, [selectError, jornadasError, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px] pt-[10px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row gap-2 w-full h-11 items-center">
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="!h-[40px]"
                            disableElevation
                            onClick={handleLimpiarFiltros}
                        >
                            Limpiar Quincena
                        </Button>
                        <Formulario
                            filtroMes={watch("filtroMes")}
                            filtroQuincena={watch("filtroQuincena")}
                            selectCargando={selectCargando}
                            selectDatos={selectDatos}
                            onCambioFiltroMes={handleCambioFiltroMes}
                            onCambioFiltroQuincena={handleCambioFiltroQuincena}
                        />
                        <div className="flex grow" />
                    </div>
                    <div className="flex grow flex-col justify-between w-full gap-2">
                        <div className="flex w-full h-full p-[20px] pt-[10px]">
                            <TablaResumen
                                resumen={jornadasDatos?.resumen}
                                cargando={jornadasCargando}
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
                                        filas={filasPorPagina}
                                    />
                                </div>
                                <div className="flex justify-end items-center overflow-x-hide">
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={observacionesDatos?.totalObservaciones || 0}
                                        rowsPerPage={filasPorPagina}
                                        page={pagina}
                                        onPageChange={handleCambioPagina}
                                        onRowsPerPageChange={handleCambioFilasPorPagina}
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
                </div>
            </TableCell>
        </TableRow >
    )
};