import { TextField, MenuItem, FormControlLabel } from '@mui/material';
import { IOSSwitch } from '@/components/ui/switch';
import { TablaEmpleadosFiltrosFormularioProps } from '../../types/tablaEmpleados/tablaEmpleadosFiltrosFormularioProps';
import { Proyecto } from '@/lib/types/entites/proyecto';
import { TipoEmpleado } from '@/lib/types/entites/tipoEmpleado';

export const TablaEmpleadosFiltrosFormulario = ({
  mostrarBusquedaNombre,
  mostrarFiltroProyecto,
  mostrarBusquedaLegajo,
  mostrarFiltroTipoEmpleado,
  busquedaNombreNormal,
  filtroProyecto,
  busquedaLegajoNormal,
  filtroTipoEmpleado,
  filtroMarcaManual,
  proyectos,
  tiposEmpleado,
  onCambioBusquedaNombre,
  onCambioFiltroProyecto,
  onCambioBusquedaLegajo,
  onCambioFiltroTipoEmpleado,
  onCambioFiltroMarcaManual,
}: TablaEmpleadosFiltrosFormularioProps) => (
  <form className='flex items-center justify-start w-full gap-2 sm:gap-3'>
    {mostrarBusquedaNombre && (
      <TextField
        id='busquedaNombre'
        name='busquedaNombre'
        label='Buscar por Nombre de Empleado'
        type='search'
        variant='outlined'
        color='warning'
        size='small'
        fullWidth
        value={busquedaNombreNormal}
        onChange={onCambioBusquedaNombre}
      />
    )}
    {mostrarBusquedaLegajo && (
      <TextField
        id='busquedaLegajo'
        name='busquedaLegajo'
        label='Buscar por Legajo'
        type='number'
        variant='outlined'
        color='warning'
        size='small'
        fullWidth
        value={busquedaLegajoNormal}
        onChange={onCambioBusquedaLegajo}
      />
    )}
    {mostrarFiltroProyecto && (
      <TextField
        id='filtroProyecto'
        name='filtroProyecto'
        label='Filtrar por Proyecto'
        type='text'
        variant='outlined'
        color='warning'
        size='small'
        select
        fullWidth
        value={filtroProyecto}
        onChange={onCambioFiltroProyecto}
        disabled={proyectos.length === 0}
        slotProps={{
          select: {
            MenuProps: {
              slotProps: {
                paper: {
                  style: {
                    marginTop: '4px',
                    maxHeight: '200px',
                  },
                },
              },
            },
          },
        }}
      >
        {proyectos.map((proyectos: Proyecto) => (
          <MenuItem key={proyectos.id} value={proyectos.id}>
            {proyectos.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
    {mostrarFiltroTipoEmpleado && (
      <TextField
        id='filtroTipoEmpleado'
        name='filtroTipoEmpleado'
        label='Filtrar por Tipo de Empleado'
        type='text'
        variant='outlined'
        color='warning'
        size='small'
        select
        fullWidth
        value={filtroTipoEmpleado}
        onChange={onCambioFiltroTipoEmpleado}
        disabled={tiposEmpleado.length === 0}
        slotProps={{
          select: {
            MenuProps: {
              slotProps: {
                paper: {
                  style: {
                    marginTop: '4px',
                    maxHeight: '200px',
                  },
                },
              },
            },
          },
        }}
      >
        {tiposEmpleado.map((tipoEmpleado: TipoEmpleado) => (
          <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
            {tipoEmpleado.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
    <FormControlLabel
      control={<IOSSwitch sx={{ m: 1 }} />}
      label='Fichajes Manuales'
      className='shrink-0 !text-gray-700 whitespace-nowrap'
      onChange={onCambioFiltroMarcaManual}
      checked={filtroMarcaManual}
    />
  </form>
);