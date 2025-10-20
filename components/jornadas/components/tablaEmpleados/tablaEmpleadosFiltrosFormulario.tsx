import { TextField, MenuItem, FormControlLabel } from "@mui/material";
import { formularioFiltrosPadreProps, proyecto, tipoEmpleado } from "../../types";
import { IOSSwitch } from "@/components/ui/switch";

export const Formulario = ({
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
}: formularioFiltrosPadreProps) => (
  <form className="flex items-center justify-start w-3/6 gap-3">
    {mostrarBusquedaNombre && (
      <TextField
        id="busquedaNombre"
        name="busquedaNombre"
        label="Buscar por Nombre de Empleado"
        type="search"
        variant="outlined"
        color="warning"
        size="small"
        fullWidth
        value={busquedaNombreNormal}
        onChange={onCambioBusquedaNombre}
      />
    )}
    {mostrarBusquedaLegajo && (
      <TextField
        id="busquedaLegajo"
        name="busquedaLegajo"
        label="Buscar por Legajo"
        type="number"
        variant="outlined"
        color="warning"
        size="small"
        fullWidth
        value={busquedaLegajoNormal}
        onChange={onCambioBusquedaLegajo}
      />
    )}
    {mostrarFiltroProyecto && (
      <TextField
        id="filtroProyecto"
        name="filtroProyecto"
        label="Filtrar por Proyecto"
        type="text"
        variant="outlined"
        color="warning"
        size="small"
        select
        fullWidth
        value={filtroProyecto}
        onChange={onCambioFiltroProyecto}
        disabled={proyectos.length === 0}
      >
        {proyectos.map((proyectos: proyecto) => (
          <MenuItem key={proyectos.id} value={proyectos.id}>
            {proyectos.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
    {mostrarFiltroTipoEmpleado && (
      <TextField
        id="filtroTipoEmpleado"
        name="filtroTipoEmpleado"
        label="Filtrar por Tipo de Empleado"
        type="text"
        variant="outlined"
        color="warning"
        size="small"
        select
        fullWidth
        value={filtroTipoEmpleado}
        onChange={onCambioFiltroTipoEmpleado}
        disabled={tiposEmpleado.length === 0}
      >
        {tiposEmpleado.map((tipoEmpleado: tipoEmpleado) => (
          <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
            {tipoEmpleado.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
    <FormControlLabel
      control={<IOSSwitch sx={{ m: 1 }} />}
      label="Fichajes Manuales"
      className="w-full !text-gray-700"
      onChange={onCambioFiltroMarcaManual}
      checked={filtroMarcaManual}
    />
  </form>
);