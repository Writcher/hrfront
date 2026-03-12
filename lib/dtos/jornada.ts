export type FetchJornadasDto = {
    id_empleado: number | null,
    filtroMes: number | '',
    filtroQuincena: number | '',
    filtroMarcasIncompletas?: boolean,
    pagina: number,
    filasPorPagina: number,
    ausencias?: boolean,
    filtroTipoAusencia?: number | '',
};

export type FetchResumenDto = {
    id_empleado: number | null,
    filtroMes: number | '',
    filtroQuincena: number | '',
};

export type EditJornadaDto = {
    id: number,
    entrada: string | null,
    salida: string | null,
};

export type DeleteJornadaDto = {
    id: number,
};

export type ValidateJornadaDto = {
    id: number,
};

export type EditJornadaTipoAusenciaDto = {
    tipoAusencia: number | '',
    id_jornada: number,
};

export type CreateJornadaDto = {
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

export type FetchJornadasPorImportacionDto = {
    id_importacion: number;
    pagina: number;
    filasPorPagina: number;
};