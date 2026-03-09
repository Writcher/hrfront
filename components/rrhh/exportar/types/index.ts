import { tipoEmpleado } from "@/components/ausencias/types";
import { Control, UseFormWatch } from "react-hook-form";


//schema

export type mes = {
    id: number,
    mes: number,
    id_año: number,
};

export type proyecto = {
    id: number,
    nombre: string,
};

//props

export type formularioProps = {
    control: Control<exportarExcelDatos>,
    selectCargando: boolean,
    selectDatos?: selectDatos,
    watch: UseFormWatch<exportarExcelDatos>,
};

export type botonesProps = {
    exportando: boolean,
    camposValidos: boolean,
};

//useForm

export type exportarExcelDatos = {
    proyectos: number[],
    tipoEmpleado: number | '',
    mes: number | '',
    quincena: number | '',
};

//mutation



//responses

export type selectDatos = {
    proyectos: proyecto[],
    meses: mes[],
    tiposEmpleado: tipoEmpleado[]
};