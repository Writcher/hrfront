import { TableCell, TableRow } from "@mui/material";
import { useFilaJornadaFormulario } from "../hooks/useFilaJornadaFormulario"
import { Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filaJornadaProps, filaJornadaFormularioDatos, deleteJornadaDatos, editJornadaDatos } from "../types";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { deleteJornada, editJornada, validateJornada } from "@/services/jornada/service.jornada";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { PulsingWarning } from "@/components/ui/prioridad";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Botones } from "./filaJornadaBotones";
import { useConfirmar } from "@/components/hooks/useConfirmar";

export function Fila({ jornada }: filaJornadaProps) {

    const { control, handleSubmit, formState: { isValid } } = useFilaJornadaFormulario(jornada);

    const { showSuccess, showError } = useSnackbar();

    const queryClient = useQueryClient();

    const { confirmar: confirmarBorrar, handleConfirmar: handleConfirmarBorrar } = useConfirmar();
    const { confirmar: confirmarValidar, handleConfirmar: handleConfirmarValidar } = useConfirmar();

    const mutacionEdit = useMutation({
        mutationFn: (data: editJornadaDatos) => editJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchJornadasPorImportacion"]
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
                queryKey: ["fetchJornadasPorImportacion"]
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
                queryKey: ["fetchJornadasPorImportacion"]
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
                        <Botones
                            editando={mutacionEdit.isPending}
                            borrando={mutacionDelete.isPending}
                            validando={mutacionValidate.isPending}
                            camposValidos={isValid}
                            validada={validada}
                            confirmarBorrar={confirmarBorrar}
                            confirmarValidar={confirmarValidar}
                            handleConfirmarBorrar={handleConfirmarBorrar}
                            handleConfirmarValidar={handleConfirmarValidar}
                            onEdit={handleSubmit(onEdit)}
                            onDelete={onDelete}
                            onValidate={handleSubmit(onValidate)}
                        />
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};