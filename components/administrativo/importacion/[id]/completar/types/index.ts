export type TablaImportacionJornadasFormularioDatos = {
    pagina: number;
    filasPorPagina: number;
    filtroMarcasIncompletas: boolean;
    totalIncompleto: number;
};

export type FormularioJornadaFormularioDatos = {
    id: number,
    entrada: string | null, 
    salida: string | null, 
};