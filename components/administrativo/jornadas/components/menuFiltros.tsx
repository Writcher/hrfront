import { Menu, MenuItem } from "@mui/material";
import { menuFiltrosProps } from "../types";

export const MenuFiltros = ({
  anchorEl,
  open,
  onClose,
  onSeleccionBusquedaNombre,
  onSeleccionFiltroProyecto
}: menuFiltrosProps) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onSeleccionBusquedaNombre}>Buscar por Nombre de Empleado</MenuItem>
    <MenuItem onClick={onSeleccionFiltroProyecto}>Filtrar por Proyecto</MenuItem>
  </Menu>
);