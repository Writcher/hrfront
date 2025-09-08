import { Controller } from "react-hook-form";
import { formularioProps } from "../types";
import { MenuItem, Skeleton, TextField } from "@mui/material";

export const Formulario = ({
    control,
    selectCargando,
    selectDatos,
}: formularioProps) => (
    <div className="flex flex-col items-center justify-center w-[80%] h-full gap-4">
        <div className="flex flex-row w-full gap-4">
            <Controller
                name="legajo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="legajo"
                        label="Legajo"
                        variant="outlined"
                        color="warning"
                        size="small"
                        type="number"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
            <Controller
                name="id_reloj"
                control={control}
                rules={{ required: "Debe ingresar ID en reloj" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="id_reloj"
                        label="ID en Reloj"
                        variant="outlined"
                        color="warning"
                        size="small"
                        type="number"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
        </div>
        <Controller
            name="nombre"
            control={control}
            rules={{ required: "Debe ingresar nombre y apellido" }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="nombre"
                    label="Nombre y Apellido"
                    variant="outlined"
                    color="warning"
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
        {selectCargando ? (
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
                        id="id_proyecto"
                        label="Seleccionar Proyecto"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    >
                        {selectDatos?.map((proyectos: { id: number, nombre: string }) => (
                            <MenuItem key={proyectos.id} value={proyectos.id}>
                                {proyectos.nombre}
                            </MenuItem>
                        )) || []}
                    </TextField>
                )}
            />
        )}
    </div>
);