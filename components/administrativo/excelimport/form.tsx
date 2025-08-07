"use client";

import { useForm } from "react-hook-form"
import FormField from "../formimput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectDataExcelImport, insertJornadasExcel } from "@/services/excelimport/service.excelimport";
import { Button, IconButton, Skeleton } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { insertJornadasExcelData } from "@/lib/dtos/excelimportservice";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncIcon from '@mui/icons-material/Sync';
import FeedbackSnackbar from "../feedback";

export default function ExcelImportform() {
    const { control, handleSubmit, setError, clearErrors, setValue, watch, formState: { errors }, reset } = useForm<insertJornadasExcelData>({
        defaultValues: {
            id_proyecto: 0,
            id_tipojornada: 0,
            file: null
        }
    });

    const file = watch("file")

    const { data, isLoading } = useQuery({
        queryKey: ["fetchSelectDataExcelImport"],
        queryFn: () => fetchSelectDataExcelImport(),
        refetchOnWindowFocus: false
    });

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        clearErrors("file");

        if (rejectedFiles.length > 0) {
            setError("file", { message: "Solo se permiten archivos Excel (.xlsx, .xls)" });
            return;
        }

        if (acceptedFiles.length > 0) {
            setValue("file", acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeFile = () => {
        setValue("file", null);
        clearErrors("file");
    };

    const mutation = useMutation({
        mutationFn: (data: insertJornadasExcelData) => insertJornadasExcel(data),
        onSuccess: (status) => {
            if ( status === 200) {
                reset();
            };
        },
    });

    const onSubmit = (data: insertJornadasExcelData) => {
        if (!file) {
            setError("file", { message: "Debe seleccionar un archivo Excel" });
            return;
        };

        mutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] space-y-4">
                <div className="flex flex-row gap-2 w-full h-18">
                    {isLoading ?
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="75%"
                            sx={{ borderRadius: "5px" }}
                        /> :
                        <FormField
                            name="id_proyecto"
                            control={control}
                            label="Proyecto"
                            type="number"
                            select
                            required
                            options={data?.proyectos || []}
                            helperText="Seleccione Proyecto"
                            rules={{ required: "Este campo es requerido" }}
                        />
                    }
                    {isLoading ?
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="75%"
                            sx={{ borderRadius: "5px" }}
                        /> :
                        <FormField
                            name="id_tipojornada"
                            control={control}
                            label="Tipo de Jornada"
                            type="number"
                            select
                            required
                            options={data?.tiposJornada || []}
                            helperText="Seleccione Tipo de Jornada"
                            rules={{ required: "Este campo es requerido" }}
                        />
                    }
                </div>
                <div className="w-full">
                    <div
                        {...getRootProps()}
                        className={`border-1 border-solid rounded p-6 text-center cursor-pointer transition-colors
                            ${isDragActive
                                ? 'border-orange-500 bg-orange-100'
                                : 'border-gray-300 hover:border-gray-900'
                            }
                            ${errors.file ? 'border-red-300 bg-red-100' : ''}
                        `}
                    >
                        <input {...getInputProps()} />

                        {!file ? (
                            <div>
                                {isDragActive ? (
                                    <p className="text-orange-500">Suelta el archivo Excel aquí...</p>
                                ) : (
                                    <>
                                        <p className="text-gray-800 mb-2">
                                            Clickea para subir o arrastra y suelta
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Formatos soportados: .xlsx, .xls
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-green-50 p-3 rounded border border-green-200">
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <p className="font-medium text-green-800">{file.name}</p>
                                        <p className="text-sm text-green-600">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                    color="error"
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>

                    {errors.file && (
                        <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
                    )}
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disableElevation
                        endIcon={
                            mutation.isPending ? (
                                <SyncIcon className="animate-spin" />
                            ) : <CloudUploadIcon />
                        }
                        disabled={mutation.isPending}
                    >
                        {!mutation.isPending ? "Guardar" : "Guardando"}
                    </Button>
                </div>
            </form>
            <FeedbackSnackbar
                open= {mutation.isSuccess || mutation.isError}
                severity={mutation.isSuccess ? "success" : "error"}
                message={mutation.isSuccess ? "Archivo importado correctamente" : mutation.error instanceof Error ? mutation.error.message : "Error al importar el archivo"}
            />
        </div>
    );
};