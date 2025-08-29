import { Menu, MenuItem } from "@mui/material";

interface MenuFiltrosProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSeleccionBusquedaNombre: () => void;
  onSeleccionFiltroProyecto: () => void;
}

export const MenuFiltros: React.FC<MenuFiltrosProps> = ({
  anchorEl,
  open,
  onClose,
  onSeleccionBusquedaNombre,
  onSeleccionFiltroProyecto
}) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onSeleccionBusquedaNombre}>Buscar por Nombre de Empleado</MenuItem>
    <MenuItem onClick={onSeleccionFiltroProyecto}>Filtrar por Proyecto</MenuItem>
  </Menu>
);