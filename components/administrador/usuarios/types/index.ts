import { Control, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

//schema

export type tipoUsuario = {
  id: number,
  nombre: string,
};

export type usuario = {
  id: number,
  nombre: string,
  correo: string,
  id_tipousuario: number,
  tipousuario: string,
};

//props

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaUsuariosFormularioDatos>,
  watch?: UseFormWatch<tablaUsuariosFormularioDatos>,
  getValues?: UseFormGetValues<tablaUsuariosFormularioDatos>,
  reset?: UseFormReset<tablaUsuariosFormularioDatos>,
};

export type hookGenericoHijoProps = {
  reset: UseFormReset<usuarioFormularioDatos>,
};

export type botonesFiltrosProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onClean: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

export type menuFiltrosProps = {
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void,
  onSeleccionBusquedaNombre: () => void,
  onSeleccionFiltroTipoUsuario: () => void,
};

export type formularioFiltrosProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroTipoUsuario: boolean,
  busquedaNombreNormal: string,
  filtroTipoUsuario: number | '',
  tiposUsuario: tipoUsuario[],
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroTipoUsuario: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreTipoUsuarioPorId: (id: number) => string,
};

export type formularioProps = {
  control: Control<usuarioFormularioDatos>,
  cargando: boolean,
  tiposUsuario: tipoUsuario[],
};

export type botonesFormularioProps = {
  handleMostrarFormulario: () => void,
  creando: boolean,
  camposValidos: boolean,
};

export type tablaUsuariosProps = {
  usuarios: usuario[];
  cargando: boolean;
  filas: number;
  columna: string;
  direccion: 'ASC' | 'DESC';
  onOrden: (column: string) => void;
};

export type encabezadoProps = {
  onOrden: (column: string) => void,
  columna: string,
  direccion: 'ASC' | 'DESC'
};

export type esqueletoProps = {
  filas: number,
};

export type formularioFilaUsuarioProps = {
  usuario: usuario;
};

export type filaBotonesProps = {
  editando: boolean,
  borrando: boolean,
  isValid: boolean,
  formularioVisible: boolean,
  handleMostrarFormulario: () => void,
  handleSubmit: () => void,
  onDelete: () => void,
  confirmarBorrar: boolean,
  onClickBorrar: (bool?: boolean) => void,
};

//useForm

export type tablaUsuariosFormularioDatos = {
  busquedaNombre: string,
  busquedaNombreNormal: string,
  filtroTipoUsuario: number | '',
};

export type usuarioFormularioDatos = {
  id_tipousuario: number | '',
  contraseña: string,
  nombre: string,
  correo: string,
};

//mutations

export type insertUsuarioParametros = {
  contraseña: string,
  correo: string,
  nombre: string,
  id_tipousuario: number | '',
};

export type editUsuarioParametros = {
  id: number,
  nombre: string,
  correo: string,
  id_tipousuario: number | '',
};

//responses





































