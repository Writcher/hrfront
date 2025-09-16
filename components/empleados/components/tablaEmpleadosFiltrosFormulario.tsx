import { TextField, MenuItem } from "@mui/material";
import { formularioFiltrosProps, proyecto } from "../types";

export const FormularioFiltros = ({
mostrarBusquedaNombre,
  mostrarFiltroProyecto,
  mostrarBusquedaLegajo,
  busquedaNombreNormal,
  filtroProyecto,
  busquedaLegajoNormal,
  proyectos,
  onCambioBusquedaNombre,
  onCambioFiltroProyecto,
  onCambioBusquedaLegajo
}: formularioFiltrosProps) => (
  <form className="flex items-center justify-start w-2/6">
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
      >
        {proyectos?.map((proyecto: proyecto) => (
          <MenuItem key={proyecto.id} value={proyecto.id}>
            {proyecto.nombre}
          </MenuItem>
        )) || []}
      </TextField>
    )}
  </form>
);