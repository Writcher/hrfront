import { useSnackbar } from "@/lib/context/snackbarcontext";
import { deleteImportacion } from "@/services/importacion/service.importacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImportacionDatos, filaImportacionProps } from "../types";
import { Chip, TableCell, TableRow } from "@mui/material";
import { Botones } from "./filaImportacionBotones";

export default function Fila({ importacion, esAdministrativo }: filaImportacionProps) {

    const { showSuccess, showError } = useSnackbar();

    const queryClient = useQueryClient();

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteImportacionDatos) => deleteImportacion(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportaciones"]
            });
            showSuccess("Importación borrada correctamente");
        },
        onError: () => {
            showError("Error al borrar la importación");
        }
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id: importacion.id
        });
    };

    const completa = importacion.nombreestado.toLowerCase() === 'completa';
    const incompleta = importacion.nombreestado.toLowerCase() === 'incompleta'

    return (
        <TableRow key={importacion.id}>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {importacion.nombre}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {new Intl.DateTimeFormat('es-AR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'numeric',
                        year: '2-digit'
                    }).format(new Date(importacion.fecha)).replace(/\//g, '-')}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {importacion.nombreproyecto}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {importacion.nombreusuario}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    <Chip
                        label={importacion.nombreestado}
                        className="!rounded"
                        color={
                            completa
                                ? "success"
                                : incompleta
                                    ? "error"
                                    : "warning"
                        }
                    />
                </div>
            </TableCell>
            {esAdministrativo &&
                <TableCell align="right" size="small">
                    <Botones
                        id={importacion.id}
                        completa={completa}
                        borrando={mutacionDelete.isPending}
                        onDelete={onDelete}
                    />
                </TableCell>
            }
        </TableRow>
    );
};