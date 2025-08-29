import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useFormularioJornadaFormulario } from "../hooks/useFormularioJornadaFormulario"
import { Controller } from "react-hook-form";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormularioJornadaFormularioDatos } from "../types";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { editJornada } from "@/services/jornada/service.jornada";
import SyncIcon from '@mui/icons-material/Sync';
import FeedbackSnackbar from "@/components/ui/feedback";

interface FormularioJornadaProps {
    jornada: any
}

export function FormularioJornada({ jornada }: FormularioJornadaProps) {
    const { control, handleSubmit } = useFormularioJornadaFormulario(jornada);
    const queryClient = useQueryClient();

    const mutacion = useMutation({
        mutationFn: (data: FormularioJornadaFormularioDatos) => editJornada(data),
        onSuccess: (respuesta) => {
            queryClient.invalidateQueries({
                queryKey: ["fetchImportacionJornadas"]
            });
        },
    });

    const onSubmit = (data: FormularioJornadaFormularioDatos) => {
        mutacion.mutate({
            id: data.id,
            entrada: data.entrada,
            salida: data.salida
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
                                    disabled={jornada.entrada !== null}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            color: "warning",
                                            size: "small",
                                            error: !!error,
                                            helperText: error?.message,
                                            sx: {
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#1f2937",
                                                },
                                                "& .MuiInputBase-input": {
                                                    textAlign: "center"
                                                }
                                            }
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
                                    disabled={jornada.salida !== null}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            color: "warning",
                                            size: "small",
                                            error: !!error,
                                            helperText: error?.message,
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </TableCell>
                <TableCell align="right" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            size="small"
                            disabled={jornada.entrada !== null && jornada.salida !== null || mutacion.isPending}
                            onClick={handleSubmit(onSubmit)}
                        >

                            {!mutacion.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" />}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
            <FeedbackSnackbar
                open={mutacion.isSuccess || mutacion.isError}
                severity={mutacion.isSuccess ? "success" : "error"}
                message={mutacion.isSuccess ? "Jornada completada correctamente" : mutacion.error instanceof Error ? mutacion.error.message : "Error al completar jornada"}
            />
        </>
    );
};