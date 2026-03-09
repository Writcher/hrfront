export type ExportResumenDto = {
    proyectos: number[];
    mes: number | '';
    quincena: number | '';
    tipoEmpleado: number | '';
};

export type ExportAsistenciaDto = {
    fecha: string,
    proyecto: number | '',
};