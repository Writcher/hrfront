import { TextField, MenuItem } from "@mui/material";

interface FormularioFiltrosProps {
  mostrarBusquedaNombre: boolean;
  mostrarFiltroProyecto: boolean;
  busquedaNombreNormal: string;
  filtroProyecto: number | '';
  selectDatos: any[];
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormularioFiltros: React.FC<FormularioFiltrosProps> = ({
  mostrarBusquedaNombre,
  mostrarFiltroProyecto,
  busquedaNombreNormal,
  filtroProyecto,
  selectDatos,
  onCambioBusquedaNombre,
  onCambioFiltroProyecto
}) => (
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
        {selectDatos?.map((proyectos: { id: number, nombre: string }) => (
          <MenuItem key={proyectos.id} value={proyectos.id}>
            {proyectos.nombre}
          </MenuItem>
        ))}
      </TextField>
    )}
  </form>
);