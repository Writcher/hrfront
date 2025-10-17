import { SyntheticEvent } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

//schema

export type importacion = {
    id: number,
    nombre: string,
    fecha: string,
    nombreestado: string,
    nombreusuario: string,
    nombreproyecto: string,
};

export type proyecto = {
    id: number,
    nombre: string,
};

//props

export type importacionesProps = {
    esAdministrativo?: boolean,
};

export type hookGenericoProps = {
    setValue: UseFormSetValue<tablaImportacionesFiltrosDatos>,
    watch: UseFormWatch<tablaImportacionesFiltrosDatos>,
};

export type tablaImportacionesFiltrosProps = {
    proyectos: proyecto[] | [];
    cargando: boolean,
    filtroIncompletas: boolean,
    filtroProyecto: number | '',
    handleLimpiarFiltros: () => void,
    onCambioFiltroIncompletas: () => void,
    onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
    esAdministrativo?: boolean,
};

export type formularioProps = {
    filtroIncompletas: boolean,
    filtroProyecto: number | '',
    proyectos: proyecto[],
    cargando: boolean,
    onCambioFiltroIncompletas: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
    onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export type encabezadoProps = {
    esAdministrativo?: boolean,
};

export type esqueletoProps = {
    filas: number,
    esAdministrativo?: boolean,
};

export type tablaImportacionesProps = {
    importaciones: importacion[],
    cargando: boolean,
    filas: number,
    esAdministrativo?: boolean,
};

export type filaImportacionProps = {
    importacion: importacion,
    esAdministrativo?: boolean,
};

export type filaBotonesProps = {
    id: number,
    completa: boolean,
    borrando: boolean,
    onDelete: () => void,
};

//useForm

export type tablaImportacionesFiltrosDatos = {
    filtroProyecto: number | '',
    filtroIncompletas: boolean,
};

//mutations

export type deleteImportacionDatos = {
    id: number,
};



