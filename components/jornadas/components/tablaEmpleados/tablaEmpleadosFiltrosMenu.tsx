import { Menu, MenuItem } from "@mui/material";
import { menuFiltrosProps } from "../../types";

export const MenuFiltros = ({
  anchorEl,
  open,
  onClose,
  onSeleccionBusquedaNombre,
  onSeleccionFiltroProyecto,
  onSeleccionBusquedaLegajo,
  onSeleccionFiltroTipoEmpleado,
}: menuFiltrosProps) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onSeleccionBusquedaNombre}>Buscar por Nombre de Empleado</MenuItem>
    <MenuItem onClick={onSeleccionFiltroTipoEmpleado}>Filtrar por Tipo de Empleado</MenuItem>
    <MenuItem onClick={onSeleccionBusquedaLegajo}>Buscar por Legajo</MenuItem>
    <MenuItem onClick={onSeleccionFiltroProyecto}>Filtrar por Proyecto</MenuItem>
  </Menu>
);