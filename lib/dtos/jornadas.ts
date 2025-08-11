export type  fetchEmpleadosTablaJornadasParams = {
    busquedaNombre: string,
    filtroProyecto: number,
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: "ASC" | "DESC"
};

export type fetchJornadasEmpleadosParams = {
    idEmpleado: number | null,
    filtroMes: number,
    filtroQuincena: number,
    filtroMarcasIncompletas: boolean,
    pagina: number,
    filasPorPagina: number,
};