import { MenuItem, Skeleton, TextField } from "@mui/material";
import { formularioProps, proyecto } from "../types"
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Formulario = ({ control, cargando, proyectos }: formularioProps) => (
    <form className="flex items-center justify-start w-[40%] gap-1">
        {cargando ? (
            <Skeleton
                variant="rectangular"
                width="50%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            />
        ) : (
            <Controller
                name="proyecto"
                control={control}
                rules={{ required: "Debe seleccionar un proyecto" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="proyecto"
                        label="Seleccionar Proyecto"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        className="!w-[50%]"
                        error={!!error}
                        helperText={error?.message}
                        disabled={proyectos.length === 0}
                    >
                        {proyectos.map((proyecto: proyecto) => (
                            <MenuItem key={proyecto.id} value={proyecto.id}>
                                {proyecto.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        )}
        {cargando ? (
            <Skeleton
                variant="rectangular"
                width="50%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            />
        ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Controller
                    name="fecha"
                    control={control}
                    rules={{ required: "Debe seleccionar una fecha" }}
                    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                        <DatePicker
                            {...restField}
                            label="Fecha"
                            className="!w-[50%]"
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
            </LocalizationProvider>
        )}
    </form>
);