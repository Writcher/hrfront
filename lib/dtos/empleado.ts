export type  FetchEmpleadosDto = {
    busquedaNombre: string,
    filtroProyecto: number | '',
    busquedaLegajo: number | '',
    filtroTipoEmpleado: number | '',
    filtroTipoAusencia?: number | '',
    filtroMes?: number | '',
    filtroQuincena?: number | '',
    filtroMarcaManual?: boolean,
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: "ASC" | "DESC",
};

export type EditEmpleadoDto = {
    id: number,
    id_modalidadvalidacion: number | '',
};

export type FetchAsistenciaDto = {
    fecha: string,
    proyecto: number | '',
    pagina: number,
    filasPorPagina: number,
};

export type CreateEmpleadoDto = {
  dni: number | '',
  id_proyecto: number | '',
  legajo: number | '',
  nombre: string,
  id_tipoempleado: number | '',
};

export type DeactivateEmpleadoDto = {
    id: number;
};