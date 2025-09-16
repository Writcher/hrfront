import { TableRow } from "@mui/material";
import { getDia } from "../../utils";
import { filaJornadaProps, insertObservacionDatos, useObservacionFormularioDatos } from "../../types";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useObservacionFormulario } from "../../hooks/useFormularioObservacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { insertObservacion } from "@/services/observacion/service.observacion";
import { Informacion } from "./filaJornadasInformacion";
import { Formulario } from "./filaJornadasFormulario";

export function FilaJornada({ jornada }: filaJornadaProps) {

    const { control, reset, handleSubmit, formState: { isValid } } = useObservacionFormulario();

    const { showSuccess, showError } = useSnackbar();

    const [observacionFormulario, setObservacionFormulario] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const mutacionCreate = useMutation({
        mutationFn: (datos: insertObservacionDatos) => insertObservacion(datos),
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
                    setObservacionFormulario={setObservacionFormulario}
                />
            )}
        </TableRow >
    );
};