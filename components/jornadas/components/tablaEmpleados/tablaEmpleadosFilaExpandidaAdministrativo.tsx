import { TableCell, TablePagination, TableRow } from "@mui/material";
import { useFiltrosInteriores } from "../../hooks/useFiltrosHijoAdministrativo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TablaJornadas } from "../tablaJornadas/tablaJornadas";
import { fetchDatosSelectFormularioJornada } from "@/services/jornada/service.jornadas";
import { useTablaJornadaFormulario } from "../../hooks/useTablaJornadasFormulario";
import { Formulario } from "../tablaJornadas/tablaJornadasFormularioCrear";
import { SubmitHandler } from "react-hook-form";
import { filaExpandidaProps, insertJornadaDatos, tablaJornadasFormularioDatos } from "../../types";
import { useJornadaPartida } from "../../hooks/useJornadaPartida";
import { fetchJornadas, insertJornada } from "@/services/jornada/service.jornada";
import { fetchMeses } from "@/services/mes/service.mes";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { Botones } from "../tablaJornadas/tablaJornadasFiltrosBotones";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";

export function FilaExpandidaAdministrativo({ idFilaExpandida, idFilaExpandidaProp, estadoEmpleado }: filaExpandidaProps) {

    const { watch, setValue, control, handleSubmit, formState: { isValid }, reset } = useTablaJornadaFormulario();

    const { showSuccess, showError, showWarning } = useSnackbar();

    const { handleLimpiarFiltros, handleCambioFiltroMes, handleCambioFiltroQuincena, handleCambioFiltroMarcasIncompletas } = useFiltrosInteriores({ setValue, watch });

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 16 });

    const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

    const { onCambioJornadaPartida, jornadaPartida } = useJornadaPartida();


    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchMeses"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });

    const { data: formularioDatos, isLoading: formularioCargando, isError: formularioError } = useQuery({
        queryKey: ["fetchDatosSelectFormularioJornada"],
        queryFn: () => fetchDatosSelectFormularioJornada(),
        refetchOnWindowFocus: false,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError, refetch: jornadasRefetch } = useQuery({
        queryKey: [
            "fetchJornadasEmpleado",
            idFilaExpandida,
            watch("filtroMes"),
            watch("filtroQuincena"),
            watch("filtroMarcasIncompletas"),
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
            filtroMarcasIncompletas: watch("filtroMarcasIncompletas"),
            pagina: pagina,
            filasPorPagina: filasPorPagina
        }),
        refetchOnWindowFocus: false
    });

    const mutacionCreate = useMutation({
        mutationFn: (datos: insertJornadaDatos) => insertJornada(datos),
        onSuccess: () => {
            showSuccess("Jornada creada correctamente");
            jornadasRefetch();
            handleMostrarFormulario();
        },
        onError: (error) => {
            showError("Error al crear jornada");
        }
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
            duracionAusencia: datos.duracionAusencia,
            observacion: datos.observacion,
            id_empleado: idFilaExpandida !== null ? idFilaExpandida : 0,
        });
    };

    useEffect(() => {
        if (selectError || formularioError) {
            showWarning("Error al cargar los datos");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [selectError, formularioDatos, jornadasDatos, showWarning]);

    const normalizedFormularioDatos = formularioDatos
    ? { ...formularioDatos, tiposJornada: formularioDatos.tiposJornada || [], tiposAusencia: formularioDatos.tiposAusencia || [] }
    : undefined;

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px]" style={{ border: "2px solid #ED6C02", }}>
                    <Botones
                        formularioVisible={formularioVisible}
                        handleLimpiarFiltros={handleLimpiarFiltros}
                        filtroMes={watch("filtroMes")}
                        filtroQuincena={watch("filtroQuincena")}
                        filtroMarcasIncompletas={watch("filtroMarcasIncompletas")}
                        cargando={selectCargando}
                        meses={selectDatos || []}
                        creando={mutacionCreate.isPending}
                        camposValidos={isValid}
                        handleCambioFiltroMarcasIncompletas={handleCambioFiltroMarcasIncompletas}
                        handleCambioFiltroQuincena={handleCambioFiltroQuincena}
                        handleCambioFiltroMes={handleCambioFiltroMes}
                        handleMostrarFormulario={handleMostrarFormulario}
                        estado={estadoEmpleado}
                        onCreate={handleSubmit(onCreate)}
                    />
                    <div className="flex grow flex-col justify-between w-full">
                        {formularioVisible ? (
                            <Formulario
                                formularioDatos={normalizedFormularioDatos}
                                formularioCargando={formularioCargando}
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
                </div>
            </TableCell>
        </TableRow>
    )
};