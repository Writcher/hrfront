'use client'

import { useEffect } from 'react';
import { Button, TablePagination } from '@mui/material';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTablaEmpleadosFiltros } from './hooks/useTablaEmpleadosFiltros';
import { useFiltros } from './hooks/useFiltrosPadre';
import { useExpansion } from '../hooks/useExpansion';
import { TablaEmpleadosFiltrosMenu } from './components/tablaEmpleados/tablaEmpleadosFiltrosMenu';
import { TablaEmpleadosFiltrosFormulario } from './components/tablaEmpleados/tablaEmpleadosFiltrosFormulario';
import { TablaEmpleadosFiltrosActivos } from './components/tablaEmpleados/tablaEmpleadosFiltrosActivos';
import { TablaEmpleados } from './components/tablaEmpleados/tablaEmpleados';
import { fetchEmpleados } from '@/services/empleado/service.empleado';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { getNombreProyecto, getNombreTipoEmpleado } from './utils';
import { TablaEmpleadosFiltrosBotones } from './components/tablaEmpleados/tablaEmpleadosFiltrosBotones';
import { usePaginacion } from '@/components/hooks/usePaginacion';
import { useOrdenacion } from '../hooks/useOrdenacion';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useSelectDatos } from './hooks/useSelectDatosPadre';
import { TablaEmpleadosJornadasProps } from './types/tablaEmpleadosJornadasProps';

export default function EmpleadosJornadas({ esAdministrativo, esRRHH }: TablaEmpleadosJornadasProps) {

  const { 
    watch, 
    setValue 
  } = useTablaEmpleadosFiltros();

  const { showWarning } = useSnackbar();

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
    handleCambioFiltroProyecto,
    handleCambioBusquedaLegajo,
    handleCambioFiltroTipoEmpleado,
    handleLimpiarFiltro,
    handleCambioFiltroMarcaManual,
    setBusquedaNombreVisible,
    setFiltroProyectoVisible,
    setBusquedaLegajoVisible,
    setFiltroTipoEmpleadoVisible
  } = useFiltros({ setValue, watch });

  const { 
    pagina, 
    filasPorPagina, 
    handleCambioPagina, 
    handleCambioFilasPorPagina 
  } = usePaginacion({ filasIniciales: 25 });

  useEffect(() => {
    handleCambioPagina(null, 0);
  }, [
    watch('busquedaNombre'),
    watch('filtroProyecto'),
    watch('busquedaLegajo'),
    watch('filtroTipoEmpleado'),
  ]);

  const { 
    direccion,
    columna, 
    handleOrdenacion 
  } = useOrdenacion({ columnaInicial: 'nombre' });

  const { 
    idFila, 
    handleExpansionFila 
  } = useExpansion();

  const {
    proyectos,
    tiposEmpleado,
    error
  } = useSelectDatos();

  const { 
    data: empleadosDatos, 
    isLoading: empleadosCargando, 
    isError: empleadosError 
  } = useQuery({
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
      watch('filtroMarcaManual'),
    ],
    queryFn: () => fetchEmpleados({
      busquedaNombre: watch('busquedaNombre'),
      filtroProyecto: watch('filtroProyecto'),
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaLegajo: watch('busquedaLegajo'),
      filtroTipoEmpleado: watch('filtroTipoEmpleado'),
      filtroMarcaManual: watch('filtroMarcaManual')
    }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const getNombreProyectoPorId = getNombreProyecto(proyectos);
  const getNombreTipoEmpleadoPorId = getNombreTipoEmpleado(tiposEmpleado);

  useEffect(() => {
    if (error) {
      showWarning('Error al cargar los datos');
    };
    if (empleadosError) {
      showWarning('Error al cargar empleados');
    };
  }, [error, empleadosError, showWarning]);

  return (
    <div className='flex flex-col gap-2 sm:gap-3 items-start w-full h-full overflow-hidden'>
      {/* Filtros */}
      <div className='flex flex-row gap-2 w-full shrink-0 flex-wrap items-start'>
        <div className='shrink-0'>
          <TablaEmpleadosFiltrosBotones
            onClick={handleClickFiltros}
            onClean={handleLimpiarFiltros}
          />
        </div>
        <TablaEmpleadosFiltrosMenu
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
          <TablaEmpleadosFiltrosFormulario
            mostrarBusquedaNombre={busquedaNombreVisible}
            mostrarFiltroProyecto={filtroProyectoVisible}
            mostrarBusquedaLegajo={busquedaLegajoVisible}
            mostrarFiltroTipoEmpleado={filtroTipoEmpleadoVisible}
            busquedaNombreNormal={watch('busquedaNombreNormal')}
            filtroProyecto={watch('filtroProyecto')}
            busquedaLegajoNormal={watch('busquedaLegajoNormal')}
            filtroTipoEmpleado={watch('filtroTipoEmpleado')}
            filtroMarcaManual={watch('filtroMarcaManual')}
            proyectos={proyectos || []}
            tiposEmpleado={tiposEmpleado || []}
            onCambioBusquedaNombre={handleCambioBusquedaNombre}
            onCambioFiltroProyecto={handleCambioFiltroProyecto}
            onCambioBusquedaLegajo={handleCambioBusquedaLegajo}
            onCambioFiltroTipoEmpleado={handleCambioFiltroTipoEmpleado}
            onCambioFiltroMarcaManual={handleCambioFiltroMarcaManual}
          />
        </div>
        <div className='flex grow shrink-0' />
        {esAdministrativo
          ? <Button
            component={Link}
            href={'/administrativo/importaciones/importar'}
            variant='contained'
            color='success'
            className='!h-full'
            disableElevation
            endIcon={<UploadFileRoundedIcon />}
          >
            Importar Informe
          </Button>
          : esRRHH
            ? <Button
              component={Link}
              href={'/rrhh/jornadas/exportar'}
              variant='contained'
              color='success'
              className='!h-full'
              disableElevation
              endIcon={<DownloadRoundedIcon />}
            >
              Exportar Informe
            </Button>
            : null
        }
      </div>
      {/* Filtros Activos */}
      <div className='shrink-0 w-full'>
        <TablaEmpleadosFiltrosActivos
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
          idFilaExpandida={idFila}
          filas={filasPorPagina}
          columna={columna}
          direccion={direccion}
          onOrden={handleOrdenacion}
          onExpandirFila={handleExpansionFila}
          esAdministrativo={esAdministrativo}
          esRRHH={esRRHH}
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
};