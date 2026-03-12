import { Button, MenuItem, TableCell, TableRow, TextField } from '@mui/material';
import { useFilaJornadaFormulario } from '../hooks/useFilaJornadaFormulario'
import { Controller, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { filaJornadaProps, filaJornadaFormularioDatos, deleteJornadaDatos, editJornadaDatos, tipoAusencia } from '../types';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { deleteJornada, editJornada, editJornadaTipoAusencia, validateJornada } from '@/services/jornada/service.jornada';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { PulsingWarning } from '@/components/ui/prioridad';
import { Botones } from './filaJornadaBotones';
import { useConfirmar } from '@/components/hooks/useConfirmar';
import { useState } from 'react';
import { useObservacionFormulario } from '@/components/jornadas/hooks/useFormularioObservacion';
import { CreateObservacionDto, DeleteObservacionDto } from '@/lib/dtos/observacion';
import { createObservacion, deleteObservacion } from '@/services/observacion/service.observacion';
import { ObservacionForm } from '@/components/jornadas/types/tablaJornadas/useObservacionForm';
import LightTooltip from '@/components/ui/tooltip';
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Tooltip } from '@/components/jornadas/components/tablaJornadas/filaJornadasTooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

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
                queryKey: ['fetchJornadasPorImportacion']
            });
            showSuccess('Jornada editada correctamente');
        },
        onError: () => {
            showError('Error al editar la jornada');
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
                queryKey: ['fetchJornadasPorImportacion']
            });
            showSuccess('Jornada borrada correctamente');
        },
        onError: () => {
            showError('Error al borrar jornada');
        }
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id: jornada.id,
        });
    };

    const mutacionUpdate = useMutation({
        mutationFn: (datos: { tipoAusencia: number, id_jornada: number }) => editJornadaTipoAusencia(datos),
        onSuccess: () => {
            showSuccess('Jornada actualizada correctamente');
            queryClient.invalidateQueries({
                queryKey: ['fetchJornadasPorImportacion']
            });
        },
        onError: () => {
            showError('Error al actualizar jornada');
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
                await editJornadaTipoAusencia({
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
                queryKey: ['fetchJornadasPorImportacion']
            });
            showSuccess('Jornada validada correctamente');
        },
        onError: () => {
            showError('Error al validar la jornada');
        }
    });

    const onValidate = (data: filaJornadaFormularioDatos) => {
        mutacionValidate.mutate(data);
    };

    const { control: controlObservacion, reset, handleSubmit: handleSubmitObservacion, formState: { isValid: isValidObservacion } } = useObservacionFormulario();

    const [observacionFormulario, setObservacionFormulario] = useState<boolean>(false);

    const mutacionCreate = useMutation({
        mutationFn: (datos: CreateObservacionDto) => createObservacion(datos),
        onSuccess: () => {
            showSuccess('Observacion creada correctamente');
            queryClient.invalidateQueries({
                queryKey: ['fetchJornadasPorImportacion']
            });
            reset();
            setObservacionFormulario(false);
        },
        onError: () => {
            showError('Error al crear observacion');
        }
    });

    const onCreate: SubmitHandler<ObservacionForm> = (datos) => {
        mutacionCreate.mutate({
            observacion: datos.observacion,
            id_jornada: jornada.id,
        });
    };

    const mutacionDeleteObservacion = useMutation({
        mutationFn: (datos: DeleteObservacionDto) => deleteObservacion(datos),
        onSuccess: () => {
            showSuccess('Observacion eliminada correctamente');
            queryClient.invalidateQueries({
                queryKey: ['fetchJornadasPorImportacion']
            });
        },
        onError: () => {
            showError('Error al eliminar observacion');
        }
    });

    const onDeleteObservacion = (id: number) => {
        mutacionDeleteObservacion.mutate({ id });
    };

    const validada = jornada.estadojornada.toLowerCase() === 'validada';
    const revision = jornada.estadojornada.toLowerCase() === 'requiere revision';

    return (
        <>
            <TableRow>
                <TableCell align='left' size='small'>
                    <div className='text-gray-700 font-medium'>
                        {new Intl.DateTimeFormat('es-AR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'numeric',
                            year: '2-digit'
                        }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
                    </div>
                </TableCell>
                <TableCell align='center' size='small'>
                    <div className='text-gray-700 font-medium'>
                        {jornada.ausencia ? 'Ausente' : 'Presente'}
                    </div>
                </TableCell>
                <TableCell align='center' size='small'>
                    <div className='text-gray-700 font-medium'>
                        {jornada.nombreempleado}
                    </div>
                </TableCell>
                {!jornada.ausencia && !observacionFormulario &&
                    <>
                        <TableCell align='center' size='small'>
                            <div className='text-gray-700 font-medium'>
                                <Controller
                                    name='entrada'
                                    control={control}
                                    rules={{
                                        required: jornada.ausencia ? false : 'Este campo es requerido'
                                    }}
                                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                        <TimePicker
                                            {...restField}
                                            value={value ? dayjs(value, 'HH:mm:ss') : null}
                                            disabled={(validada || jornada.ausencia)}
                                            onChange={(newValue) => {
                                                onChange(newValue ? newValue.format('HH:mm:ss') : '');
                                            }}
                                            format='HH:mm:ss'
                                            ampm={false}
                                            views={['hours', 'minutes', 'seconds']}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    color: 'warning',
                                                    size: 'small',
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
                        <TableCell align='center' size='small'>
                            <div className='text-gray-700 font-medium'>
                                <Controller
                                    name='salida'
                                    control={control}
                                    rules={{
                                        required: jornada.ausencia ? false : 'Este campo es requerido'
                                    }}
                                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                        <TimePicker
                                            {...restField}
                                            value={value ? dayjs(value, 'HH:mm:ss') : null}
                                            disabled={(validada || jornada.ausencia)}
                                            onChange={(newValue) => {
                                                onChange(newValue ? newValue.format('HH:mm:ss') : '');
                                            }}
                                            format='HH:mm:ss'
                                            ampm={false}
                                            views={['hours', 'minutes', 'seconds']}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    color: 'warning',
                                                    size: 'small',
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
                }
                {jornada.ausencia && !observacionFormulario &&
                    <TableCell align='center' size='small' colSpan={2}>
                        <div className='text-gray-700 font-medium mx-2' style={{ userSelect: 'none' }}>
                            <Controller
                                name='tipoAusencia'
                                control={control}
                                rules={{
                                    required: !jornada.ausencia ? false : 'Este campo es requerido'
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        id='tipoAusencia'
                                        variant='outlined'
                                        color='warning'
                                        size='small'
                                        select
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        disabled={tiposAusencia.length === 0 || !tiposAusencia}
                                        slotProps={{
                                            select: {
                                                MenuProps: {
                                                    slotProps: {
                                                        paper: {
                                                            style: {
                                                                marginTop: '4px',
                                                                maxHeight: '200px',
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
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
                }
                {observacionFormulario &&
                    <TableCell colSpan={2} align='center' size='small'>
                        <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                            <Controller
                                name='observacion'
                                control={controlObservacion}
                                rules={{ required: 'Debe ingresar la observacion' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        id='observacion'
                                        label='Observación'
                                        variant='outlined'
                                        color='warning'
                                        size='small'
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        disabled={mutacionCreate.isPending}
                                    />
                                )}
                            />
                        </div>
                    </TableCell>
                }
                <TableCell align='right' size='small'
                    className={`${revision
                        ? 'border-r-10 border-red-600'
                        : validada
                            ? 'border-r-10 border-green-700'
                            : jornada.ausencia
                                ? 'border-r-10 border-[#ED6C02]'
                                : 'border-r-10 border-white'
                        }`}
                >
                    <div className='flex gap-2 items-center justify-end text-gray-700 font-medium'>
                        {!observacionFormulario
                            ? revision
                                ? <PulsingWarning />
                                : null
                            : null
                        }
                        {observacionFormulario ? (
                            <div className='flex w-full items-center justify-end gap-2 flex-wrap'>
                                <LightTooltip title='Guardar' placement='left' arrow>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        disableElevation
                                        size='small'
                                        disabled={mutacionCreate.isPending || !isValidObservacion}
                                        onClick={handleSubmitObservacion(onCreate)}
                                    >
                                        {!mutacionCreate.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                    </Button>
                                </LightTooltip>
                                <LightTooltip title='Cancelar' placement='left' arrow>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        disableElevation
                                        size='small'
                                        disabled={mutacionCreate.isPending}
                                        onClick={() => setObservacionFormulario(false)}
                                    >
                                        {!mutacionCreate.isPending ? <CloseRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                    </Button>
                                </LightTooltip>
                            </div>
                        ) : (
                            <>
                                <Tooltip observaciones={jornada.observaciones} onDelete={onDeleteObservacion} />
                                <LightTooltip title='Añadir Observación' placement='left' arrow>
                                    <Button
                                        variant='contained'
                                        color='warning'
                                        disableElevation
                                        size='small'
                                        onClick={() => setObservacionFormulario(true)}
                                    >
                                        <AddRoundedIcon />
                                    </Button>
                                </LightTooltip>
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
                            </>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};