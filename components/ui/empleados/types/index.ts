import { Control, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type tablaEmpleadosFormularioDatos = {
  filtrosAncla: any,
  filtrosActivos: { [key: string]: any },
  busquedaNombre: string,
  busquedaNombreNormal: string,
  mostrarBusquedaNombre: boolean,
  filtroProyecto: number | '',
  mostrarFiltroProyecto: boolean,
  busquedaLegajo: number | '',
  busquedaLegajoNormal: number | '',
  mostrarBusquedaLegajo: boolean,
  pagina: number,
  filasPorPagina: number,
  ordenDireccion: "ASC" | "DESC",
  ordenColumna: string,
};

export type empleadoFormularioDatos = {
  id_reloj: number | '',
  id_proyecto: number | '',
  legajo: number | '',
  nombre: string,
  formularioVisible: boolean,
  confirmarBaja: boolean,
};

export type insertempleadoParametros = {
  id_reloj: number | '',
  id_proyecto: number | '',
  legajo: number | '',
  nombre: string,
};

export type editEmpleadoParametros = {
  id_reloj: number | '',
  nombre: string,
  legajo: number | '',
  id: number,
};

export type proyecto = {
  id: number,
  nombre: string,
};

export type getNombreProyectoProps = {
  selectDatos: proyecto[],
};

export type botonesFiltrosProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onClean: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaEmpleadosFormularioDatos>,
  watch?: UseFormWatch<tablaEmpleadosFormularioDatos>,
  getValues?: UseFormGetValues<tablaEmpleadosFormularioDatos>,
};

export type hookGenericoHijoProps = {
  setValue: UseFormSetValue<empleadoFormularioDatos>,
  watch: UseFormWatch<empleadoFormularioDatos>,
};

export type filaBotonesProps = {
  editando: boolean,
  desactivando: boolean,
  isValid: boolean,
  estadoempleado: string,
  formularioVisible: boolean,
  handleMostrarFormulario: () => void,
  handleSubmit: () => void,
  onDeactivate: () => void,
  confirmarBaja: boolean,
  onClickBaja: (bool?: boolean) => void,
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

export type formularioFilaEmpleadoProps = {
  empleado: empleado;
};

export type empleadosDatos = {
  empleados: empleado[],
  totalEmpleados: number,
};

export type tablaEmpleadosProps = {
  empleadosDatos: empleadosDatos;
  empleadosCargando: boolean;
  filasPorPagina: number;
  ordenColumna: string;
  ordenDireccion: string;
  onOrden: (column: string) => void;
};


export type menuFiltrosProps = {
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void,
  onSeleccionBusquedaNombre: () => void,
  onSeleccionFiltroProyecto: () => void,
  onSeleccionBusquedaLegajo: () => void,
};

export type formularioFiltrosProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  busquedaNombreNormal: string,
  busquedaLegajoNormal: number | '',
  filtroProyecto: number | '',
  selectDatos: proyecto[],
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};


export type formularioProps = {
  control: Control<empleadoFormularioDatos>,
  selectCargando: boolean,
  selectDatos: proyecto[],
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
};
