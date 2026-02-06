import { MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { useFilaJornadaFormulario } from "../hooks/useFilaJornadaFormulario"
import { Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filaJornadaProps, filaJornadaFormularioDatos, deleteJornadaDatos, editJornadaDatos, tipoAusencia } from "../types";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { deleteJornada, editJornada, updateJornadaTipoAusencia, validateJornada } from "@/services/jornada/service.jornada";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { PulsingWarning } from "@/components/ui/prioridad";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Botones } from "./filaJornadaBotones";
import { useConfirmar } from "@/components/hooks/useConfirmar";

export function Fila({ jornada, tiposAusencia, tiposAusenciaCargando }: filaJornadaProps) {

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

    const mutacionUpdate = useMutation({
        mutationFn: (datos: { tipoAusencia: number, id_jornada: number }) => updateJornadaTipoAusencia(datos),
        onSuccess: () => {
            showSuccess("Jornada actualizada correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchJornadasPorImportacion"]
            });
        },
        onError: () => {
            showError("Error al actualizar jornada");
        }
    });

    const onUpdate: SubmitHandler<filaJornadaFormularioDatos> = (datos) => {
        mutacionUpdate.mutate({
            tipoAusencia: datos.tipoAusencia as number,
            id_jornada: jornada.id,
        })
    };

    const mutacionValidate = useMutation({
        mutationFn: async (data: filaJornadaFormularioDatos) => {
            if (jornada.ausencia) {
                await updateJornadaTipoAusencia({
                    tipoAusencia: data.tipoAusencia as number,
                    id_jornada: jornada.id
                });
                await validateJornada({ id: jornada.id });
            } else if (!jornada.ausencia) {
                await editJornada({
                    id: data.id,
                    entrada: data.entrada,
                    salida: data.salida
                });
                await validateJornada({ id: jornada.id });
            };
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
                        {jornada.ausencia ? "Ausente" : "Presente"}
                    </div>
                </TableCell>
                <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                        {jornada.nombreempleado}
                    </div>
                </TableCell>
                {!jornada.ausencia ?
                    (
                        <>
                            <TableCell align="center" size="small">
                                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                    <Controller
                                        name="entrada"
                                        control={control}
                                        rules={{
                                            required: jornada.ausencia ? false : "Este campo es requerido"
                                        }}
                                        render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                            <TimePicker
                                                {...restField}
                                                value={value ? dayjs(value, 'HH:mm:ss') : null}
                                                disabled={(validada || jornada.ausencia)}
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
                                                        disabled: (validada || jornada.ausencia),
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
                                        rules={{
                                            required: jornada.ausencia ? false : "Este campo es requerido"
                                        }}
                                        render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                            <TimePicker
                                                {...restField}
                                                value={value ? dayjs(value, 'HH:mm:ss') : null}
                                                disabled={(validada || jornada.ausencia)}
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
                                                        disabled: (validada || jornada.ausencia),
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </TableCell>
                        </>
                    ) : (
                        <TableCell align="center" size="small" colSpan={2}>
                            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)] mx-2" style={{ userSelect: "none" }}>
                                <Controller
                                    name="tipoAusencia"
                                    control={control}
                                    rules={{
                                        required: !jornada.ausencia ? false : "Este campo es requerido"
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            id="tipoAusencia"
                                            variant="outlined"
                                            color="warning"
                                            size="small"
                                            select
                                            fullWidth
                                            error={!!error}
                                            helperText={error?.message}
                                            disabled={tiposAusencia.length === 0 || !tiposAusencia}
                                        >
                                            {tiposAusencia.map((tipoAusencia: tipoAusencia) => (
                                                <MenuItem key={tipoAusencia.id} value={tipoAusencia.id}>
                                                    {tipoAusencia.nombre}
                                                </MenuItem>
                                            )) || []}
                                        </TextField>
                                    )}
                                />
                            </div>
                        </TableCell>
                    )}
                <TableCell align="right" size="small"
                    className={`${revision
                        ? 'border-r-10 border-red-600'
                        : validada
                            ? 'border-r-10 border-green-700'
                            : jornada.ausencia
                                ? 'border-r-10 border-[#ED6C02]'
                                : 'border-r-10 border-white'
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
                            onEdit={jornada.ausencia ? handleSubmit(onUpdate) : handleSubmit(onEdit)}
                            onDelete={onDelete}
                            onValidate={handleSubmit(onValidate)}
                        />
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};