export type CreateControlDto = {
    serie: string,
    id_proyecto: number,
};

export type DeleteControlDto = {
    id_control: number,
};

export type EditControlDto = {
    serie: string,
    id_proyecto: number,
    id_control: number,
};

export type FetchControlesPaginatedDto = {
    pagina: number,
    filasPorPagina: number,
};