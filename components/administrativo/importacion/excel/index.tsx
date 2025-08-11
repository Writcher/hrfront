"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectDataExcelImport, insertJornadasExcel } from "@/services/importacion/service.excel";
import { Button } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncIcon from '@mui/icons-material/Sync';
import FeedbackSnackbar from "../../../ui/feedback";
import { Formulario } from "./components/formulario";
import { useImportarExcelForm } from "./hooks/useImportarExcelForm";
import { useDropzoneH } from "./hooks/useDropzone";
import { importarExcelDatos } from "./types";
import { Dropzone } from "./components/dropzone";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";

export default function ExcelImportform() {
    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors }, reset } = useImportarExcelForm();

    const dropzone = useDropzoneH(setValue, setError, clearErrors);
    const router = useRouter();

    const { data: selectDatos, isLoading: selectCargando } = useQuery({
        queryKey: ["fetchSelectDataExcelImport"],
        queryFn: () => fetchSelectDataExcelImport(),
        refetchOnWindowFocus: false
    });

    const mutacion = useMutation({
        mutationFn: (data: importarExcelDatos) => insertJornadasExcel(data),
        onSuccess: (response) => {
            if (!response.completa) {
                router.push(`/administrativo/importacion/${response.importacion}/completar`);
                reset();
            } else {
                router.push(`/administrativo/importacion`);
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
            <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] space-y-4">
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
                <div className="flex justify-between">
                    <Button
                        component={Link}
                        variant="contained"
                        color="warning"
                        href={"/administrativo/importacion"}
                        disableElevation
                        startIcon={
                            mutacion.isPending ? (
                                <SyncIcon className="animate-spin" />
                            ) : <ArrowBackRoundedIcon />
                        }
                        disabled={mutacion.isPending}
                    >
                        Importaciones
                    </Button>
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
                open={mutacion.isSuccess || mutacion.isError}
                severity={mutacion.isSuccess ? "success" : "error"}
                message={mutacion.isSuccess ? "Archivo importado correctamente" : mutacion.error instanceof Error ? mutacion.error.message : "Error al importar el archivo"}
            />
        </div>
    );
};