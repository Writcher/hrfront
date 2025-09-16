import { TextField, MenuItem, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import { formularioProps, proyecto, tipoJornada } from "../types";

export const Formulario = ({
    control,
    cargando,
    selectDatos,
}: formularioProps) => (
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
                    >
                        {selectDatos?.proyectos?.map((proyecto: proyecto) => (
                            <MenuItem key={proyecto.id} value={proyecto.id}>
                                {proyecto.nombre}
                            </MenuItem>
                        )) || []}
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
                    >
                        {selectDatos?.tiposJornada?.map((tipo: tipoJornada) => (
                            <MenuItem key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </MenuItem>
                        )) || []}
                    </TextField>
                )}
            />
        )}
    </div>
);