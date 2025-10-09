import { BaseSyntheticEvent, SyntheticEvent } from "react";
import { Control, FieldValues, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

//schema

export type proyecto = {
  id: number,
  nombre: string,
};

export type tipoEmpleado = {
  id: number,
  nombre: string,
};

export type jornada = {
  fecha: string,
  nombreempleado: string,
  estadojornada: string,
  entrada: string,
  salida: string,
  entrada_r: string,
  salida_r: string,
  total: number,
  tipojornada: string,
  tipoausencia: string
  id: number,
  observaciones: string[],
};

export type empleado = {
  id: number,
  legajo: number,
  id_reloj: number,
  nombre: string,
  id_proyecto: number,
  nombreproyecto: string,
  estadoempleado: string,
  es_mensualizado: boolean,
};

export type tipoJornada = {
  id: number,
  nombre: string,
};

export type tipoAusencia = {
  id: number,
  nombre: string,
};

export type mes = {
  id: number,
  mes: number,
  id_año: number,
};

//props

export type tablaAusenciasEmpleadosProps = {
  esAdministrativo?: boolean,
  esRRHH?: boolean,
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
  onSeleccionFiltroProyecto: () => void,
  onSeleccionBusquedaLegajo: () => void,
  onSeleccionFiltroTipoEmpleado: () => void,
  onSeleccionFiltroTipoAusencia: () => void,
};

export type formularioFiltrosPadreProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  mostrarFiltroTipoEmpleado: boolean,
  mostrarFiltroTipoAusencia: boolean,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  busquedaLegajoNormal: number | '',
  filtroTipoEmpleado: number | '',
  filtroTipoAusencia: number | '',
  filtroMes: number | '',
  filtroQuincena: number | '',
  proyectos: proyecto[],
  tiposEmpleado: tipoEmpleado[],
  tiposAusencia: tipoAusencia[],
  meses: mes[],
  cargando: boolean,
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroTipoEmpleado: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroTipoAusencia: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
  getNombreTipoEmpleadoPorId: (id: number) => string,
  getNombreTipoAusenciaPorId: (id: number) => string,
  getNombreMesPorId: (id: number) => string,
  handleLimpiarFiltro: (key: string) => void,
};

export type tablaEmpleadosProps = {
  empleados: empleado[],
  cargando: boolean,
  idFilaExpandida: number | null,
  filas: number,
  columna: string,
  direccion: 'ASC' | 'DESC',
  onOrden: (column: string) => void,
  onExpandirFila: (id: number) => void,
  esAdministrativo?: boolean,
  esRRHH?: boolean,
  filtroTipoAusencia: number | '',
  filtroMes: number | '',
  filtroQuincena: number | '',
};

export type encabezadoProps = {
  onOrden: (column: string) => void
  columna: string
  direccion: 'ASC' | 'DESC'
};

export type esqueletoProps = {
  filas: number,
};

export type filaEmpleadoProps = {
  empleado: empleado,
  idFilaExpandidaProp: number | null,
  onExpandirFila: (id: number) => void,
  esAdministrativo?: boolean,
  esRRHH?: boolean,
  filtroTipoAusencia: number | '',
  filtroMes: number | '',
  filtroQuincena: number | '',
};

export type filaExpandidaProps = {
  idFilaExpandida: number,
  idFilaExpandidaProp: number | null,
  filtroTipoAusencia: number | '',
  filtroMes: number | '',
  filtroQuincena: number | '',
};

export type botonesFiltrosHijoProps = {
  formularioVisible: boolean,
  handleLimpiarFiltros: () => void,
  filtroMes: number | '',
  filtroQuincena: number | '',
  filtroMarcasIncompletas: boolean,
  cargando: boolean,
  meses: mes[],
  creando: boolean,
  camposValidos: boolean,
  handleCambioFiltroMarcasIncompletas: () => void,
  handleCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleMostrarFormulario: () => void,
  estado: string,
  onCreate: (event?: React.BaseSyntheticEvent) => Promise<void>,
};

export type tablaJornadasProps = {
  jornadas: jornada[],
  cargando: boolean,
  filas: number,
  filtroTipoAusencia: number | '',
};

export type filaJornadaProps = {
  jornada: jornada,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaEmpleadosFiltrosDatos>,
  watch?: UseFormWatch<tablaEmpleadosFiltrosDatos>,
  getValues?: UseFormGetValues<tablaEmpleadosFiltrosDatos>,
};

export type hookGenericoHijoProps<T extends FieldValues> = {
  reset: UseFormReset<T>;
};

export type informacionProps = {
  jornada: jornada,
  dia: number,
  setObservacionFormulario: () => void,
  setTipoAusenciaFormulario: () => void,
};

export type formularioObservacionProps = {
  fecha: string,
  dia: number,
  control: Control<useObservacionFormularioDatos>,
  creando: boolean,
  camposValidos: boolean,
  onCreate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  setObservacionFormulario: () => void,
};

export type formularioTipoAusenciaProps = {
  jornada: jornada,
  dia: number,
  control: Control<useFormularioTipoAusenciaDatos>,
  tiposAusencia: tipoAusencia[],
  actualizando: boolean,
  camposValidos: boolean,
  onUpdate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  setTipoAusenciaFormulario: () => void,
};


export type tooltipObservacionesProps = {
  observaciones: string[],
};

export type filaExpandidaEmpleadoProps = {
  idFilaExpandida: number,
  idFilaExpandidaProp: number | null,
  es_mensualizado: boolean,
};

export type formularioFiltrosProps = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  selectCargando: boolean,
  selectDatos: mes[],
  onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tablaJornadasResumenObservacionesProps = {
  observaciones: observacionResumen[],
  cargando: boolean,
  filas: number,
};

export type useTablaJornadaResumenFormularioProps = {
  meses: mes[],
};

export type tablaObservacionesFilaProps = {
  observacion: observacionResumen
};

//useForm

export type tablaEmpleadosFiltrosDatos = {
  busquedaNombre: string,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  busquedaLegajo: number | '',
  busquedaLegajoNormal: number | '',
  filtroTipoEmpleado: number | '',
  filtroTipoAusencia: number | '',
  filtroMes: number | '',
  filtroQuincena: number | '',
};

export type useObservacionFormularioDatos = {
  observacion: string,
};

export type useFormularioTipoAusenciaDatos = {
  tipoAusencia: number | '',
};

//mutations

export type insertObservacionDatos = {
  observacion: string,
  id_jornada: number,
};

export type updateTipoAusenciaDatos = {
  tipoAusencia: number | '',
  id_jornada: number,
};

//responses

export type jornadasDatos = {
  jornadas: jornada[],
  totalJornadas: number,
};

export type empleadosDatos = {
  empleados: empleado[],
  totalEmpleados: number,
};

export type observacionResumen = {
  id: number,
  texto: string,
  fecha: string,
};