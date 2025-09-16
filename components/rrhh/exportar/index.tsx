"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { exportJornadasExcel, fetchSelectDataExcelExport } from "@/services/importacion/service.importar";
import { Formulario } from "./components/formulario";
import { useExportarExcelFormulario } from "./hooks/useExportarExcelFormulario";
import { exportarExcelDatos } from "./types";
import { useRouter } from "next/navigation";
import { getFileName } from "./utils";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { Botones } from "./components/botones";

export default function ExcelExportFormulario() {

    const { control, handleSubmit, watch, reset, formState: { isValid } } = useExportarExcelFormulario();

    const { showSuccess, showError, showWarning } = useSnackbar();

    const router = useRouter();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchSelectDataExcelExport"],
        queryFn: () => fetchSelectDataExcelExport(),
        refetchOnWindowFocus: false
    });

    const nombreArchivo = getFileName(watch, selectDatos);

    const mutacionExport = useMutation({
        mutationFn: (data: exportarExcelDatos) => exportJornadasExcel(data),
        onSuccess: (response) => {

            const url = window.URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = url;
            a.download = nombreArchivo;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            showSuccess("Archivo exportado correctamente");

            router.push(`/rrhh/jornadas`);
            reset();
        },
        onError: () => {
            showError("Error al exportar archivo");
        }
    });

    const onExport = (data: exportarExcelDatos) => {
        mutacionExport.mutate(data);
    };

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
    }, [selectError, showWarning]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onExport)} className="flex flex-col justify-between items-center w-full h-full gap-2">
                <div className="flex flex-col pt-[25vh] w-[80%] gap-2">
                    <Formulario
                        control={control}
                        selectCargando={selectCargando}
                        selectDatos={selectDatos}
                        watch={watch}
                    />
                </div>
                <Botones
                    exportando={mutacionExport.isPending}
                    camposValidos={isValid}
                />
            </form>
        </div>
    );
};