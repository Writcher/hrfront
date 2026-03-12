export type TablaEmpleadosEncabezadoProps = {
  onOrden: (column: string) => void,
  columna: string,
  direccion: 'ASC' | 'DESC',
};