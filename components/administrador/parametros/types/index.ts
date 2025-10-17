import { Control } from "react-hook-form";

//schema

export type proyecto = {
    id: number,
    nombre: string,
    estadoparametro: string,
    modalidadtrabajo: string,
    id_modalidadtrabajo: number,
};

export type control = {
    id: number,
    serie: string,
    id_proyecto: number,
    proyectonombre: string,
};

export type tipoAusencia = {
    id: number,
    nombre: string,
    estadoparametro: string,
};

export type modalidadTrabajo = {
    id: number,
    nombre: string,
};

export type proyectoSelect = {
    id: number,
    nombre: string,
};

//props

export type botonesSeleccionProps = {
    setParametro: (parametro: string) => void;
    parametro: string,
};

export type esqueletoProps = {
    filas: number,
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
    estado?: string,
};

export type formularioCrearProyectoBotonesProps = {
    handleMostrarFormulario: () => void,
    creando: boolean,
    camposValidos: boolean,
};


    //proyectos

    export type filaProyectoProps = {
        proyecto: proyecto,
    };


    export type tablaProyectosProps = {
        proyectos: proyecto[];
        cargando: boolean;
    };

    export type formularioCrearProyectoProps = {
        control: Control<proyectoFormularioDatos>,
        cargando: boolean,
        modalidadesTrabajo: modalidadTrabajo[],
    };

    //controles

    export type filaControlProps = {
        control: control,
    };

    export type tablaControlesProps = {
        controles: control[];
        cargando: boolean;
    };

    export type formularioCrearControlesProps = {
        control: Control<controlFormularioDatos>,
        cargando: boolean,
        proyectos: proyectoSelect[],
    };

    //tipos ausencia

    export type filaTipoAusenciaProps = {
        tipoAusencia: tipoAusencia,
    };

    export type tablaTipoAusenciaProps = {
        tiposAusencia: tipoAusencia[];
        cargando: boolean;
    };

    export type formularioCrearTipoAusenciaProps = {
        control: Control<tipoAusenciaFormularioDatos>,
    };

//useForm

export type proyectoFormularioDatos = {
    nombre: string,
    id_modalidadtrabajo: number | '',
};

export type controlFormularioDatos = {
    serie: string,
    id_proyecto: number | '',
};

export type tipoAusenciaFormularioDatos = {
    nombre: string,
};

//mutation

export type editProyectoParametros = {
    id_proyecto: number,
    id_modalidadtrabajo: number,
    nombre: string,
};

export type insertProyectoParametros = {
    nombre: string,
    id_modalidadtrabajo: number,
};

export type deleteProyectoParametros = {
    id_proyecto: number,
};

export type editControlParametros = {
    id_proyecto: number,
    id_control: number,
    serie: string,
};

export type insertControlParametros = {
    serie: string,
    id_proyecto: number,
};

export type deleteControlParametros = {
    id_control: number,
};

export type editTipoAusenciaParametros = {
    id_tipoausencia: number,
    nombre: string,
};

export type insertTipoAusenciaParametros = {
    nombre: string,
};

export type deleteTipoAusenciaParametros = {
    id_tipoausencia: number,
};

//response