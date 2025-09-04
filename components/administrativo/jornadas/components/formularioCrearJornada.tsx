import { IOSSwitch } from "@/components/ui/switch";
import { Divider, FormControlLabel, MenuItem, Skeleton, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { formularioCrearJornadaProps } from "../types";

export const FormularioCrearJornada = ({
    formularioDatos,
    formularioCargando,
    control,
    watch,
    switchFormulario,
    setValue
}: formularioCrearJornadaProps) => {
    
    const tipoJornadaValue = watch("tipoJornada")

    useEffect(() => {
        if (tipoJornadaValue !== formularioDatos?.id_ausencia) {
            setValue("tipoAusencia", "");
        }
    }, [tipoJornadaValue, formularioDatos?.id_ausencia, setValue]);

    return (
        <form className="flex flex-col justify-start items-center gap-4 h-auto w-full">
            <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
            <div className="flex flex-row justify-start items-center gap-2 w-full">
                {formularioCargando ?
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="40px"
                        sx={{ borderRadius: "5px" }}
                    />
                    :
                    <Controller
                        name="tipoJornada"
                        control={control}
                        rules={{ required: "Debe seleccionar un tipo de jornada" }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id="tipojornada"
                                label="Tipo de Jornada"
                                variant="outlined"
                                color="warning"
                                size="small"
                                className="!w-[50%]"
                                select
                                error={!!error}
                            >
                                {formularioDatos?.tiposJornada?.map((tipo: { id: number, nombre: string }) => (
                                    <MenuItem key={tipo.id} value={tipo.id}>
                                        {tipo.nombre}
                                    </MenuItem>
                                )) || []}
                            </TextField>
                        )}
                    />
                }
                {watch("tipoJornada") === formularioDatos?.id_jornadaNormal ?
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} />}
                        label="Jornada Partida"
                        className="justify-center !w-[50%] !h-10 !text-gray-700"
                        onChange={switchFormulario.onCambioJornadaPartida}
                        checked={switchFormulario.jornadaPartida}
                    />
                    :
                    <></>
                }
                {watch("tipoJornada") === formularioDatos?.id_ausencia ?
                    formularioCargando ?
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="40px"
                            sx={{ borderRadius: "5px" }}
                        />
                        :
                        <Controller
                            name="tipoAusencia"
                            control={control}
                            rules={{ required: "Debe seleccionar un tipo de jornada" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="tipoausencia"
                                    label="Tipo de Ausencia"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    className="!w-[50%]"
                                    select
                                    error={!!error}
                                >
                                    {formularioDatos?.tiposAusencia?.map((tipo: { id: number, nombre: string }) => (
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
            <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
            <div className="flex flex-row justify-start items-start gap-2 w-full">
                <Controller
                    name="fecha"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                        <DatePicker
                            {...restField}
                            label="Fecha"
                            className="!w-[33%]"
                            value={value ? dayjs(value, 'DD-MM-YYYY') : null}
                            onChange={(newValue) => {
                                onChange(newValue ? newValue.format('DD-MM-YYYY') : '');
                            }}
                            format="DD-MM-YYYY"
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
                <div className="flex flex-col justify-start items-center gap-2 w-[67%]">
                    {watch("tipoJornada") !== formularioDatos?.id_ausencia ? (
                        <div className="flex flex-row justify-start items-center gap-2 w-full">
                            <Controller
                                name="entrada"
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label={watch("tipoJornada") === formularioDatos?.id_jornadaPartida ? "Marca de Entrada de Mañana" : "Marca de Entrada"}
                                        className="!w-[50%]"
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
                                            }
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="salida"
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label={watch("tipoJornada") === formularioDatos?.id_jornadaPartida ? "Marca de Salida de Mañana" : "Marca de Salida"}
                                        className="!w-[50%]"
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
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    {watch("jornadaPartida") === true ? (
                        <div className="flex flex-row justify-start items-center gap-2 w-full">
                            <Controller
                                name="entradaTarde"
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label="Marca de Entrada de Tarde"
                                        className="!w-[50%]"
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
                                            }
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="salidaTarde"
                                control={control}
                                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                                    <TimePicker
                                        {...restField}
                                        label="Marca de Salida de Tarde"
                                        className="!w-[50%]"
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
            <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
            <div className="flex flex-row justify-start items-center gap-2 w-full">
                <Controller
                    name="observacion"
                    control={control}
                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                        <TextField
                            label="Observaciones"
                            color="warning"
                            rows={5}
                            multiline
                            fullWidth
                            value={value || ""}
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