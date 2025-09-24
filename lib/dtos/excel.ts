export type insertJornadasExcelDTO = {
    archivo: File | null;
    proyecto: number | '';
    tipoJornada: number | '';
    tipoInforme: number | '';
};

export type exportJornadasExcelDTO = {
    proyecto: number | '';
    mes: number | '';
    quincena: number | '';
};