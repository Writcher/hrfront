import { Control, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

//schema

export type proyecto = {
  id: number,
  nombre: string
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

//props

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaEmpleadosFormularioDatos>,
  watch?: UseFormWatch<tablaEmpleadosFormularioDatos>,
  getValues?: UseFormGetValues<tablaEmpleadosFormularioDatos>,
  reset?: UseFormReset<tablaEmpleadosFormularioDatos>,
};

export type hookGenericoHijoProps = {
  reset: UseFormReset<empleadoFormularioDatos>,
};

export type getNombreProyectoProps = {
  selectDatos: proyecto[],
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
};

export type formularioFiltrosProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  busquedaNombreNormal: string,
  busquedaLegajoNormal: number | '',
  filtroProyecto: number | '',
  proyectos: proyecto[],
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
};

export type formularioProps = {
  control: Control<empleadoFormularioDatos>,
  cargando: boolean,
  proyectos: proyecto[],
};

export type botonesFormularioProps = {
  handleMostrarFormulario: () => void,
  creando: boolean,
  camposValidos: boolean,
};

export type tablaEmpleadosProps = {
  empleados: empleado[];
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

export type formularioFilaEmpleadoProps = {
  empleado: empleado;
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

//useForm

export type tablaEmpleadosFormularioDatos = {
  busquedaNombre: string,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  busquedaLegajo: number | '',
  busquedaLegajoNormal: number | '',
};

export type empleadoFormularioDatos = {
  id_reloj: number | '',
  id_proyecto: number | '',
  legajo: number | '',
  nombre: string,
};

//mutations

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

//responses





































