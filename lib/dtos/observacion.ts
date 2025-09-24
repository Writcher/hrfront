export type fetchObservacionesEmpleadoDTO = {
    id_empleado: number,
    filtroMes: number | '',
    filtroQuincena: number | '',
    pagina: number,
    filasPorPagina: number,
};