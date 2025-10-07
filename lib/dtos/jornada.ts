export type fetchJornadasDTO = {
    id_empleado: number | null,
    filtroMes: number | '',
    filtroQuincena: number | '',
    filtroMarcasIncompletas?: boolean,
    pagina?: number,
    filasPorPagina?: number,
    ausencias?: boolean,
    filtroTipoAusencia?: number | '',
};

export type editJornadaDTO = {
    id: number,
    entrada: string | null,
    salida: string | null,
};

export type deleteJornadaDTO = {
    id: number,
};

export type validateJornadaDTO = {
    id: number,
};

export type updateJornadaTipoAusenciaDTO = {
    tipoAusencia: number | '',
    id_jornada: number,
};

export type insertJornadaDTO = {
    entrada: string | null,
    salida: string | null,
    entradaTarde: string | null,
    salidaTarde: string | null,
    fecha: string,
    id_tipojornada: number | '',
    id_tipoausencia: number | '',
    observacion: string,
    id_empleado: number,
};

export type fetchJornadasPorImportacionDTO = {
    filtroMarcasIncompletas: boolean;
    id_importacion: number;
    pagina: number;
    filasPorPagina: number;
};