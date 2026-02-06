export type createTipoAusencialDTO = {
    nombre: string,
};

export type deleteTipoAusenciaDTO = {
    id_tipoausencia: number,
};

export type editTipoAusenciaDTO = {
    nombre: string,
    id_tipoausencia: number,
};

export type fetchTiposAusenciaPaginatedDTO = {
    pagina: number,
    filasPorPagina: number,
};