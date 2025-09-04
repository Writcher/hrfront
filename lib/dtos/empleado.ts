export type  fetchEmpleadosDTO = {
    busquedaNombre: string,
    filtroProyecto: number | '',
    busquedaLegajo: number | '',
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: "ASC" | "DESC"
};

export type editEmpleadoDTO = {
    id_reloj: number | '',
    nombre: string,
    legajo: number | '',
    id: number,
};