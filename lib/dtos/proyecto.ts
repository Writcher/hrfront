export type CreateProyectoDto = {
    id_modalidadtrabajo: number,
    nombre: string,
    nomina: string,
};

export type EditProyectoDto = {
    id_proyecto: number,
    id_modalidadtrabajo: number,
    nombre: string,
    nomina: string,
};

export type DeleteProyectoDto = {
    id_proyecto: number,
};

export type FetchProyectosPaginatedDto = {
    pagina: number,
    filasPorPagina: number,
};