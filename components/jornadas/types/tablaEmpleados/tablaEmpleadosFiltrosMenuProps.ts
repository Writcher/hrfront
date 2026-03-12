export type TablaEmpleadosFiltrosMenuProps = {
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void,
  onSeleccionBusquedaNombre: () => void,
  onSeleccionFiltroProyecto: () => void,
  onSeleccionBusquedaLegajo: () => void,
  onSeleccionFiltroTipoEmpleado: () => void,
};
