export type  fetchEmpleadosDTO = {
    busquedaNombre: string,
    filtroProyecto: number | '',
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: "ASC" | "DESC"
};
