'use client'

import { TablePagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useTablaImportacionesFiltros } from './hooks/useTablaImportacionesFiltros';
import { useFiltros } from './hooks/useFiltros';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchImportaciones } from '@/services/importacion/service.importacion';
import { TablaImportaciones } from './components/tablaImportaciones';
import { fetchProyectos } from '@/services/proyecto/service.proyecto';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { TablaImportacionesFiltros } from './components/tablaImportacionesFiltros';
import { usePaginacion } from '@/components/hooks/usePaginacion';
import { importacionesProps } from './types';

export default function Importaciones({ esAdministrativo }: importacionesProps) {

    const { setValue, watch } = useTablaImportacionesFiltros();

    const { showWarning } = useSnackbar();

    const { handleCambioFiltroIncompletas, handleCambioFiltroProyecto, handleLimpiarFiltros } = useFiltros({ setValue, watch });

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 16 });

    useEffect(() => {
        handleCambioPagina(null, 0);
    }, [
        watch('filtroProyecto'),
        watch('filtroIncompletas')
    ]);

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ['fetchProyectos'],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false
    });

    const { data: importacionesDatos, isLoading: importacionesCargando, isError: importacionesError } = useQuery({
        queryKey: [
            'fetchImportaciones',
            pagina,
            filasPorPagina,
            watch('filtroProyecto'),
            watch('filtroIncompletas')
        ],
        queryFn: () => fetchImportaciones({
            filtroIncompletas: watch('filtroIncompletas'),
            filtroProyecto: watch('filtroProyecto'),
            pagina: pagina,
            filasPorPagina: filasPorPagina
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (selectError) {
            showWarning('Error al cargar los datos');
        };
        if (importacionesError) {
            showWarning('Error al cargar importaciones');
        };
    }, [selectError, importacionesError, showWarning]);

    return (
        <div className='flex flex-col gap-2 sm:gap-3 items-start w-full h-full overflow-hidden'>
            <div className='flex flex-row gap-2 w-full shrink-0 flex-wrap items-start'>
                <TablaImportacionesFiltros
                    proyectos={selectDatos || []}
                    cargando={selectCargando}
                    filtroIncompletas={watch('filtroIncompletas')}
                    filtroProyecto={watch('filtroProyecto')}
                    handleLimpiarFiltros={handleLimpiarFiltros}
                    onCambioFiltroIncompletas={handleCambioFiltroIncompletas}
                    onCambioFiltroProyecto={handleCambioFiltroProyecto}
                    esAdministrativo={esAdministrativo}
                />
            </div>
            <div className='flex flex-col w-full flex-1 min-h-0 rounded border-2 border-orange-500 overflow-hidden'>
                <TablaImportaciones
                    importaciones={importacionesDatos?.importaciones || []}
                    cargando={importacionesCargando}
                    filas={filasPorPagina}
                    esAdministrativo={esAdministrativo}
                />
                {(importacionesCargando || (importacionesDatos?.importaciones.length ?? 0) > 0) && (
                    <div className='shrink-0 flex justify-end items-center border-t-2 border-orange-500'>
                        <TablePagination
                            rowsPerPageOptions={[16, 31]}
                            component='div'
                            count={importacionesDatos?.totalImportaciones || 0}
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
        </div>
    );
}