export type tablaEmpleadosFormularioDatos = {
    filtrosAncla: any
    filtrosActivos: { [key: string]: any }
    busquedaNombre: string
    busquedaNombreNormal: string
    mostrarBusquedaNombre: boolean
    filtroProyecto: number | ''
    mostrarFiltroProyecto: boolean
    idFilaExpandida: number | null
    pagina: number
    filasPorPagina: number
    ordenDireccion: "ASC" | "DESC"
    ordenColumna: string
};

export type tablaJornadasFormularioDatos = {
    filtroMes: number | ''
    filtroQuincena: number | ''
};

export type insertJornadaParametros = {
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