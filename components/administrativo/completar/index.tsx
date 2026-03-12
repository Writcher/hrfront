'use client'

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePaginacion } from '../../hooks/usePaginacion';
import { useTablaJornadasFiltro } from './hooks/useTablaJornadasFiltro';
import { setImportacionCompleta } from '@/services/importacion/service.importacion';
import { TablePagination } from '@mui/material';
import { TablaJornadas } from './components/tablaJornadas';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchJornadasPorImportacion } from '@/services/jornada/service.jornada';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { importacionJornadasProps } from './types';
import { useEstadoBoton } from './hooks/useEstadoBoton';
import { Botones } from './components/tablaJornadasBotones';
import { fetchTiposAusencia } from '@/services/tipoausencia/service.tipoausencia';
import { SetImportacionCompletaDto } from '@/lib/dtos/importacion';

export default function Completar({ id_importacion }: importacionJornadasProps) {

    const { watch } = useTablaJornadasFiltro();

    const { showSuccess, showError, showWarning } = useSnackbar();

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

    useEffect(() => {
        handleCambioPagina(null, 0);
    }, [watch('filtroMarcasIncompletas')]);

    const router = useRouter();

    const queryClient = useQueryClient();

    const { data: selectDatos, isError: selectError, isLoading: selectCargando } = useQuery({
        queryKey: ['fetchTiposAusencia'],
        queryFn: () => fetchTiposAusencia(),
        refetchOnWindowFocus: false
    });

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError } = useQuery({
        queryKey: [
            'fetchJornadasPorImportacion',
            pagina,
            filasPorPagina,
            watch('filtroMarcasIncompletas')
        ],
        queryFn: () => fetchJornadasPorImportacion({
            id_importacion,
            pagina: pagina,
            filasPorPagina: filasPorPagina,
        }),
        refetchOnWindowFocus: false,
    });

    const mutacionComplete = useMutation({
        mutationFn: (data: SetImportacionCompletaDto) => setImportacionCompleta(data),
        onSuccess: () => {
            showSuccess('Importación completada correctamente');
            queryClient.invalidateQueries({
                queryKey: ['fetchImportaciones']
            });
            router.push(`/administrativo/importaciones`);
        },
        onError: () => {
            showError('Error al completar importación');
        },
    });

    const onComplete = () => {
        mutacionComplete.mutate({ id: id_importacion });
    };

    useEffect(() => {
        if (jornadasError) {
            showWarning('Error al cargar las jornadas');
        };
        if (selectError) {
            showWarning('Error al cargar los datos');
        };
    }, [jornadasError, selectError, showWarning]);

    const deshabilitado = useEstadoBoton({ totalIncompletoProp: jornadasDatos?.totalJornadas, cargando: jornadasCargando });

    return (
        <div className='flex flex-col gap-2 sm:gap-3 items-start w-full h-full overflow-hidden'>
            <div className='flex flex-col w-full flex-1 min-h-0 rounded border-2 border-orange-500 overflow-hidden'>
                <TablaJornadas
                    jornadas={jornadasDatos?.jornadas || []}
                    cargando={jornadasCargando}
                    filas={filasPorPagina}
                    tiposAusencia={selectError ? [] : selectDatos}
                    tiposAusenciaCargando={selectCargando}
                />
                {(jornadasCargando || (jornadasDatos?.jornadas.length ?? 0) > 0) && (
                    <div className='shrink-0 flex justify-end items-center border-t-2 border-orange-500'>
                        <TablePagination
                            rowsPerPageOptions={[25, 50]}
                            component='div'
                            count={jornadasDatos?.totalJornadas || 0}
                            rowsPerPage={filasPorPagina}
                            page={pagina}
                            onPageChange={handleCambioPagina}
                            onRowsPerPageChange={handleCambioFilasPorPagina}
                            labelRowsPerPage='Filas por página'
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                            }
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
            </div>
            <Botones
                onComplete={onComplete}
                pendiente={mutacionComplete.isPending}
                deshabilitado={deshabilitado}
                cargando={jornadasCargando}
            />
        </div>
    );
};