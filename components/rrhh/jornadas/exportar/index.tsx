"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { exportJornadasExcel, fetchSelectDataExcelExport } from "@/services/importacion/service.importar";
import { Button } from "@mui/material";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SyncIcon from '@mui/icons-material/Sync';
import FeedbackSnackbar from "../../../ui/feedback";
import { Formulario } from "./components/formulario";
import { useExportarExcelFormulario } from "./hooks/useExportarExcelFormulario";
import { exportarExcelDatos } from "./types";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import { getFileName } from "./utils/getFileName";

export default function ExcelImportform() {
    const { control, handleSubmit, watch, reset } = useExportarExcelFormulario();

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

            router.push(`/rrhh/jornadas`);
            reset();
        },
    });

    const onSubmit = (data: exportarExcelDatos) => {
        mutacion.mutate(data);
    };

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
                                <SyncIcon className="animate-spin" />
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
                                <SyncIcon className="animate-spin" />
                            ) : <DownloadRoundedIcon />
                        }
                        disabled={mutacion.isPending}
                    >
                        {!mutacion.isPending ? "Descargar" : "Descargando"}
                    </Button>
                </div>
            </form>
            <FeedbackSnackbar
                open={mutacion.isSuccess || mutacion.isError || selectError}
                severity={
                    mutacion.isSuccess
                        ? "success"
                        : mutacion.isError
                            ? "error"
                            : "warning"
                }
                message={
                    mutacion.isSuccess
                        ? "Archivo exportado correctamente"
                        : mutacion.isError
                            ? "Error al exportar el archivo"
                            : "Error al cargar los datos"
                }
            />
        </div>
    );
};