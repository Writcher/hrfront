import { Button, TableCell, TablePagination, TableRow } from "@mui/material";
import { useFiltrosInteriores } from "../hooks/useFiltrosHijo";
import { usePaginacion } from "../hooks/usePaginacionHijo";
import { useMutation, useQuery } from "@tanstack/react-query";
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { FormularioFiltros } from "./formularioFiltrosHijo";
import { TablaJornadas } from "./tablaJornadas";
import { fetchDatosSelectFormularioJornada } from "@/services/jornada/service.jornadas";
import { useMostrarFormulario } from "../hooks/useMostrarFormulario";
import { useTablaJornadaFormulario } from "../hooks/useTablaJornadasFormulario";
import { FormularioCrearJornada } from "./formularioCrearJornada";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { SubmitHandler } from "react-hook-form";
import { filaExpandidaEmpleadoProps, insertJornadaParametros, tablaJornadasFormularioDatos } from "../types";
import { useSwitchFormulario } from "../hooks/useSwitchFormulario";
import { fetchJornadas, insertJornada } from "@/services/jornada/service.jornada";
import { fetchMeses } from "@/services/mes/service.mes";
import SyncIcon from '@mui/icons-material/Sync';
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";

export function FilaExpandidaEmpleado({
    idFilaExpandida,
    idFilaExpandidaProp,
    estadoEmpleado
}: filaExpandidaEmpleadoProps) {

    const { watch, setValue, control, handleSubmit, formState: { isValid }} = useTablaJornadaFormulario();
    const { showSuccess, showError, showWarning } = useSnackbar();

    const filtros = useFiltrosInteriores({ setValue, watch });
    const paginacion = usePaginacion({ setValue, watch });
    const formularioVisible = useMostrarFormulario({ setValue, watch });
    const switchFormulario = useSwitchFormulario({ setValue, watch });

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchDatosSelectTablaJornadas"],
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
            paginacion.pagina,
            paginacion.filasPorPagina
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
            filtroMarcasIncompletas: watch("filtroMarcasIncompletas"),
            pagina: paginacion.pagina,
            filasPorPagina: paginacion.filasPorPagina
        }),
        refetchOnWindowFocus: false
    });

    const mutacionCreate = useMutation({
        mutationFn: (datos: insertJornadaParametros) => insertJornada(datos),
        onSuccess: () => {
            showSuccess("Jornada creada correctamente");
            jornadasRefetch();
            formularioVisible.handleMostrarFormulario();
        },
        onError: (error) => {
            showError("Error al crear jornada");
        }
    });

    const onSubmit: SubmitHandler<tablaJornadasFormularioDatos> = (datos) => {
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
        if (selectError || formularioError) {
            showWarning("Error al cargar los datos");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [selectError, formularioDatos, jornadasDatos, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px] pt-[10px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row gap-2 w-full h-11 items-center">
                        {formularioVisible.formularioVisible ? (
                            <></>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    className="!h-[40px]"
                                    disableElevation
                                    onClick={filtros.handleLimpiarFiltros}
                                    endIcon={<FilterAltOffRoundedIcon />}
                                >
                                    Limpiar Filtros
                                </Button>
                                <FormularioFiltros
                                    filtroMes={watch("filtroMes")}
                                    filtroQuincena={watch("filtroQuincena")}
                                    filtroMarcasIncompletas={watch("filtroMarcasIncompletas")}
                                    selectCargando={selectCargando}
                                    selectDatos={selectDatos}
                                    onCambioFiltroMes={filtros.handleCambioFiltroMes}
                                    onCambioFiltroQuincena={filtros.handleCambioFiltroQuincena}
                                    onCambioFiltroMarcaIncompleta={filtros.handleCambioFiltroMarcasIncompletas}
                                    getNombreMes={filtros.getNombreMes}
                                />
                                <div className="flex grow" />
                            </>
                        )}
                        <Button
                            variant="contained"
                            color={formularioVisible.formularioVisible ? "error" : "success"}
                            size="small"
                            className="!h-[40px]"
                            disableElevation
                            onClick={formularioVisible.handleMostrarFormulario}
                            endIcon={formularioVisible.formularioVisible ? <CloseRoundedIcon /> : <UploadRoundedIcon />}
                            disabled={estadoEmpleado.toLowerCase() === 'baja'}
                            
                        >
                            {formularioVisible.formularioVisible ? "Cancelar" : "Carga Manual"}
                        </Button>
                        {formularioVisible.formularioVisible ? (
                            <>
                                <div className="flex grow" />
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    className="!h-[40px]"
                                    disableElevation
                                    endIcon={
                                        mutacionCreate.isPending ? (
                                            <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                                        ) : <SaveAsRoundedIcon />
                                    }
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={mutacionCreate.isPending || !isValid}
                                >
                                    {!mutacionCreate.isPending ? "Guardar" : "Guardando"}
                                </Button>
                            </>
                        ) :
                            <></>
                        }
                    </div>
                    <div className="flex grow flex-col justify-between w-full">
                        {formularioVisible.formularioVisible ? (
                            <FormularioCrearJornada
                                formularioDatos={formularioDatos}
                                formularioCargando={formularioCargando}
                                control={control}
                                watch={watch}
                                switchFormulario={switchFormulario}
                                setValue={setValue}
                            />
                        ) : (
                            <>
                                <TablaJornadas
                                    jornadasDatos={jornadasDatos}
                                    jornadasCargando={jornadasCargando}
                                    filasPorPagina={paginacion.filasPorPagina}
                                />
                                <div className="flex justify-end items-end overflow-x-hide">
                                    <TablePagination
                                        rowsPerPageOptions={[16, 31]}
                                        component="div"
                                        count={jornadasDatos?.totalJornadas || 0}
                                        rowsPerPage={paginacion.filasPorPagina}
                                        page={paginacion.pagina}
                                        onPageChange={paginacion.handleCambioPagina}
                                        onRowsPerPageChange={paginacion.handleCambioFilasPorPagina}
                                        labelRowsPerPage="Filas por página"
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                                        slotProps={{
                                            select: {
                                                MenuProps: {
                                                    anchorOrigin: { vertical: "top", horizontal: "right" },
                                                    transformOrigin: { vertical: "top",  horizontal: "left" }
                                                },
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
};