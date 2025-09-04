"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectDataExcelImport, insertJornadasExcel } from "@/services/importacion/service.importar";
import { Button } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncIcon from '@mui/icons-material/Sync';
import { Formulario } from "./components/formulario";
import { useImportarExcelFormulario } from "./hooks/useImportarExcelFormulario";
import { useDropzoneH } from "./hooks/useDropzone";
import { importarExcelFormularioDatos } from "./types";
import { Dropzone } from "./components/dropzone";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import { useEffect } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";

export default function ImportarExcel() {

    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors, isValid }, reset } = useImportarExcelFormulario();
    const { showSuccess, showError, showWarning } = useSnackbar();
    const dropzone = useDropzoneH({ setValue, setError, clearErrors });
    const router = useRouter();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchSelectDataExcelImport"],
        queryFn: () => fetchSelectDataExcelImport(),
        refetchOnWindowFocus: false
    });

    const mutacionImport = useMutation({
        mutationFn: (data: importarExcelFormularioDatos) => insertJornadasExcel(data),
        onSuccess: (response) => {
            showSuccess("Archivo importado correctamente");
            router.push(`/administrativo/importacion/${response.importacion}/completar`);
            reset();
        },
        onError: () => {
            showError("Error al importar el archivo");
        }
    });

    const onSubmit = (data: importarExcelFormularioDatos) => {
        if (!watch("archivo")) {
            setError("archivo", { message: "Debe seleccionar un archivo Excel" });
            return;
        };

        mutacionImport.mutate(data);
    };

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
    }, [selectError, showWarning]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full gap-2">
                <div className="flex flex-col pt-[25vh] gap-2 w-[80%]">
                    <Formulario
                        control={control}
                        selectCargando={selectCargando}
                        selectDatos={selectDatos}
                    />
                    <Dropzone
                        getRootProps={dropzone.getRootProps}
                        getInputProps={dropzone.getInputProps}
                        isDragActive={dropzone.isDragActive}
                        borrarArchivo={dropzone.borrarArchivo}
                        archivo={watch("archivo")}
                        errores={errors}
                    />
                </div>
                <div className="flex justify-between w-full">
                    <Button
                        component={Link}
                        variant="contained"
                        color="warning"
                        href={"/administrativo/importacion"}
                        disableElevation
                        startIcon={
                            mutacionImport.isPending ? (
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                            ) : <ArrowBackRoundedIcon />
                        }
                        disabled={mutacionImport.isPending}
                    >
                        Importaciones
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disableElevation
                        endIcon={
                            mutacionImport.isPending ? (
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                            ) : <UploadFileRoundedIcon />
                        }
                        disabled={mutacionImport.isPending || !isValid}
                    >
                        {!mutacionImport.isPending ? "Guardar" : "Guardando"}
                    </Button>
                </div>
            </form>
        </div>
    );
};