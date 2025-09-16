import { Menu, MenuItem } from "@mui/material";
import { menuFiltrosProps } from "../../types";

export const MenuFiltros = ({
  anchorEl,
  open,
  onClose,
  onSeleccionBusquedaNombre,
  onSeleccionFiltroProyecto,
  onSeleccionBusquedaLegajo
}: menuFiltrosProps) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onSeleccionBusquedaNombre}>Buscar por Nombre de Empleado</MenuItem>
    <MenuItem onClick={onSeleccionFiltroProyecto}>Filtrar por Proyecto</MenuItem>
    <MenuItem onClick={onSeleccionBusquedaLegajo}>Buscar por Legajo</MenuItem>
  </Menu>
);