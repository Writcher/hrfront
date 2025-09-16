import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

//schema

export type jornada = {
    fecha: string,
    nombreempleado: string,
    estadojornada: string,
    entrada: string,
    salida: string,
    id: number,
};

//props
export type tablaJornadasProps = {
    jornadas: jornada[],
    cargando: boolean,
    filas: number,
};

export type filaJornadaProps = {
    jornada: jornada,
};

export type importacionJornadasProps = {
    id_importacion: number,
};

export type esqueletoProps = {
    filas: number,
};

export type deshabilitarBotonProps = {
    cargando: boolean,
    totalIncompletoProp: number,
};

export type botonesTablaProps = {
    cargando: boolean,
    pendiente: boolean,
    deshabilitado: boolean,
    onComplete: () => void,
};

export type hookGenericoPadreProps = {
    setValue: UseFormSetValue<tablaJornadasFiltroDatos>,
    watch: UseFormWatch<tablaJornadasFiltroDatos>,
};

export type hookGenericoHijoProps = {
    setValue: UseFormSetValue<filaJornadaFormularioDatos>,
    watch: UseFormWatch<filaJornadaFormularioDatos>,
};

export type botonesFilaProps = {
    editando: boolean,
    borrando: boolean,
    validando: boolean,
    camposValidos: boolean,
    validada: boolean,
    confirmarBorrar: boolean,
    confirmarValidar: boolean,
    handleConfirmarBorrar: (bool?: boolean | undefined) => void,
    handleConfirmarValidar: (bool?: boolean | undefined) => void,
    onEdit: (event?: React.BaseSyntheticEvent) => Promise<void>,
    onDelete: () => void,
    onValidate: (event?: React.BaseSyntheticEvent) => Promise<void>,
};

//useForm

export type filaJornadaFormularioDatos = {
    id: number,
    entrada: string | null,
    salida: string | null,
};

export type tablaJornadasFiltroDatos = {
    filtroMarcasIncompletas: boolean,
};

//mutations

export type editJornadaDatos = {
    id: number,
    entrada: string | null,
    salida: string | null,
};

export type deleteJornadaDatos = {
    id: number,
};

export type validateJornadaDatos = {
    id: number,
};

//responses

export type jornadasDatos = {
    totalJornadas: number,
    totalIncompleto: number,
    jornadas: jornada[],
};