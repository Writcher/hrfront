import { SyntheticEvent } from "react";
import { Control, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type tablaEmpleadosFormularioDatos = {
  filtrosAncla: any,
  filtrosActivos: { [key: string]: any },
  busquedaNombre: string,
  busquedaNombreNormal: string,
  mostrarBusquedaNombre: boolean,
  filtroProyecto: number | '',
  mostrarFiltroProyecto: boolean,
  idFilaExpandida: number | null,
  pagina: number,
  filasPorPagina: number,
  ordenDireccion: "ASC" | "DESC",
  ordenColumna: string,
};

export type tablaJornadasFormularioDatos = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  filtroMarcasIncompletas: boolean,
  pagina: number,
  filasPorPagina: number,
  formularioVisible: boolean,
  entrada: string | null,
  salida: string | null,
  entradaTarde: string | null,
  salidaTarde: string | null,
  tipoJornada: number | '',
  fecha: string,
  tipoAusencia: number | '',
  observacion: string,
  jornadaPartida: boolean,
};

export type proyecto = {
  id: number,
  nombre: string,
};

export type tooltipObservacionesProps = {
    observaciones: string[],
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
};

export type jornadasDatos = {
  jornadas: jornada[],
  totalJornadas: number,
};

export type tablaJornadasProps = {
  jornadasDatos: jornadasDatos,
  jornadasCargando: boolean,
  filasPorPagina: number,
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

export type selectDatos = {
  id: number,
  nombre: string,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaEmpleadosFormularioDatos>,
  watch?: UseFormWatch<tablaEmpleadosFormularioDatos>,
  getValues?: UseFormGetValues<tablaEmpleadosFormularioDatos>,
};

export type hookGenericoHijoProps<T extends keyof hookGenericoHijoPropsBase = keyof hookGenericoHijoPropsBase> = Required<Pick<hookGenericoHijoPropsBase, T>>;

export type hookGenericoHijoPropsBase = {
  setValue?: UseFormSetValue<tablaJornadasFormularioDatos>,
  watch?: UseFormWatch<tablaJornadasFormularioDatos>,
  getValues?: UseFormGetValues<tablaJornadasFormularioDatos>,
};

export type botonesFiltrosProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onClean: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
};

export type empleado = {
  id: number,
  legajo: number,
  id_reloj: number,
  nombre: string,
  id_proyecto: number,
  nombreproyecto: string,
  estadoempleado: string,
};

export type filaEmpleadoProps = {
  empleado: empleado,
  idFilaExpandidaProp: number | null,
  onExpandirFila: (id: number) => void,
};

export type empleadosDatos = {
  empleados: empleado[],
  totalEmpleados: number,
};

export type tablaEmpleadosProps = {
  empleadosDatos: empleadosDatos,
  empleadosCargando: boolean,
  idFilaExpandida: number | null,
  filasPorPagina: number,
  ordenColumna: string,
  ordenDireccion: string,
  onOrden: (column: string) => void,
  onExpandirFila: (id: number) => void,
};

export type menuFiltrosProps = {
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void,
  onSeleccionBusquedaNombre: () => void,
  onSeleccionFiltroProyecto: () => void,
};

export type formularioFiltrosPadreProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  selectDatos: selectDatos[],
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type formularioDatos = {
  tiposJornada: selectDatos[],
  tiposAusencia: selectDatos[],
  id_jornadaNormal: number,
  id_ausencia: number,
  id_jornadaPartida?: number,
};

export type formularioCrearJornadaProps = {
  formularioDatos: formularioDatos | undefined,
  formularioCargando: boolean,
  control: Control<tablaJornadasFormularioDatos>,
  watch: UseFormWatch<tablaJornadasFormularioDatos>,
  switchFormulario: {
    onCambioJornadaPartida: () => void;
    jornadaPartida: boolean;
  },
  setValue: UseFormSetValue<tablaJornadasFormularioDatos>,
};

export type filaExpandidaEmpleadoProps = {
  idFilaExpandida: number,
  idFilaExpandidaProp: number | null,
  estadoEmpleado: string,
};

export type filaJornadaProps = {
  jornada: jornada
};

export type formularioFiltrosHijoProps = {
    filtroMes: number | '',
    filtroQuincena: number | '',
    filtroMarcasIncompletas: boolean,
    selectCargando: boolean,
    selectDatos: selectDatos[],
    onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onCambioFiltroMarcaIncompleta: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
    getNombreMes: (mes: number) => string,
};