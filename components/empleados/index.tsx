'use client'

import { useEffect } from 'react';
import { Button, TablePagination } from '@mui/material';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useTablaEmpleadosFormulario } from './hooks/useTablaEmpleadosFormulario';
import { useFiltros } from './hooks/useFiltros';
import { MenuFiltros } from './components/tablaEmpleadosFiltrosMenu';
import { FormularioFiltros } from './components/tablaEmpleadosFiltrosFormulario';
import { FiltrosActivos } from './components/tablaEmpleadosFiltrosActivos';
import { TablaEmpleados } from './components/tablaEmpleados';
import { fetchEmpleados } from '@/services/empleado/service.empleado';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { getNombreProyecto, getNombreTipoEmpleado } from './utils';
import { BotonesFiltros } from './components/tablaEmpleadosFiltrosBotones';
import { usePaginacion } from '../hooks/usePaginacion';
import { useOrdenacion } from '../hooks/useOrdenacion';
import { useSelectDatos } from './hooks/useSelectDatos';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import Link from 'next/link';
import SyncIcon from '@mui/icons-material/Sync';
import { syncEmpleados } from '@/services/sync/sync.service';

export default function TablaEmpleadosLista({ esAdministrativo }: { esAdministrativo: boolean }) {

  const { watch, setValue } = useTablaEmpleadosFormulario();

  const { showSuccess, showError, showWarning } = useSnackbar();

  const {
    ancla,
    abrirFiltros,
    filtrosActivos,
    busquedaNombreVisible,
    filtroProyectoVisible,
    busquedaLegajoVisible,
    filtroTipoEmpleadoVisible,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioBusquedaLegajo,
    handleCambioFiltroProyecto,
    handleCambioFiltroTipoEmpleado,
    handleLimpiarFiltro,
    setBusquedaNombreVisible,
    setFiltroProyectoVisible,
    setBusquedaLegajoVisible,
    setFiltroTipoEmpleadoVisible
  } = useFiltros({ setValue });

  const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

  useEffect(() => {
    handleCambioPagina(null, 0);
  }, [
    watch('busquedaNombre'),
    watch('filtroProyecto'),
    watch('busquedaLegajo'),
    watch('filtroTipoEmpleado'),
  ]);

  const { direccion, columna, handleOrdenacion } = useOrdenacion({ columnaInicial: 'nombre' });

  const {
    proyectos,
    tiposEmpleado,
    turnos,
    cargando,
    error
  } = useSelectDatos();

  const { data: empleadosDatos, isLoading: empleadosCargando, isError: empleadosError, refetch: empleadosRefetch } = useQuery({
    queryKey: [
      'fetchEmpleadosTablaJornadas',
      pagina,
      filasPorPagina,
      columna,
      direccion,
      watch('busquedaNombre'),
      watch('filtroProyecto'),
      watch('busquedaLegajo'),
      watch('filtroTipoEmpleado'),
    ],
    queryFn: () => fetchEmpleados({
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaNombre: watch('busquedaNombre'),
      filtroProyecto: watch('filtroProyecto'),
      busquedaLegajo: watch('busquedaLegajo'),
      filtroTipoEmpleado: watch('filtroTipoEmpleado'),
    }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const getNombreProyectoPorId = getNombreProyecto(proyectos);
  const getNombreTipoEmpleadoPorId = getNombreTipoEmpleado(tiposEmpleado);

  const mutacionSync = useMutation({
    mutationFn: () => syncEmpleados(),
    onSuccess: () => {
      showSuccess('Empleados sincronizados correctamente');
      empleadosRefetch();
    },
    onError: () => {
      showError('Error al sincronizar empleados');
    },
  })

  useEffect(() => {
    if (error) {
      showWarning('Error al cargar los datos');
    };
    if (empleadosError) {
      showWarning('Error al cargar empleados');
    };
  }, [error, empleadosDatos, showWarning]);

  return (
    <div className='flex flex-col gap-2 sm:gap-3 items-start w-full h-full overflow-hidden'>
      {/* Filtros */}
      <div className='flex flex-row gap-2 w-full shrink-0 flex-wrap items-start'>
        <div className='shrink-0'>
          <BotonesFiltros
            onClick={handleClickFiltros}
            onClean={handleLimpiarFiltros}
          />
        </div>
        <MenuFiltros
          anchorEl={ancla}
          open={abrirFiltros}
          onClose={handleCerrarFiltros}
          onSeleccionBusquedaNombre={() => {
            setBusquedaNombreVisible(true);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionFiltroProyecto={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(true);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionBusquedaLegajo={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(true);
            setFiltroTipoEmpleadoVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionFiltroTipoEmpleado={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(true);
            handleCerrarFiltros();
          }}
        />
        <div className='flex-1 min-w-[280px] max-w-2xl'>
          <FormularioFiltros
            mostrarBusquedaNombre={busquedaNombreVisible}
            mostrarFiltroProyecto={filtroProyectoVisible}
            mostrarBusquedaLegajo={busquedaLegajoVisible}
            mostrarFiltroTipoEmpleado={filtroTipoEmpleadoVisible}
            busquedaNombreNormal={watch('busquedaNombreNormal')}
            filtroProyecto={watch('filtroProyecto')}
            busquedaLegajoNormal={watch('busquedaLegajoNormal')}
            filtroTipoEmpleado={watch('filtroTipoEmpleado')}
            proyectos={proyectos || []}
            tiposEmpleado={tiposEmpleado || []}
            onCambioBusquedaNombre={handleCambioBusquedaNombre}
            onCambioFiltroProyecto={handleCambioFiltroProyecto}
            onCambioBusquedaLegajo={handleCambioBusquedaLegajo}
            onCambioFiltroTipoEmpleado={handleCambioFiltroTipoEmpleado}
          />
        </div>
        <div className='flex grow shrink-0' />
        {esAdministrativo &&
          <Button
            variant='contained'
            color='info'
            size='small'
            className='!h-10'
            disableElevation
            component={Link}
            href={`/administrativo/empleados/asistencia`}
            endIcon={<NumbersRoundedIcon />}
          >
            Consultar Asistencia
          </Button>
        }
        <Button
          variant='contained'
          color='info'
          size='small'
          className='!h-10'
          disableElevation
          onClick={() => mutacionSync.mutate()}
          disabled={mutacionSync.isPending}
          endIcon={!mutacionSync.isPending ? <SyncIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
        >
          {!mutacionSync.isPending ? 'Sincronizar Empleados' : 'Sincronizando'}
        </Button>
      </div>
      {/* Filtros Activos */}
      <div className='shrink-0 w-full'>
        <FiltrosActivos
          filtrosActivos={filtrosActivos}
          getNombreProyectoPorId={getNombreProyectoPorId}
          getNombreTipoEmpleadoPorId={getNombreTipoEmpleadoPorId}
          handleLimpiarFiltro={handleLimpiarFiltro}
        />
      </div>
      {/* Tabla */}
      <div className='flex flex-col w-full flex-1 min-h-0 rounded border-2 border-orange-500 overflow-hidden'>
        <TablaEmpleados
          empleados={empleadosDatos?.empleados}
          cargando={empleadosCargando}
          filas={filasPorPagina}
          columna={columna}
          direccion={direccion}
          onOrden={handleOrdenacion}
        />
        {(empleadosCargando || (empleadosDatos?.empleados.length ?? 0) > 0) && (
          <div className='shrink-0 flex justify-end items-center border-t-2 border-orange-500'>
            <TablePagination
              rowsPerPageOptions={[25, 50, 75, 100]}
              component='div'
              count={empleadosDatos?.totalEmpleados || 0}
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