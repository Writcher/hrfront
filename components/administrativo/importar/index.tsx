"use client";

import { useMutation } from "@tanstack/react-query";
import { insertJornadasExcel } from "@/services/importacion/service.importar";
import { Formulario } from "./components/formulario";
import { useImportarExcelFormulario } from "./hooks/useImportarExcelFormulario";
import { useDropzoneHook } from "./hooks/useDropzone";
import { importarExcelFormularioDatos } from "./types";
import { Dropzone } from "./components/dropzone";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { Botones } from "./components/botones";
import { useSelectDatos } from "./hooks/useSelectDatos";

export default function Importar() {

    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors, isValid }, reset } = useImportarExcelFormulario();

    const { showSuccess, showError, showWarning } = useSnackbar();

    const { isDragActive, borrarArchivo, getRootProps, getInputProps } = useDropzoneHook({ setValue, setError, clearErrors });

    const router = useRouter();

    const {
        proyectos,
        tiposJornada,
        tiposImportacion,
        cargando,
        error
    } = useSelectDatos()

    const mutacionImport = useMutation({
        mutationFn: (data: importarExcelFormularioDatos) => insertJornadasExcel(data),
        onSuccess: (response) => {
            showSuccess("Archivo importado correctamente");
            router.push(`/administrativo/importacion/${response.importacion}/completar`);
            reset();
        },
        onError: (error: any) => {
            showError(error.message || "Error al importar informe");
        },
    });

    const onImport = (data: importarExcelFormularioDatos) => {
        if (!watch("archivo")) {
            setError("archivo", { message: "Debe seleccionar un archivo Excel" });
            return;
        };
        mutacionImport.mutate(data);
    };

    useEffect(() => {
        if (error) {
            showWarning("Error al cargar los datos");
        };
    }, [error, showWarning]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onImport)} className="flex flex-col justify-between items-center w-full h-full gap-2">
                <div className="flex flex-col pt-[25vh] gap-2 w-[80%]">
                    <Formulario
                        control={control}
                        cargando={cargando}
                        proyectos={proyectos || []}
                        tiposJornada={tiposJornada || []}
                        tiposImportacion={tiposImportacion || []}
                    />
                    <Dropzone
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        isDragActive={isDragActive}
                        borrarArchivo={borrarArchivo}
                        archivo={watch("archivo")}
                        errores={errors}
                    />
                </div>
                <Botones
                    importando={mutacionImport.isPending}
                    camposValidos={isValid}
                />
            </form>
        </div>
    );
};