export type fetchImportacionesDTO = {
    filtroIncompletas: boolean;
    filtroProyecto: number | "";
    pagina: number;
    filasPorPagina: number;
};

export type setImportacionCompletaDTO = {
    id: number;
};