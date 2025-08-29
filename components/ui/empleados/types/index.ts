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

export type empleadoFormularioDatos = {
    id_reloj: number | '',
    id_proyecto: number | '',
    legajo: number | '',
    nombre: string,
    formularioVisible: boolean,
};

export type insertempleadoParametros = {
    id_reloj: number | '',
    id_proyecto: number | '',
    legajo: number | '',
    nombre: string,
};