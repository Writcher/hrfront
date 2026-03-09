import { TableRow } from "@mui/material";
import { getDia } from "../../utils";
import { filaJornadaProps, useObservacionFormularioDatos } from "../../types";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useObservacionFormulario } from "../../hooks/useFormularioObservacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { createObservacion, deleteObservacion } from "@/services/observacion/service.observacion";
import { Informacion } from "./filaJornadasInformacion";
import { Formulario } from "./filaJornadasFormulario";
import { CreateObservacionDto, DeleteObservacionDto } from "@/lib/dtos/observacion";

export function FilaJornada({ jornada }: filaJornadaProps) {

    const { control, reset, handleSubmit, formState: { isValid } } = useObservacionFormulario();

    const { showSuccess, showError } = useSnackbar();

    const [observacionFormulario, setObservacionFormulario] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const mutacionCreate = useMutation({
        mutationFn: (datos: CreateObservacionDto) => createObservacion(datos),
        onSuccess: () => {
            showSuccess("Observacion creada correctamente");
            reset();
            setObservacionFormulario(false);
            queryClient.invalidateQueries({
                queryKey: ["fetchJornadasEmpleado"]
            });
        },
        onError: () => {
            showError("Error al crear observacion");
        }
    });

    const onCreate: SubmitHandler<useObservacionFormularioDatos> = (datos) => {
        mutacionCreate.mutate({
            observacion: datos.observacion,
            id_jornada: jornada.id,
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (datos: DeleteObservacionDto) => deleteObservacion(datos),
        onSuccess: () => {
            showSuccess('Observacion eliminada correctamente');
            queryClient.invalidateQueries({
                queryKey: ["fetchJornadasEmpleado"]
            });
        },
        onError: () => {
            showError("Error al eliminar observacion");
        }
    });

    const onDelete = (id: number) => {
        mutacionDelete.mutate({ id });
    };

    const dia = getDia(jornada.fecha);

    return (
        <TableRow>
            {observacionFormulario ? (
                <Formulario
                    fecha={jornada.fecha}
                    dia={dia}
                    control={control}
                    creando={mutacionCreate.isPending}
                    camposValidos={isValid}
                    onCreate={handleSubmit(onCreate)}
                    setObservacionFormulario={setObservacionFormulario}
                />
            ) : (
                <Informacion
                    dia={dia}
                    jornada={jornada}
                    onDelete={onDelete}
                    setObservacionFormulario={setObservacionFormulario}
                />
            )}
        </TableRow >
    );
};