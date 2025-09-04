import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { hookProps } from "../types";

export const useDropzoneH = ({ setValue, setError, clearErrors }: hookProps) => {

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        clearErrors("archivo");

        if (rejectedFiles.length > 0) {
            setError("archivo", { message: "Solo se permiten archivos Excel (.xlsx, .xls)" });
            return;
        }

        if (acceptedFiles.length > 0) {
            setValue("archivo", acceptedFiles[0]);
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

    const borrarArchivo = () => {
        setValue("archivo", null);
        clearErrors("archivo");
    };
    
    return {
        isDragActive,
        borrarArchivo,
        getRootProps,
        getInputProps
    };
};