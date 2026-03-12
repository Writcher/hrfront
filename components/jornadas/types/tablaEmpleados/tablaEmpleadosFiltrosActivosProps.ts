export type TablaEmpleadosFiltrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
  getNombreTipoEmpleadoPorId: (id: number) => string,
  handleLimpiarFiltro: (key: string) => void,
};