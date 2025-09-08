import { Control, UseFormWatch } from "react-hook-form";

export type exportarExcelDatos = {
    proyecto: number | '',
    mes: number | '',
    quincena: number | '',
};

export type mes = {
    id: number,
    mes: number,
    id_año: number,
};

export type proyecto = {
    id: number,
    nombre: string,
};

export type selectDatos = {
    proyectos: proyecto[],
    meses: mes[],
};

export type formularioProps = {
    control: Control<exportarExcelDatos>,
    selectCargando: boolean,
    selectDatos?: selectDatos,
    watch: UseFormWatch<exportarExcelDatos>,
};