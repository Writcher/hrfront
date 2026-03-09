export type CreateTipoAusencialDto = {
    nombre: string,
};

export type DeleteTipoAusenciaDto = {
    id_tipoausencia: number,
};

export type EditTipoAusenciaDto = {
    nombre: string,
    id_tipoausencia: number,
};

export type FetchTiposAusenciaPaginatedDto = {
    pagina: number,
    filasPorPagina: number,
};