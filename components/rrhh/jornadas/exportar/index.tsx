"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { exportJornadasExcel, fetchSelectDataExcelExport } from "@/services/importacion/service.importar";
import { Button } from "@mui/material";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SyncIcon from '@mui/icons-material/Sync';
import { Formulario } from "./components/formulario";
import { useExportarExcelFormulario } from "./hooks/useExportarExcelFormulario";
import { exportarExcelDatos } from "./types";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import { getFileName } from "./utils/getFileName";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";

export default function ExcelImportform() {
    const { control, handleSubmit, watch, reset } = useExportarExcelFormulario();
    const { showSuccess, showError, showWarning } = useSnackbar();

    const router = useRouter();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchSelectDataExcelExport"],
        queryFn: () => fetchSelectDataExcelExport(),
        refetchOnWindowFocus: false
    });

    const nombreArchivo = getFileName(watch, selectDatos);

    const mutacion = useMutation({
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

    const onSubmit = (data: exportarExcelDatos) => {
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
                <div className="flex flex-row w-full">
                    <Formulario
                        control={control}
                        selectCargando={selectCargando}
                        selectDatos={selectDatos}
                        watch={watch}
                    />
                </div>
                <div className="flex justify-between">
                    <Button
                        component={Link}
                        variant="contained"
                        color="warning"
                        href={"/rrhh/jornadas"}
                        disableElevation
                        startIcon={
                            mutacion.isPending ? (
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                            ) : <ArrowBackRoundedIcon />
                        }
                        disabled={mutacion.isPending}
                    >
                        Resumen
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disableElevation
                        endIcon={
                            mutacion.isPending ? (
                                <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }}/>
                            ) : <DownloadRoundedIcon />
                        }
                        disabled={mutacion.isPending}
                    >
                        {!mutacion.isPending ? "Descargar" : "Descargando"}
                    </Button>
                </div>
            </form>
        </div>
    );
};