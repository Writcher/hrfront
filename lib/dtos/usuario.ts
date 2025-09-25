export type fetchUsuarioPorCorreoDTO = {
    correo: string;
};

export type fetchUsuariosDTO = {
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: string,
    busquedaNombre: string,
    filtroTipoUsuario: number | '',
};