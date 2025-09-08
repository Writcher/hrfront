import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { Control, FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue } from "react-hook-form";

export type importarExcelFormularioDatos = {
    archivo: File | null,
    proyecto: number | '',
    tipoJornada: number | ''
};

export type tipoJornada = {
    id: number,
    nombre: string,
};

export type proyecto = {
    id: number,
    nombre: string,
};

export type selectDatos = {
    proyectos: proyecto[],
    tiposJornada: tipoJornada[],
};

export type formularioProps = {
    control: Control<importarExcelFormularioDatos>,
    selectCargando: boolean,
    selectDatos?: selectDatos,
};

export type hookProps = {
    setValue: UseFormSetValue<importarExcelFormularioDatos>,
    setError: UseFormSetError<importarExcelFormularioDatos>,
    clearErrors: UseFormClearErrors<importarExcelFormularioDatos>,
};

export type dropzoneProps = {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T,
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T,
    isDragActive: boolean;
    borrarArchivo: () => void;
    archivo: File | null;
    errores: FieldErrors<importarExcelFormularioDatos>,
};