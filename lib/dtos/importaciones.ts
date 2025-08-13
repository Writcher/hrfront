export type fetchImportacionesParams = {
    filtroIncompletas: boolean;
    filtroProyecto: number;
    pagina: number;
    filasPorPagina: number;
};

export type fetchImportacionJornadasParams = {
    filtroMarcasIncompletas: boolean;
    idImportacion: number;
    pagina: number;
    filasPorPagina: number;
};