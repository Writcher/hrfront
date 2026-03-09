import { TableRow } from "@mui/material";
import { getDia, getIdTipoAusencia } from "../../utils";
import { filaJornadaProps, updateTipoAusenciaDatos, useFormularioTipoAusenciaDatos, useObservacionFormularioDatos } from "../../types";
import { SubmitHandler } from "react-hook-form";
import { useObservacionFormulario } from "../../hooks/useFormularioObservacion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { createObservacion, deleteObservacion } from "@/services/observacion/service.observacion";
import { Informacion } from "./filaAusenciasInformacion";
import { FormularioObservacion } from "./filaAusenciasFormularioObservacion";
import { useFormularioTipoAusencia } from "../../hooks/useFormularioTipoAusencia";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import { FormularioTipoAusencia } from "./filaAusenciasFormularioTipoAusencia";
import { fetchTiposAusencia } from "@/services/tipoausencia/service.tipoausencia";
import { useEffect } from "react";
import { editJornadaTipoAusencia } from "@/services/jornada/service.jornada";
import { CreateObservacionDto, DeleteObservacionDto } from "@/lib/dtos/observacion";

export function FilaJornada({ jornada }: filaJornadaProps) {

    const { control: observacionControl, reset: observacionReset, handleSubmit: observacionSubmit, formState: { isValid: observacionValida } } = useObservacionFormulario();

    const { control: tipoAusenciaControl, formState: { isValid: tipoAusenciaValida }, setValue: tipoAusenciaSetValue, handleSubmit: tipoAusenciaSubmit, reset: tipoAusenciaReset } = useFormularioTipoAusencia();

    const { showSuccess, showError } = useSnackbar();

    const {
        formularioVisible: observacionFormularioVisible,
        handleMostrarFormulario: handleMostrarObservacionFormulario
    } = useMostrarFormulario<useObservacionFormularioDatos>({ reset: observacionReset });

    const {
        formularioVisible: tipoAusenciaFormularioVisible,
        handleMostrarFormulario: handleMostrarTipoAusenciaFormulario
    } = useMostrarFormulario<useFormularioTipoAusenciaDatos>({ reset: tipoAusenciaReset });

    const queryClient = useQueryClient();

    const { data: selectDatos } = useQuery({
        queryKey: ["fetchTiposAusencia"],
        queryFn: () => fetchTiposAusencia(),
        refetchOnWindowFocus: false
    });

    const getIdTipoAusenciaPorNombre = getIdTipoAusencia(selectDatos)

    useEffect(() => {
        if (jornada) {
            tipoAusenciaSetValue('tipoAusencia', jornada.tipoausencia ? getIdTipoAusenciaPorNombre(jornada.tipoausencia) : '');
        };
    }, [jornada, tipoAusenciaSetValue, tipoAusenciaFormularioVisible]);

    const mutacionCreate = useMutation({
        mutationFn: (datos: CreateObservacionDto) => createObservacion(datos),
        onSuccess: () => {
            showSuccess("Observacion creada correctamente");
            observacionReset();
            handleMostrarObservacionFormulario();
            queryClient.invalidateQueries({
                queryKey: ["fetchAusenciasEmpleado"]
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

    const mutacionUpdate = useMutation({
        mutationFn: (datos: updateTipoAusenciaDatos) => editJornadaTipoAusencia(datos),
        onSuccess: () => {
            showSuccess("Jornada actualizada correctamente");
            tipoAusenciaReset();
            handleMostrarTipoAusenciaFormulario();
            queryClient.invalidateQueries({
                queryKey: ["fetchAusenciasEmpleado"]
            });
        },
        onError: () => {
            showError("Error al actualizar jornada");
        }
    });

    const onUpdate: SubmitHandler<useFormularioTipoAusenciaDatos> = (datos) => {
        mutacionUpdate.mutate({
            tipoAusencia: datos.tipoAusencia,
            id_jornada: jornada.id,
        })
    };

    const dia = getDia(jornada.fecha);

    return (
        <TableRow>
            {observacionFormularioVisible &&
                <FormularioObservacion
                    fecha={jornada.fecha}
                    dia={dia}
                    control={observacionControl}
                    creando={mutacionCreate.isPending}
                    camposValidos={observacionValida}
                    onCreate={observacionSubmit(onCreate)}
                    setObservacionFormulario={handleMostrarObservacionFormulario}
                />
            }
            {tipoAusenciaFormularioVisible &&
                <FormularioTipoAusencia
                    jornada={jornada}
                    dia={dia}
                    control={tipoAusenciaControl}
                    actualizando={mutacionUpdate.isPending}
                    camposValidos={tipoAusenciaValida}
                    tiposAusencia={selectDatos || []}
                    onUpdate={tipoAusenciaSubmit(onUpdate)}
                    setTipoAusenciaFormulario={handleMostrarTipoAusenciaFormulario}
                />
            }
            {!observacionFormularioVisible && !tipoAusenciaFormularioVisible && (
                <Informacion
                    dia={dia}
                    jornada={jornada}
                    onDelete={onDelete}
                    setObservacionFormulario={handleMostrarObservacionFormulario}
                    setTipoAusenciaFormulario={handleMostrarTipoAusenciaFormulario}
                />
            )}
        </TableRow >
    );
};