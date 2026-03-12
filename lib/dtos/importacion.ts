export type fetchImportacionesDTO = {
    filtroIncompletas: boolean;
    filtroProyecto: number | '';
    pagina: number;
    filasPorPagina: number;
};

export type DeleteImportacionDto = {
    id: number;
};

export type SetImportacionCompletaDto = {
    id: number;
};

export type FetchImportacionesDto = {
    filtroIncompletas: boolean;
    filtroProyecto: number | '';
    pagina: number;
    filasPorPagina: number;
};