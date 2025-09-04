import { SyntheticEvent } from "react";
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type tablaImportacionesFormularioDatos = {
    filtroProyecto: number | '',
    filtroIncompletas: boolean,
    pagina: number,
    filasPorPagina: number,
};

export type hookGenericoPadreProps<T extends keyof hookGenericoPadrePropsBase = keyof hookGenericoPadrePropsBase> = Required<Pick<hookGenericoPadrePropsBase, T>>;

export type hookGenericoPadrePropsBase = {
    setValue?: UseFormSetValue<tablaImportacionesFormularioDatos>,
    watch?: UseFormWatch<tablaImportacionesFormularioDatos>,
    getValues?: UseFormGetValues<tablaImportacionesFormularioDatos>,
};

export type selectDatos = {
    id: number,
    nombre: string,
};

export type encabezadoTablaProps = {
    selectDatos: selectDatos[] | [];
    selectCargando: boolean,
    filtroIncompletas: boolean,
    filtroProyecto: number | '',
    handleLimpiarFiltros: () => void,
    onCambioFiltroIncompletas: () => void,
    onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type formularioFiltrosProps = {
    filtroIncompletas: boolean,
    filtroProyecto: number | '',
    selectDatos: selectDatos[],
    selectCargando: boolean,
    onCambioFiltroIncompletas: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
    onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type deleteImportacionDatos = {
    id: number,
};

export type importacion = {
    id: number,
    nombre: string,
    fecha: string,
    nombreestado: string,
}

export type filaImportacionProps = {
    importacion: importacion,
};

export type filaBotonesProps = {
    id: number,
    nombreestado: string,
    borrando: boolean,
    onDelete: () => void,
};

export type importacionesData = {
    importaciones: importacion[],
    totalImportaciones: number,
};

export type tablaImportacionesProps = {
    importacionesDatos: importacionesData
    importacionesCargando: boolean,
    filasPorPagina: number,
};