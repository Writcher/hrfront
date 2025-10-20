import { BaseSyntheticEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Control, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

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
  tipojornada: number,
  tipoausencia: number
  id: number,
  observaciones: string[],
  es_manual: boolean,
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

export type tablaJornadasEmpleadosProps = {
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
};

export type formularioFiltrosPadreProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  mostrarFiltroTipoEmpleado: boolean,
  filtroMarcaManual: boolean,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  busquedaLegajoNormal: number | '',
  filtroTipoEmpleado: number | '',
  proyectos: proyecto[],
  tiposEmpleado: tipoEmpleado[],
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroTipoEmpleado: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroMarcaManual: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
  getNombreTipoEmpleadoPorId: (id: number) => string,
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
};

export type filaExpandidaProps = {
  idFilaExpandida: number,
  idFilaExpandidaProp: number | null,
  estadoEmpleado: string,
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
};

export type filaJornadaProps = {
  jornada: jornada,
};

export type formularioFiltrosHijoProps = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  filtroMarcasIncompletas: boolean,
  cargando: boolean,
  meses: mes[],
  onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroMarcaIncompleta: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
  getNombreMes: (mes: number) => string,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaEmpleadosFiltrosDatos>,
  watch?: UseFormWatch<tablaEmpleadosFiltrosDatos>,
  getValues?: UseFormGetValues<tablaEmpleadosFiltrosDatos>,
};

export type hookGenericoHijoAdministrativoProps<T extends keyof hookGenericoHijoAdministrativoPropsBase = keyof hookGenericoHijoAdministrativoPropsBase> = Required<Pick<hookGenericoHijoAdministrativoPropsBase, T>>;

export type hookGenericoHijoAdministrativoPropsBase = {
  setValue?: UseFormSetValue<tablaJornadasFormularioDatos>,
  watch?: UseFormWatch<tablaJornadasFormularioDatos>,
  reset?: UseFormReset<tablaJornadasFormularioDatos>,
};

export type hookGenericoHijoRRHHProps<T extends keyof hookGenericoHijoRRHHPropsBase = keyof hookGenericoHijoRRHHPropsBase> = Required<Pick<hookGenericoHijoRRHHPropsBase, T>>;

export type hookGenericoHijoRRHHPropsBase = {
  setValue?: UseFormSetValue<tablaJornadasResumenFormularioDatos>,
  watch?: UseFormWatch<tablaJornadasResumenFormularioDatos>,
  getValues?: UseFormGetValues<tablaJornadasResumenFormularioDatos>,
};

export type informacionProps = {
  jornada: jornada,
  dia: number,
  setObservacionFormulario: Dispatch<SetStateAction<boolean>>
};

export type formularioObservacionProps = {
  fecha: string,
  dia: number,
  control: Control<useObservacionFormularioDatos>,
  creando: boolean,
  camposValidos: boolean,
  onCreate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  setObservacionFormulario: Dispatch<SetStateAction<boolean>>,
};

export type tooltipObservacionesProps = {
  observaciones: string[],
};

export type formularioCrearJornadaProps = {
  formularioDatos: formularioDatos | undefined,
  formularioCargando: boolean,
  control: Control<tablaJornadasFormularioDatos>,
  watch: UseFormWatch<tablaJornadasFormularioDatos>,
  onCambioJornadaPartida: () => void;
  jornadaPartida: boolean;
  setValue: UseFormSetValue<tablaJornadasFormularioDatos>,
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

export type tablaJornadasResumenProps = {
  resumen: resumen,
  cargando: boolean,
  es_mensualizado: boolean,
};

export type tablaJornadasResumenObservacionesProps = {
  observaciones: observacionResumen[],
  cargando: boolean,
  filas: number,
};

export type useTablaJornadaResumenFormularioProps = {
  meses: mes[],
};

export type tablaResumenFilaProps = {
  resumen: resumen
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
  filtroMarcaManual: boolean,
};

export type useObservacionFormularioDatos = {
  observacion: string,
};

export type tablaJornadasFormularioDatos = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  filtroMarcasIncompletas: boolean,
  entrada: string | null,
  salida: string | null,
  entradaTarde: string | null,
  salidaTarde: string | null,
  tipoJornada: number | '',
  fecha: string,
  tipoAusencia: number | '',
  duracionAusencia: number | '',
  observacion: string,
};

export type tablaJornadasResumenFormularioDatos = {
  filtroMes: number | '',
  filtroQuincena: number | '',
};

//mutations

export type insertJornadaDatos = {
  entrada: string | null,
  salida: string | null,
  entradaTarde: string | null,
  salidaTarde: string | null,
  fecha: string,
  id_tipojornada: number | '',
  id_tipoausencia: number | '',
  duracionAusencia: number | '',
  observacion: string,
  id_empleado: number,
};

export type insertObservacionDatos = {
  observacion: string,
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

export type formularioDatos = {
  tiposJornada: tipoJornada[],
  tiposAusencia: tipoAusencia[],
  id_jornadaNormal: number,
  id_ausencia: number,
};

export type resumen = {
  suma_total: number,
  suma_total_normal: number,
  suma_total_50: number,
  suma_total_100: number,
  suma_total_feriado: number,
  suma_total_nocturno: number,
  total_asistencias: number,
  total_ausencias_injustificadas: number,
  total_ausencias_justificadas: number,
};

export type observacionResumen = {
  id: number,
  texto: string,
  fecha: string,
};