import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type tablaResumenEmpleadosFormularioDatos = {
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
  idFilaExpandida: number | null,
  pagina: number,
  filasPorPagina: number,
  ordenDireccion: "ASC" | "DESC",
  ordenColumna: string,
};

export type tablaJornadasFormularioDatos = {
  filtroMes: number | '',
  filtroQuincena: number | '',
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

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
  setValue?: UseFormSetValue<tablaResumenEmpleadosFormularioDatos>,
  watch?: UseFormWatch<tablaResumenEmpleadosFormularioDatos>,
  getValues?: UseFormGetValues<tablaResumenEmpleadosFormularioDatos>,
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

export type formularioFiltrosPadreProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  busquedaNombreNormal: string,
  busquedaLegajoNormal: number | '',
  filtroProyecto: number | '',
  selectDatos: selectDatos[],
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type selectDatos = {
  id: number,
  nombre: string,
};

export type filtrosActivosProps = {
  filtrosActivos: { [key: string]: any },
  getNombreProyectoPorId: (id: number) => string,
};

export type proyecto = {
  id: number,
  nombre: string,
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

export type filaExpandidaEmpleadoProps = {
  idFilaExpandida: number,
  idFilaExpandidaProp: number,
};

export type mes = {
  id: number,
  mes: number,
  id_año: number,
};

export type useTablaJornadaFormularioProps = {
  meses: mes[],
};


export type hookGenericoHijoProps<T extends keyof hookGenericoHijoPropsBase = keyof hookGenericoHijoPropsBase> = Required<Pick<hookGenericoHijoPropsBase, T>>;

export type hookGenericoHijoPropsBase = {
  setValue?: UseFormSetValue<tablaJornadasFormularioDatos>,
  watch?: UseFormWatch<tablaJornadasFormularioDatos>,
  getValues?: UseFormGetValues<tablaJornadasFormularioDatos>,
};

export type formularioFiltrosProps = {
    filtroMes: number | '',
    filtroQuincena: number | '',
    selectCargando: boolean,
    selectDatos: mes[],
    onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
    getNombreMes: (mes: number) => string,
};

export type resumen = {
    suma_total: number,
    suma_total_normal: number,
    suma_total_50: number,
    suma_total_100: number,
    suma_total_feriado: number,
};

export type jornadasDatos = {
    resumen: resumen
};

export type tablaJornadasProps = {
    jornadasDatos: jornadasDatos;
    jornadasCargando: boolean;
};