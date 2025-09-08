import { Button, TableCell, TableRow } from "@mui/material";
import { useFilaJornadaFormulario } from "../hooks/useFilaJornadaFormulario"
import { Controller } from "react-hook-form";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filaJornadaProps, filaJornadaFormularioDatos, deleteJornadaDatos, editJornadaDatos } from "../types";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { deleteJornada, editJornada, validateJornada } from "@/services/jornada/service.jornada";
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LightTooltip from "@/components/ui/tooltip";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { PulsingWarning } from "@/components/ui/prioridad";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useConfirmar } from "../hooks/useConfirmar";

export function FilaJornada({ jornada }: filaJornadaProps) {

    const { control, handleSubmit, formState: { isValid }, setValue, watch } = useFilaJornadaFormulario(jornada);
    const { showSuccess, showError } = useSnackbar();
    const queryClient = useQueryClient();

    const { confirmarBorrar, confirmarValidar, handleConfirmarBorrar, handleConfirmarValidar } = useConfirmar({ setValue, watch })

    const mutacionEdit = useMutation({
        mutationFn: (data: editJornadaDatos) => editJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportacionJornadas"]
            });
            showSuccess("Jornada editada correctamente");
        },
        onError: () => {
            showError("Error al editar la jornada");
        }
    });

    const onEdit = (data: filaJornadaFormularioDatos) => {
        mutacionEdit.mutate({
            id: data.id,
            entrada: data.entrada,
            salida: data.salida
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteJornadaDatos) => deleteJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportacionJornadas"]
            });
            showSuccess("Jornada borrada correctamente");
        },
        onError: () => {
            showError("Error al borrar jornada");
        }
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id: jornada.id,
        });
    };

    const mutacionValidate = useMutation({
        mutationFn: async (data: filaJornadaFormularioDatos) => {
            await editJornada({
                id: data.id,
                entrada: data.entrada,
                salida: data.salida
            });
            await validateJornada({ id: jornada.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportacionJornadas"]
            });
            showSuccess("Jornada validada correctamente");
        },
        onError: () => {
            showError("Error al validar la jornada");
        }
    });

    const onValidate = (data: filaJornadaFormularioDatos) => {
        mutacionValidate.mutate(data);
    };

    const validada = jornada.estadojornada.toLowerCase() === 'validada';
    const revision = jornada.estadojornada.toLowerCase() === 'requiere revision';

    return (
        <>
            <TableRow>
                <TableCell align="left" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        {new Intl.DateTimeFormat('es-AR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'numeric',
                            year: '2-digit'
                        }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
                    </div>
                </TableCell>
                <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        {jornada.nombreempleado}
                    </div>
                </TableCell>
                <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        <Controller
                            name="entrada"
                            control={control}
                            rules={{ required: "Este campo es requerido" }}
                            render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                <TimePicker
                                    {...restField}
                                    value={value ? dayjs(value, 'HH:mm:ss') : null}
                                    onChange={(newValue) => {
                                        onChange(newValue ? newValue.format('HH:mm:ss') : '');
                                    }}
                                    format="HH:mm:ss"
                                    ampm={false}
                                    views={['hours', 'minutes', 'seconds']}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            color: "warning",
                                            size: "small",
                                            error: !!error,
                                            helperText: error?.message,
                                            disabled: validada,
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </TableCell>
                <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        <Controller
                            name="salida"
                            control={control}
                            rules={{ required: "Este campo es requerido" }}
                            render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                <TimePicker
                                    {...restField}
                                    value={value ? dayjs(value, 'HH:mm:ss') : null}
                                    onChange={(newValue) => {
                                        onChange(newValue ? newValue.format('HH:mm:ss') : '');
                                    }}
                                    format="HH:mm:ss"
                                    ampm={false}
                                    views={['hours', 'minutes', 'seconds']}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            color: "warning",
                                            size: "small",
                                            error: !!error,
                                            helperText: error?.message,
                                            disabled: validada,
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </TableCell>
                <TableCell align="right" size="small"
                    className={`${revision
                        ? 'bg-gradient-to-l from-red-600 via-red-300 to-transparent'
                        : validada
                            ? 'bg-gradient-to-l from-green-700 via-green-300 to-transparent'
                            : ''
                        }`}
                >
                    <div className="flex gap-2 items-center justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        {revision
                            ? <PulsingWarning />
                            : validada
                                ? <DoneRoundedIcon color="success" className="mr-2" />
                                : null
                        }
                        <LightTooltip title="Guardar" placement="left" arrow>
                            <Button
                                variant="contained"
                                color="info"
                                disableElevation
                                size="small"
                                disabled={mutacionEdit.isPending || mutacionDelete.isPending || mutacionValidate.isPending || !isValid || validada}
                                onClick={handleSubmit(onEdit)}
                            >
                                {!mutacionEdit.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                        <LightTooltip title={confirmarBorrar ? "Confirmar" : "¿Borrar?"} placement="left" arrow>
                            <Button
                                variant={confirmarBorrar ? "contained" : "outlined"}
                                color="error"
                                className={confirmarBorrar ? "" : "!shadow-[inset_0_0_0_2px_rgb(220_38_38)]"}
                                disableElevation
                                size="small"
                                disabled={mutacionEdit.isPending || mutacionDelete.isPending || mutacionValidate.isPending || validada}
                                onBlur={() => handleConfirmarBorrar(false)}
                                onClick={confirmarBorrar ? onDelete : () => handleConfirmarBorrar()}
                            >
                                {!mutacionDelete.isPending ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                        <LightTooltip title={confirmarValidar ? "Confirmar" : "¿Validar?"} placement="left" arrow>
                            <Button
                                variant={confirmarValidar ? "contained" : "outlined"}
                                color="success"
                                className={confirmarValidar ? "" : "!shadow-[inset_0_0_0_2px_rgb(46_125_50)]"}
                                disableElevation
                                size="small"
                                disabled={mutacionEdit.isPending || mutacionDelete.isPending || mutacionValidate.isPending || !isValid || validada}
                                onBlur={() => handleConfirmarValidar(false)}
                                onClick={confirmarValidar ? handleSubmit(onValidate) : () => handleConfirmarValidar()}
                            >
                                {!mutacionValidate.isPending ? <VerifiedUserRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};