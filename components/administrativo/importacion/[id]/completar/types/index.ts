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

export type filaJornadaProps = {
    jornada: jornada,
};

export type filaJornadaFormularioDatos = {
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

export type tablaImportacionJornadasProps = {
    jornadasDatos: any,
    jornadasCargando: boolean,
    filasPorPagina: number,
};

export type importacionJornadasProps = {
    id_importacion: number,
};

export type importacionJornadasFormularioDatos = {
    pagina: number,
    filasPorPagina: number,
    filtroMarcasIncompletas: boolean,
    totalIncompleto: number,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
    setValue?: UseFormSetValue<importacionJornadasFormularioDatos>,
    watch?: UseFormWatch<importacionJornadasFormularioDatos>,
    getValues?: UseFormGetValues<importacionJornadasFormularioDatos>,
};

export type deshabilitarBotonProps =
    Required<Pick<hookGenericoPadrePropsBase, 'setValue' | 'watch'>>
    & {
        jornadasCargando: boolean,
        jornadasDatos: jornadasDatos,
    };

export type jornadasDatos = {
    totalJornadas: number,
    totalIncompleto: number,
    jornadas: jornada[],
};

export type botonesTablaProps = {
    jornadasCargando: boolean,
    mutacionPendiente: boolean,
    botonDeshabilitado: boolean,
    onSubmit: () => void,
}