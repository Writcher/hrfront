import { Button, TableCell, TableRow } from "@mui/material";
import { useFormularioJornadaFormulario } from "../hooks/useFormularioJornadaFormulario"
import { Controller } from "react-hook-form";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormularioJornadaFormularioDatos } from "../types";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { deleteJornada, editJornada, validateJornada } from "@/services/jornada/service.jornada";
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LightTooltip from "@/components/ui/tooltip";
import { deleteJornadaDTO, validateJornadaDTO } from "@/lib/dtos/jornada";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import BeenhereRoundedIcon from '@mui/icons-material/BeenhereRounded';

interface FormularioJornadaProps {
    jornada: any;
}

export function FormularioJornada({ jornada }: FormularioJornadaProps) {
    const { control, handleSubmit, formState: { isValid }, getValues } = useFormularioJornadaFormulario(jornada);
    const { showSuccess, showError } = useSnackbar();
    const queryClient = useQueryClient();

    const mutacion = useMutation({
        mutationFn: (data: FormularioJornadaFormularioDatos) => editJornada(data),
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

    const onSubmit = (data: FormularioJornadaFormularioDatos) => {
        mutacion.mutate({
            id: data.id,
            entrada: data.entrada,
            salida: data.salida
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteJornadaDTO) => deleteJornada(data),
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
        const currentValues = getValues();
        mutacionDelete.mutate({
            id: currentValues.id,
        });
    };

    const mutacionValidate = useMutation({
        mutationFn: (data: validateJornadaDTO) => validateJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportacionJornadas"]
            });
            showSuccess("Jornada validada correctamente");
        },
        onError: () => {
            showError("Error al validar jornada");
        }
    });

    const onValidate = () => {
        const currentValues = getValues();
        mutacionValidate.mutate({
            id: currentValues.id,
        });
    };

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
                                            disabled: jornada.estadojornada.toLowerCase() === 'validada',
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
                                            disabled: jornada.estadojornada.toLowerCase() === 'validada',
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </TableCell>
                <TableCell align="right" size="small"
                    className={`${jornada.estadojornada.toLowerCase() === 'requiere revision'
                        ? 'bg-gradient-to-l from-red-600 via-red-300 to-transparent'
                        : jornada.estadojornada.toLowerCase() === 'validada'
                            ? 'bg-gradient-to-l from-green-700 via-green-300 to-transparent'
                            : ''
                        }`}
                >
                    <div className="flex gap-2 items-center justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        <LightTooltip title="Guardar" placement="left" arrow>
                            <Button
                                variant="contained"
                                color="info"
                                disableElevation
                                size="small"
                                disabled={mutacion.isPending || !isValid || jornada.estadojornada.toLowerCase() === 'validada'}
                                onClick={handleSubmit(onSubmit)}
                            >
                                {!mutacion.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                        <LightTooltip title="Borrar" placement="left" arrow>
                            <Button
                                variant="contained"
                                color="error"
                                disableElevation
                                size="small"
                                disabled={mutacionDelete.isPending || jornada.estadojornada.toLowerCase() === 'validada'}
                                onClick={onDelete}
                            >
                                {!mutacionDelete.isPending ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                        <LightTooltip title="Validar" placement="left" arrow>
                            <Button
                                variant="contained"
                                color="success"
                                disableElevation
                                size="small"
                                disabled={mutacionDelete.isPending || jornada.estadojornada.toLowerCase() === 'validada'}
                                onClick={onValidate}
                            >
                                {!mutacionDelete.isPending ? <BeenhereRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};