import { TextField, MenuItem } from "@mui/material";
import { formularioFiltrosProps, proyecto, tipoUsuario } from "../types";

export const FormularioFiltros = ({
  mostrarBusquedaNombre,
  mostrarFiltroTipoUsuario,
  busquedaNombreNormal,
  filtroTipoUsuario,
  tiposUsuario,
  onCambioBusquedaNombre,
  onCambioFiltroTipoUsuario,
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
    {mostrarFiltroTipoUsuario && (
      <TextField
        id="filtroTipoUsuario"
        name="filtroTipoUsuario"
        label="Filtrar por Tipo de Usuario"
        type="text"
        variant="outlined"
        color="warning"
        size="small"
        select
        fullWidth
        value={filtroTipoUsuario}
        onChange={onCambioFiltroTipoUsuario}
        disabled={tiposUsuario.length === 0}
      >
        {tiposUsuario.map((tipoEmpleado: tipoUsuario) => (
          <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
            {tipoEmpleado.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
  </form>
);