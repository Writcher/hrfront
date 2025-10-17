export type insertProyectoDTO = {
    id_modalidadtrabajo: number,
    nombre: string,
};

export type editProyectoDTO = {
    id_proyecto: number,
    id_modalidadtrabajo: number,
    nombre: string,
};

export type deleteProyectoDTO = {
    id_proyecto: number,
};

export type fetchProyectosABMDTO = {
    pagina: number,
    filasPorPagina: number,
};