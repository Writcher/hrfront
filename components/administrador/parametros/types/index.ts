//schema

export type proyecto = {
    id: number,
    nombre: string,
    estadoparametro: string,
    modalidadtrabajo: string,
    id_modalidadtrabajo: number,
};

export type modalidadTrabajo = {
    id: number,
    nombre: string,
};

//props

export type botonesSeleccionProps = {
    setParametro: (parametro: string) => void;
    parametro: string,
};

export type filaProyectoProps = {
    proyecto: proyecto,
};

export type esqueletoProps = {
    filas: number,
};

export type tablaProyectosProps = {
    proyectos: proyecto[];
    cargando: boolean;
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
  estado: string,
};

//useForm

export type proyectoFilaFormularioDatos = {
    nombre: string,
    id_modalidadtrabajo: number | '',
};

//mutation

export type editProyectoParametros = {
    id_proyecto: number,
    id_modalidadtrabajo: number,
    nombre: string,
};

export type deleteProyectoParametros = {
    id_proyecto: number,
};

//response