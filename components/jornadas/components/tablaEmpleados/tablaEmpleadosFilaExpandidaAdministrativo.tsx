import { Button, Divider, TableCell, TablePagination, TableRow } from "@mui/material";
import { useFiltrosInteriores } from "../../hooks/useFiltrosHijoAdministrativo";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { TablaJornadas } from "../tablaJornadas/tablaJornadas";
import { useTablaJornadaFormulario } from "../../hooks/useTablaJornadasFormulario";
import { Formulario } from "../tablaJornadas/tablaJornadasFormularioCrear";
import { SubmitHandler } from "react-hook-form";
import { filaExpandidaProps, tablaJornadasFormularioDatos } from "../../types";
import { useJornadaPartida } from "../../hooks/useJornadaPartida";
import { fetchJornadas, createJornada, fetchResumen } from "@/services/jornada/service.jornada";
import { fetchMeses } from "@/services/mes/service.mes";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect, useState } from "react";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { Botones } from "../tablaJornadas/tablaJornadasFiltrosBotones";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import { useSelectDatosFormulario } from "../../hooks/useSelectDatosFormulario";
import { useTablaJornadaResumenFormulario } from "../../hooks/useTablaJornadasResumenFormulario";
import { useFiltros } from "../../hooks/useFiltrosHijoRRHH";
import { fetchObservacionesEmpleado } from "@/services/observacion/service.observacion";
import { TablaResumen } from "../tablaResumen/tablaResumen";
import { TablaObservaciones } from "../tablaObservaciones/tablaObservaciones";
import { FormularioResumen } from "../tablaResumen/tablaResumenFiltrosFormulario";
import { CreateJornadaDto } from "@/lib/dtos/jornada";

export function FilaExpandidaAdministrativo({ idFilaExpandida, idFilaExpandidaProp, estadoEmpleado, es_mensualizado }: filaExpandidaProps) {

    const { showSuccess, showError, showWarning } = useSnackbar();

    const [alternarLista, setAlternarLista] = useState<"resumen" | "jornadas">("jornadas");

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchMeses"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    //jornadas

    const { watch, setValue, control, handleSubmit, formState: { isValid }, reset } = useTablaJornadaFormulario();

    const { handleLimpiarFiltros, handleCambioFiltroMes, handleCambioFiltroQuincena } = useFiltrosInteriores({ setValue });

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 16 });

    useEffect(() => {
        handleCambioPagina(null, 0);
    }, [
        watch("filtroMes"),
        watch("filtroQuincena"),
    ]);

    const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

    const { onCambioJornadaPartida, jornadaPartida } = useJornadaPartida();

    const {
        tiposJornada,
        tiposAusencia,
        id_ausencia,
        id_jornadaNormal,
        cargando,
        error
    } = useSelectDatosFormulario();

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError, refetch: jornadasRefetch } = useQuery({
        queryKey: [
            "fetchJornadasEmpleado",
            idFilaExpandida,
            watch("filtroMes"),
            watch("filtroQuincena"),
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
            pagina: pagina,
            filasPorPagina: filasPorPagina
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const mutacionCreate = useMutation({
        mutationFn: (datos: CreateJornadaDto) => createJornada(datos),
        onSuccess: () => {
            showSuccess("Jornada creada correctamente");
            jornadasRefetch();
            handleMostrarFormulario();
        },
        onError: (error) => {
            showError("Error al crear jornada");
        }
    });

    //Resumen

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
        queryFn: () => fetchResumen({
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

    const onCreate: SubmitHandler<tablaJornadasFormularioDatos> = (datos) => {
        mutacionCreate.mutate({
            entrada: datos.entrada,
            salida: datos.salida,
            entradaTarde: datos.entradaTarde,
            salidaTarde: datos.salidaTarde,
            fecha: datos.fecha,
            id_tipojornada: datos.tipoJornada,
            id_tipoausencia: datos.tipoAusencia,
            observacion: datos.observacion,
            id_empleado: idFilaExpandida !== null ? idFilaExpandida : 0,
        });
    };

    useEffect(() => {
        if (selectError || error) {
            showWarning("Error al cargar los datos");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [selectError, error, jornadasDatos, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px]" style={{ border: "2px solid #ED6C02", }}>
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
                                handleCambioPagina(null, 0);
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
                                <FormularioResumen
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
                            <Botones
                                formularioVisible={formularioVisible}
                                handleLimpiarFiltros={handleLimpiarFiltros}
                                filtroMes={watch("filtroMes")}
                                filtroQuincena={watch("filtroQuincena")}
                                cargando={selectCargando}
                                meses={selectDatos || []}
                                creando={mutacionCreate.isPending}
                                camposValidos={isValid}
                                handleCambioFiltroQuincena={handleCambioFiltroQuincena}
                                handleCambioFiltroMes={handleCambioFiltroMes}
                                handleMostrarFormulario={handleMostrarFormulario}
                                estado={estadoEmpleado}
                                onCreate={handleSubmit(onCreate)}
                            />
                            <div className="flex grow flex-col justify-between w-full">
                                {formularioVisible ? (
                                    <Formulario
                                        formularioDatos={{
                                            tiposJornada: tiposJornada || [],
                                            tiposAusencia: tiposAusencia || [],
                                            id_ausencia,
                                            id_jornadaNormal
                                        }}
                                        formularioCargando={cargando}
                                        control={control}
                                        watch={watch}
                                        jornadaPartida={jornadaPartida}
                                        onCambioJornadaPartida={onCambioJornadaPartida}
                                        setValue={setValue}
                                    />
                                ) : (
                                    <>
                                        <TablaJornadas
                                            jornadas={jornadasDatos?.jornadas}
                                            cargando={jornadasCargando}
                                            filas={filasPorPagina}
                                        />
                                        {(jornadasCargando || (jornadasDatos?.jornadas.length ?? 0) > 0) && (
                                            <div className="flex justify-end items-end overflow-x-hide">
                                                <TablePagination
                                                    rowsPerPageOptions={[16, 31]}
                                                    component="div"
                                                    count={jornadasDatos?.totalJornadas || 0}
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
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    }
                </div>
            </TableCell>
        </TableRow>
    )
};