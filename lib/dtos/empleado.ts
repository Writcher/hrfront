export type  fetchEmpleadosDTO = {
    busquedaNombre: string,
    filtroProyecto: number | '',
    busquedaLegajo: number | '',
    filtroTipoEmpleado: number | '',
    filtroTipoAusencia?: number | '',
    filtroMes?: number | '',
    filtroQuincena?: number | '',
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: "ASC" | "DESC",
};

export type editEmpleadoDTO = {
    id_reloj: number | '',
    nombre: string,
    legajo: number | '',
    id: number,
    id_tipoempleado: number | '',
    id_turno: number | '',
    id_proyecto: number | '',
};

export type fetchPresentesDTO = {
    fecha: string,
    proyecto: number | '',
    pagina: number,
    filasPorPagina: number,
};