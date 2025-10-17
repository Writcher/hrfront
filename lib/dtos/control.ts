export type createControlDTO = {
    serie: string,
    id_proyecto: number,
};

export type deleteControlDTO = {
    id_control: number,
};

export type editControlDTO = {
    serie: string,
    id_proyecto: number,
    id_control: number,
};

export type fetchControlesABMDTO = {
    pagina: number,
    filasPorPagina: number,
};