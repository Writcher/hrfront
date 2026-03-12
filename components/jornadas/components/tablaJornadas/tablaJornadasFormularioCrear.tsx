import { IOSSwitch } from '@/components/ui/switch';
import { FormControlLabel, MenuItem, Skeleton, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TablaJornadasFormularioProps } from '../../types/tablaJornadas/tablaJornadasFormularioProps';
import { TipoAusencia } from '@/lib/types/entites/tipoAusencia';
import { TipoJornada } from '@/lib/types/entites/tipoJornada';

export const TablaJornadasFormulario = ({
    formularioDatos,
    formularioCargando,
    control,
    watch,
    jornadaPartida,
    onCambioJornadaPartida,
    setValue
}: TablaJornadasFormularioProps) => {

    const tipoJornadaValue = watch('tipoJornada')

    useEffect(() => {
        if (tipoJornadaValue !== formularioDatos?.id_ausencia) {
            setValue('tipoAusencia', '');
        }
    }, [tipoJornadaValue, formularioDatos?.id_ausencia, setValue]);

    return (
        <form className='flex flex-col justify-start items-center w-full gap-2 sm:gap-3 p-2'>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                {formularioCargando ?
                    <Skeleton
                        variant='rectangular'
                        width='100%'
                        height='40px'
                        sx={{ borderRadius: '5px' }}
                    />
                    :
                    <Controller
                        name='tipoJornada'
                        control={control}
                        rules={{ required: 'Debe seleccionar un tipo de jornada' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id='tipojornada'
                                label='Tipo de Jornada'
                                variant='outlined'
                                color='warning'
                                size='small'
                                className='!w-[50%]'
                                select
                                error={!!error}
                                disabled={!formularioDatos?.tiposJornada || formularioDatos.tiposJornada.length === 0}
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
                                {formularioDatos?.tiposJornada.map((tipo: TipoJornada) => (
                                    <MenuItem key={tipo.id} value={tipo.id}>
                                        {tipo.nombre}
                                    </MenuItem>
                                )) || []}
                            </TextField>
                        )}
                    />
                }
                {watch('tipoJornada') !== formularioDatos?.id_ausencia && watch('tipoJornada') !== '' &&
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} />}
                        label='Jornada Partida'
                        className='justify-center !w-[50%] !h-10 !text-gray-700'
                        onChange={onCambioJornadaPartida}
                        checked={jornadaPartida}
                    />
                }
                {watch('tipoJornada') === formularioDatos?.id_ausencia ?
                    formularioCargando ?
                        <Skeleton
                            variant='rectangular'
                            width='100%'
                            height='40px'
                            sx={{ borderRadius: '5px' }}
                        />
                        :
                        <Controller
                            name='tipoAusencia'
                            control={control}
                            rules={{ required: 'Debe seleccionar un tipo de jornada' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id='tipoausencia'
                                    label='Tipo de Ausencia'
                                    variant='outlined'
                                    color='warning'
                                    size='small'
                                    className='!w-[50%]'
                                    select
                                    error={!!error}
                                    disabled={!formularioDatos?.tiposAusencia || formularioDatos.tiposAusencia.length === 0}
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
                                    {formularioDatos?.tiposAusencia.map((tipo: TipoAusencia) => (
                                        <MenuItem key={tipo.id} value={tipo.id}>
                                            {tipo.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    :
                    <></>
                }
            </div>
            <div className='flex flex-row justify-start items-start gap-2 w-full'>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                    <Controller
                        name='fecha'
                        control={control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                            <DatePicker
                                {...restField}
                                label='Fecha'
                                className='!w-[33%]'
                                value={value ? dayjs(value, 'DD-MM-YYYY') : null}
                                onChange={(newValue) => {
                                    onChange(newValue ? newValue.format('DD-MM-YYYY') : '');
                                }}
                                format='DD-MM-YYYY'
                                slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        color: 'warning',
                                        size: 'small',
                                        error: !!error,
                                        helperText: error?.message,
                                    }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
                <div className='flex flex-col justify-start items-center gap-2 w-[67%]'>
                    {watch('tipoJornada') !== formularioDatos?.id_ausencia &&
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <Controller
                                name='entrada'
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label={jornadaPartida ? 'Marca de Entrada de Mañana' : 'Marca de Entrada'}
                                        className='!w-[50%]'
                                        value={value ? dayjs(value, 'HH:mm:ss') : null}
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
                                            }
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name='salida'
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label={jornadaPartida ? 'Marca de Salida de Mañana' : 'Marca de Salida'}
                                        className='!w-[50%]'
                                        value={value ? dayjs(value, 'HH:mm:ss') : null}
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
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    }
                    {jornadaPartida === true && watch('tipoJornada') !== formularioDatos?.id_ausencia ? (
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <Controller
                                name='entradaTarde'
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label='Marca de Entrada de Tarde'
                                        className='!w-[50%]'
                                        value={value ? dayjs(value, 'HH:mm:ss') : null}
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
                                            }
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name='salidaTarde'
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label='Marca de Salida de Tarde'
                                        className='!w-[50%]'
                                        value={value ? dayjs(value, 'HH:mm:ss') : null}
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
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                <Controller
                    name='observacion'
                    control={control}
                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                        <TextField
                            {...restField}
                            label='Observaciones'
                            color='warning'
                            rows={5}
                            multiline
                            fullWidth
                            value={value || ''}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </div>
        </form>
    );
};