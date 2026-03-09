export type FetchObservacionesEmpleadoDto = {
    id_empleado: number,
    filtroMes: number | '',
    filtroQuincena: number | '',
    pagina: number,
    filasPorPagina: number,
};

export type CreateObservacionDto = {
  observacion: string,
  id_jornada: number,
};

export type DeleteObservacionDto = {
    id: number,
};