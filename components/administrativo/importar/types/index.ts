import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { Control, FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue } from "react-hook-form";

//schema

export type tipoJornada = {
    id: number,
    nombre: string,
};

export type proyecto = {
    id: number,
    nombre: string,
};

export type tipoImportacion = {
    id: number,
    nombre: string,
};

//props

export type formularioProps = {
    control: Control<importarExcelFormularioDatos>,
    cargando: boolean,
    proyectos: proyecto[],
    tiposJornada: tipoJornada[],
    tiposImportacion: tipoImportacion[],
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

export type botonesProps = {
    importando: boolean,
    camposValidos: boolean,
};

//useForm

export type importarExcelFormularioDatos = {
    archivo: File | null,
    proyecto: number | '',
    tipoJornada: number | '',
    tipoInforme: number | '',
};

//mutations



//responses