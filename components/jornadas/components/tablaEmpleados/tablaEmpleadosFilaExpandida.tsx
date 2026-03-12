import { Button, Divider, TableCell, TablePagination, TableRow } from '@mui/material';
import { useFiltrosInteriores } from '../../hooks/useFiltrosHijoAdministrativo';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { TablaJornadas } from '../tablaJornadas/tablaJornadas';
import { useTablaJornadasForm } from '../../hooks/useTablaJornadasForm';
import { TablaJornadasFormulario } from '../tablaJornadas/tablaJornadasFormularioCrear';
import { SubmitHandler } from 'react-hook-form';
import { useJornadaPartida } from '../../hooks/useJornadaPartida';
import { fetchJornadas, createJornada, fetchResumen } from '@/services/jornada/service.jornada';
import { fetchMeses } from '@/services/mes/service.mes';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { useEffect, useState } from 'react';
import { usePaginacion } from '@/components/hooks/usePaginacion';
import { TablaJornadasFiltrosBotones } from '../tablaJornadas/tablaJornadasFiltrosBotones';
import { useMostrarFormulario } from '../../hooks/useMostrarFormulario';
import { useDatosFormularioCrearJornada } from '../../hooks/useSelectDatosFormulario';
import { useTablaResumenFiltrosForm } from '../../hooks/useTablaResumenFiltrosForm';
import { useFiltros } from '../../hooks/useFiltrosHijoRRHH';
import { fetchObservacionesEmpleado } from '@/services/observacion/service.observacion';
import { TablaResumen } from '../tablaResumen/tablaResumen';
import { TablaObservaciones } from '../tablaObservaciones/tablaObservaciones';
import { TablaResumenFiltrosFormulario } from '../tablaResumen/tablaResumenFiltrosFormulario';
import { CreateJornadaDto } from '@/lib/dtos/jornada';
import { TablaEmpleadosFilaExpandidaProps } from '../../types/tablaEmpleados/tablaEmpleadosFilaExpandidaProps';
import { useTablaJornadasFiltrosForm } from '../../hooks/useTablaJornadasFiltrosForm';
import { TablaJornadasForm } from '../../types/tablaJornadas/useTablaJornadasForm';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';

