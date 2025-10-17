import { TextField, MenuItem, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import { formularioProps, proyecto, tipoJornada, tipoImportacion } from "../types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const Formulario = ({
    control,
    watch,
    cargando,
    proyectos,
    tiposImportacion,
    tiposJornada
}: formularioProps) => (
    <>
        <div className="flex items-center justify-start w-full gap-2">
            {cargando ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
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
                            fullWidth
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
                    width="100%"
                    height="40px"
                    sx={{ borderRadius: "5px" }}
                />
            ) : (
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
                            select
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            disabled={tiposJornada.length === 0}
                        >
                            {tiposJornada.map((tipo: tipoJornada) => (
                                <MenuItem key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            )}
            {cargando ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="40px"
                    sx={{ borderRadius: "5px" }}
                />
            ) : (
                <Controller
                    name="tipoInforme"
                    control={control}
                    rules={{ required: "Debe seleccionar un tipo de informe" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="tipoInforme"
                            label="Tipo de Informe"
                            variant="outlined"
                            color="warning"
                            size="small"
                            select
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            disabled={tiposImportacion.length === 0}
                        >
                            {tiposImportacion.map((tipo: tipoImportacion) => (
                                <MenuItem key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            )}
        </div>
        {watch("tipoInforme") === 2 &&
            <div className="flex items-center justify-start w-full gap-2">
                <Controller
                    name="fecha"
                    control={control}
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
            </div>
        }
    </>
);