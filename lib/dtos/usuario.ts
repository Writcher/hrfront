export type FetchUsuarioPorCorreoDto = {
    correo: string;
};

export type FetchUsuariosDto = {
    pagina: number,
    filasPorPagina: number,
    ordenColumna: string,
    ordenDireccion: string,
    busquedaNombre: string,
    filtroTipoUsuario: number | '',
};

export type CreateUsuarioDto = {
  contraseña: string,
  correo: string,
  nombre: string,
  id_tipousuario: number | '',
};

export type EditUsuarioDto = {
  id: number,
  nombre: string,
  correo: string,
  id_tipousuario: number | '',
};

export type DeleteUsuarioDto = {
  id: number,
};