export function TablaEmpleadoFilaExpanida({
    idFilaExpandida,
    idFilaExpandidaProp,
    estadoEmpleado,
    es_mensualizado,
    esAdministrativo
}: TablaEmpleadosFilaExpandidaProps) {

    const { showSuccess, showError, showWarning } = useSnackbar();

    const [alternarLista, setAlternarLista] = useState<'resumen' | 'jornadas'>(esAdministrativo ? 'jornadas' : 'resumen');

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ['fetchMeses'],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    //Jornadas

    const {
        watch,
        setValue,
        control,
        handleSubmit,
        formState: { isValid },
        reset
    } = useTablaJornadasForm();

    const {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena
    } = useFiltrosInteriores({ setValue });

    const {
        pagina,
        filasPorPagina,
        handleCambioPagina,
        handleCambioFilasPorPagina
    } = usePaginacion({ filasIniciales: 16 });

    useEffect(() => {
        handleCambioPagina(null, 0);
    }, [
        watch('filtroMes'),
        watch('filtroQuincena'),
    ]);

    const {
        formularioVisible,
        handleMostrarFormulario
    } = useMostrarFormulario({ reset });

    const {
        onCambioJornadaPartida,
        jornadaPartida
    } = useJornadaPartida();

    const {
        tiposJornada,
        tiposAusencia,
        id_ausencia,
        id_jornadaNormal,
        cargando,
        error
    } = useDatosFormularioCrearJornada();

    const {
        data: jornadasDatos,
        isLoading: jornadasCargando,
        isError: jornadasError, refetch:
        jornadasRefetch
    } = useQuery({
        queryKey: [
            'fetchJornadasEmpleado',
            idFilaExpandida,
            watch('filtroMes'),
            watch('filtroQuincena'),
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch('filtroMes'),
            filtroQuincena: watch('filtroQuincena'),
            pagina: pagina,
            filasPorPagina: filasPorPagina
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const mutacionCreate = useMutation({
        mutationFn: (datos: CreateJornadaDto) => createJornada(datos),
        onSuccess: () => {
            showSuccess('Jornada creada correctamente');
            jornadasRefetch();
            handleMostrarFormulario();
        },
        onError: (error) => {
            showError('Error al crear jornada');
        }
    });

    const onCreate: SubmitHandler<TablaJornadasForm> = (datos) => {
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

    //Resumen

    const {
        pagina: paginaObservaciones,
        filasPorPagina: filasPorPaginaObservaciones,
        handleCambioPagina: handleCambioPaginaObservaciones,
        handleCambioFilasPorPagina: handleCambioFilasPorPaginaObservaciones
    } = usePaginacion({ filasIniciales: 5 });

    const {
        watch: watchResumen,
        setValue: setValueResumen
    } = useTablaResumenFiltrosForm({ meses: selectDatos });

    const {
        handleLimpiarFiltros: handleLimpiarFiltrosResumen,
        handleCambioFiltroMes: handleCambioFiltroMesResumen,
        handleCambioFiltroQuincena: handleCambioFiltroQuincenaResumen
    } = useFiltros({ setValue: setValueResumen });

    useEffect(() => {
        handleCambioPaginaObservaciones(null, 0);
    }, [
        watchResumen('filtroMes'),
        watchResumen('filtroQuincena'),
    ]);

    const {
        data: resumenDatos,
        isLoading: resumenCargando,
        isError: resumenError,
        refetch: resumenRefetch
    } = useQuery({
        queryKey: [
            'fetchResumenEmpleado',
            idFilaExpandida,
            watchResumen('filtroMes'),
            watchResumen('filtroQuincena'),
        ],
        queryFn: () => fetchResumen({
            id_empleado: idFilaExpandida,
            filtroMes: watchResumen('filtroMes'),
            filtroQuincena: watchResumen('filtroQuincena'),
        }),
        refetchOnWindowFocus: false,
    });

    const {
        data: observacionesDatos,
        isLoading: observacionesCargando,
        isError: observacionesError,
        refetch: observacionesRefetch
    } = useQuery({
        queryKey: [
            'fetchObservacionesEmpleado',
            idFilaExpandida,
            watchResumen('filtroMes'),
            watchResumen('filtroQuincena'),
            paginaObservaciones,
            filasPorPaginaObservaciones
        ],
        queryFn: () => fetchObservacionesEmpleado({
            id_empleado: idFilaExpandida,
            filtroMes: watchResumen('filtroMes'),
            filtroQuincena: watchResumen('filtroQuincena'),
            pagina: paginaObservaciones,
            filasPorPagina: filasPorPaginaObservaciones,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (selectError || error) {
            showWarning('Error al cargar los datos');
        };
        if (jornadasError) {
            showWarning('Error al cargar jornadas');
        };
        if (resumenError) {
            showWarning('Error al cargar resumen');
        };
        if (observacionesError) {
            showWarning('Error al cargar observaciones');
        };
    }, [selectError, error, jornadasDatos, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: '4px' }}>
                <div className='flex flex-col gap-2 sm:gap-3 items-start w-full h-full overflow-hidden bg-white border-2 border-orange-500 rounded'>
                    {/* Tabs */}
                    <div className='flex flex-rows gap-2 w-full shrink-0 p-2'>
                        <Button
                            variant='contained'
                            className={`hover:!bg-orange-100 hover:!text-orange-600 !border-2 hover:!border-orange-500 ${alternarLista === 'resumen' ? '!bg-orange-100 !text-orange-600 !border-orange-500' : '!bg-gray-100 !text-gray-700 !border-gray-500'}`}
                            disableElevation
                            fullWidth
                            onClick={() => {
                                setAlternarLista('resumen');
                                handleCambioPaginaObservaciones(null, 0);
                                resumenRefetch();
                                observacionesRefetch();
                            }}
                        >
                            Resumen
                        </Button>
                        <Button
                            variant='contained'
                            className={`hover:!bg-orange-100 hover:!text-orange-600 !border-2 hover:!border-orange-500 ${alternarLista === 'jornadas' ? '!bg-orange-100 !text-orange-600 !border-orange-500' : '!bg-gray-100 !text-gray-700 !border-gray-500'}`}
                            fullWidth
                            disableElevation
                            onClick={() => {
                                setAlternarLista('jornadas');
                                handleCambioPagina(null, 0);
                                jornadasRefetch();
                            }}
                        >
                            Jornadas
                        </Button>
                    </div>
                    {alternarLista === 'resumen' &&
                        <>
                            {/* Filtros */}
                            <div className='flex flex-row gap-2 w-full shrink-0 flex-wrap items-start px-2'>
                                <div className='shrink-0'>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        size='small'
                                        className='!h-[40px]'
                                        disableElevation
                                        onClick={handleLimpiarFiltrosResumen}
                                        endIcon={<FilterAltOffRoundedIcon />}
                                    >
                                        Limpiar Quincena
                                    </Button>
                                </div>
                                <div className='flex-1 max-w-[640px]'>
                                    <TablaResumenFiltrosFormulario
                                        filtroMes={watchResumen('filtroMes')}
                                        filtroQuincena={watchResumen('filtroQuincena')}
                                        selectCargando={selectCargando}
                                        selectDatos={selectDatos}
                                        onCambioFiltroMes={handleCambioFiltroMesResumen}
                                        onCambioFiltroQuincena={handleCambioFiltroQuincenaResumen}
                                    />
                                </div>
                            </div>
                            {/* Tablas */}
                            <div className='flex flex-col w-full flex-1 min-h-0 overflow-hidden'>
                                <div className='flex w-full h-full p-5'>
                                    <TablaResumen
                                        resumen={resumenDatos?.resumen}
                                        cargando={resumenCargando}
                                        es_mensualizado={es_mensualizado}
                                    />
                                </div>
                                {observacionesDatos?.observaciones && observacionesDatos?.observaciones.length > 0 &&
                                    <>
                                        <Divider variant='middle' sx={{ bgcolor: '#F97316', height: '2px' }} flexItem />
                                        <div className='flex w-full h-full px-5 pt-5'>
                                            <TablaObservaciones
                                                observaciones={observacionesDatos?.observaciones}
                                                cargando={observacionesCargando}
                                                filas={filasPorPaginaObservaciones}
                                            />
                                        </div>
                                        <div className='shrink-0 flex justify-end items-center'>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                component='div'
                                                count={observacionesDatos?.totalObservaciones || 0}
                                                rowsPerPage={filasPorPaginaObservaciones}
                                                page={paginaObservaciones}
                                                onPageChange={handleCambioPaginaObservaciones}
                                                onRowsPerPageChange={handleCambioFilasPorPaginaObservaciones}
                                                labelRowsPerPage='Filas por página'
                                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                                                slotProps={{
                                                    select: {
                                                        MenuProps: {
                                                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                                            transformOrigin: { vertical: 'top', horizontal: 'left' }
                                                        },
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                }
                            </div>
                        </>
                    }
                    {alternarLista === 'jornadas' &&
                        <>
                            {/* Filtros */}
                            <div className='flex flex-row gap-2 w-full shrink-0 flex-wrap items-start px-2'>
                                <TablaJornadasFiltrosBotones
                                    formularioVisible={formularioVisible}
                                    handleLimpiarFiltros={handleLimpiarFiltros}
                                    filtroMes={watch('filtroMes')}
                                    filtroQuincena={watch('filtroQuincena')}
                                    cargando={selectCargando}
                                    meses={selectDatos || []}
                                    creando={mutacionCreate.isPending}
                                    camposValidos={isValid}
                                    handleCambioFiltroQuincena={handleCambioFiltroQuincena}
                                    handleCambioFiltroMes={handleCambioFiltroMes}
                                    handleMostrarFormulario={handleMostrarFormulario}
                                    estado={estadoEmpleado}
                                    onCreate={handleSubmit(onCreate)}
                                    esAdministrativo={esAdministrativo}
                                />
                            </div>
                            {/* Tabla */}
                            <div className='flex flex-col w-full flex-1 min-h-0 rounded overflow-hidden'>
                                {formularioVisible ? (
                                    <TablaJornadasFormulario
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
                                            <div className='flex justify-end items-end overflow-x-hide'>
                                                <TablePagination
                                                    rowsPerPageOptions={[16, 31]}
                                                    component='div'
                                                    count={jornadasDatos?.totalJornadas || 0}
                                                    rowsPerPage={filasPorPagina}
                                                    page={pagina}
                                                    onPageChange={handleCambioPagina}
                                                    onRowsPerPageChange={handleCambioFilasPorPagina}
                                                    labelRowsPerPage='Filas por página'
                                                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                                                    slotProps={{
                                                        select: {
                                                            MenuProps: {
                                                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                                                transformOrigin: { vertical: 'top', horizontal: 'left' }
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