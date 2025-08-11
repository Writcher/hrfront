"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectDataExcelImport, insertJornadasExcel } from "@/services/excel/service.excel";
import { Button } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncIcon from '@mui/icons-material/Sync';
import FeedbackSnackbar from "../../ui/feedback";
import { Formulario } from "./components/formulario";
import { useImportarExcelForm } from "./hooks/useImportarExcelForm";
import { useDropzoneH } from "./hooks/useDropzone";
import { importarExcelDatos } from "./types";
import { Dropzone } from "./components/dropzone";

export default function ExcelImportform() {
    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors }, reset } = useImportarExcelForm();

    const dropzone = useDropzoneH(setValue, setError, clearErrors);

    const { data: selectDatos, isLoading: selectCargando } = useQuery({
        queryKey: ["fetchSelectDataExcelImport"],
        queryFn: () => fetchSelectDataExcelImport(),
        refetchOnWindowFocus: false
    });

    const mutacion = useMutation({
        mutationFn: (data: importarExcelDatos) => insertJornadasExcel(data),
        onSuccess: (status) => {
            if ( status === 200) {
                reset();
            };
        },
    });

    const onSubmit = (data: importarExcelDatos) => {
        if (!watch("archivo")) {
            setError("archivo", { message: "Debe seleccionar un archivo Excel" });
            return;
        };

        mutacion.mutate(data);
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] space-y-4">
                <div className="flex flex-row gap-2 w-full h-18">
                    <Formulario 
                        control={control}
                        selectCargando={selectCargando}
                        selectDatos={selectDatos}
                    />
                </div>
                <div className="w-full">
                    <Dropzone 
                        getRootProps={dropzone.getRootProps}
                        getInputProps={dropzone.getInputProps}
                        isDragActive={dropzone.isDragActive}
                        borrarArchivo={dropzone.borrarArchivo}
                        archivo={watch("archivo")}
                        errores={errors}
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disableElevation
                        endIcon={
                            mutacion.isPending ? (
                                <SyncIcon className="animate-spin" />
                            ) : <UploadFileRoundedIcon />
                        }
                        disabled={mutacion.isPending}
                    >
                        {!mutacion.isPending ? "Guardar" : "Guardando"}
                    </Button>
                </div>
            </form>
            <FeedbackSnackbar
                open= {mutacion.isSuccess || mutacion.isError}
                severity={mutacion.isSuccess ? "success" : "error"}
                message={mutacion.isSuccess ? "Archivo importado correctamente" : mutacion.error instanceof Error ? mutacion.error.message : "Error al importar el archivo"}
            />
        </div>
    );
};