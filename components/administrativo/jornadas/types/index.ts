export type tablaJornadasFormularioDatos = {
    filtrosAncla: any
    filtrosActivos: { [key: string]: any }
    busquedaNombre: string
    busquedaNombreNormal: string
    mostrarBusquedaNombre: boolean
    filtroProyecto: number
    mostrarFiltroProyecto: boolean
    idFilaExpandida: number | null
    pagina: number
    filasPorPagina: number
    ordenDireccion: "ASC" | "DESC"
    ordenColumna: string
    filtroMes: number
    filtroQuincena: number
    filtroMarcasIncompletas: boolean
    paginaInterna: number
    filasPorPaginaInterna: number
};