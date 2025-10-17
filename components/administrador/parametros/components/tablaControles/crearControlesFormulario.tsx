import { MenuItem, Skeleton, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { proyectoSelect, formularioCrearControlesProps } from "../../types";

export const Formulario = ({ control, cargando, proyectos }: formularioCrearControlesProps) => (
    <div className="flex flex-col items-center justify-center w-[80%] h-full gap-4">
        <Controller
            name="serie"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="serie"
                    label="Numero de Serie"
                    variant="outlined"
                    color="warning"
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
        {cargando ? (
            <Skeleton
                variant="rectangular"
                width="100%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            />
        ) : (
            <Controller
                name="id_proyecto"
                control={control}
                rules={{ required: "Debe seleccionar un proyecto" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="id_Proyecto"
                        label="Proyecto"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        disabled={proyectos.length === 0}
                    >
                        {proyectos.map((proyecto: proyectoSelect) => (
                            <MenuItem key={proyecto.id} value={proyecto.id}>
                                {proyecto.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        )}
    </div>
);