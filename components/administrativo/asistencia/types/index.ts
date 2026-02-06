// schema

import { Control } from "react-hook-form";

export type proyecto = {
    id: number,
    nombre: string,
};

export type empleado = {
    id: number,
    id_reloj: number,
    nombre: string,
    tipoempleado: string,
    id_tipoempleado: number | '',
};

// props

export type esqueletoProps = {
    filas: number,
};

export type encabezadoProps = {
    onOrden: (column: string) => void,
    columna: string,
    direccion: 'ASC' | 'DESC',
};

export type tablaPresentesProps = {
    empleados: empleado[],
    cargando: boolean,
    filas: number,
    pagina: number,
};

export type filaPresentesProps = {
    empleado: empleado,
    index: number,
};

export type formularioProps = {
    control: Control<consultaFormularioDatos>,
    cargando: boolean,
    proyectos: proyecto[],
};

// useforms

export type consultaFormularioDatos = {
    proyecto: number | '',
    fecha: string,
};

// mutations


// response