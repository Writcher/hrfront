import { TextField, MenuItem, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import { formularioProps } from "../types";
import { getNombreMes } from "../utils";

export const Formulario = ({
    control,
    selectCargando,
    selectDatos,
    watch,
}: formularioProps) => (
    <div className="flex flex-col items-center justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full gap-2">
            {selectCargando ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="40px"
                    sx={{ borderRadius: "5px" }}
                />
            ) : (
                <Controller
                    name="proyectos"
                    control={control}
                    rules={{ required: "Debe seleccionar al menos un proyecto" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="proyectos"
                            label="Seleccionar Proyecto/s"
                            variant="outlined"
                            color="warning"
                            size="small"
                            select
                            slotProps={{
                                select: {
                                    multiple: true,
                                    renderValue: (selected) => {
                                        const selectedArray = selected as number[];
                                        return selectedArray
                                            .map(id => selectDatos?.proyectos?.find(p => p.id === id)?.nombre)
                                            .filter(Boolean)
                                            .join(', ');
                                    },
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
                                }
                            }}
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                        >
                            {selectDatos?.proyectos?.map((proyecto: { id: number, nombre: string }) => (
                                <MenuItem key={proyecto.id} value={proyecto.id}>
                                    {proyecto.nombre}
                                </MenuItem>
                            )) || []}
                        </TextField>
                    )}
                />
            )}
            {selectCargando ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="40px"
                    sx={{ borderRadius: "5px" }}
                />
            ) : (
                <Controller
                    name="tipoEmpleado"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="tipoEmpleado"
                            label="Seleccionar Tipo de Empleado"
                            variant="outlined"
                            color="warning"
                            size="small"
                            select
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
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
                            {selectDatos?.tiposEmpleado?.map((tipoEmpleado: { id: number, nombre: string }) => (
                                <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
                                    {tipoEmpleado.nombre}
                                </MenuItem>
                            )) || []}
                        </TextField>
                    )}
                />
            )}
        </div>
        <div className="flex items-center justify-between w-full gap-2">
            {selectCargando ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="40px"
                    sx={{ borderRadius: "5px" }}
                />
            ) : (
                <Controller
                    name="mes"
                    control={control}
                    rules={{ required: "Debe seleccionar un mes" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="mes"
                            label="Seleccionar Mes"
                            variant="outlined"
                            color="warning"
                            size="small"
                            select
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
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
                            {selectDatos?.meses?.map((mes: { id: number, mes: number, id_año: number }) => (
                                <MenuItem key={mes.id} value={mes.id}>
                                    {getNombreMes(mes.mes)} de {mes.id_año}
                                </MenuItem>
                            )) || []}
                        </TextField>
                    )}
                />
            )}
            <Controller
                name="quincena"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="quincena"
                        label="Seleccionar Quincena"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        disabled={watch("mes") === ''}
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
                        <MenuItem key={1} value={1}>Primera Quincena</MenuItem>
                        <MenuItem key={2} value={2}>Segunda Quincena</MenuItem>
                    </TextField>
                )}
            />
        </div>
    </div>
);
