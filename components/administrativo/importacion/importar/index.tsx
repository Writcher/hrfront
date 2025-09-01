"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectDataExcelImport, insertJornadasExcel } from "@/services/importacion/service.importar";
import { Button } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncIcon from '@mui/icons-material/Sync';
import { Formulario } from "./components/formulario";
import { useImportarExcelForm } from "./hooks/useImportarExcelForm";
import { useDropzoneH } from "./hooks/useDropzone";
import { importarExcelDatos } from "./types";
import { Dropzone } from "./components/dropzone";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import { useEffect } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";

export default function ExcelImportform() {
    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors, isValid }, reset } = useImportarExcelForm();
    const { showSuccess, showError, showWarning } = useSnackbar();
    const dropzone = useDropzoneH(setValue, setError, clearErrors);
    const router = useRouter();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchSelectDataExcelImport"],
        queryFn: () => fetchSelectDataExcelImport(),
        refetchOnWindowFocus: false
    });

    const mutacion = useMutation({
        mutationFn: (data: importarExcelDatos) => insertJornadasExcel(data),
        onSuccess: (response) => {
            showSuccess("Archivo importado correctamente");
            router.push(`/administrativo/importacion/${response.importacion}/completar`);
            reset();
        },
        onError: () => {
            showError("Error al importar el archivo");
        }
    });

    const onSubmit = (data: importarExcelDatos) => {
        if (!watch("archivo")) {
            setError("archivo", { message: "Debe seleccionar un archivo Excel" });
            return;
        };

        mutacion.mutate(data);
    };

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
    }, [selectError, showWarning]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] space-y-4">
                <div className="flex flex-row gap-2 w-full">
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
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
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
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                            ) : <UploadFileRoundedIcon />
                        }
                        disabled={mutacion.isPending || !isValid}
                    >
                        {!mutacion.isPending ? "Guardar" : "Guardando"}
                    </Button>
                </div>
            </form>
        </div>
    );
};