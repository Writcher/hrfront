export type TablaEmpleadosProps = {
  empleados: TablaEmpleadosEmpleado[],
  cargando: boolean,
  idFilaExpandida: number | null,
  filas: number,
  columna: string,
  direccion: 'ASC' | 'DESC',
  onOrden: (column: string) => void,
  onExpandirFila: (id: number) => void,
  esAdministrativo?: boolean,
  esRRHH?: boolean,
};

export type TablaEmpleadosEmpleado = {
  id: number,
  legajo: number,
  dni: number,
  nombre: string,
  id_proyecto: number,
  nombreproyecto: string,
  estadoempleado: string,
  es_mensualizado: boolean,
};