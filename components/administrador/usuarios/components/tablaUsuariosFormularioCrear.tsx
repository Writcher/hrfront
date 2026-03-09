import { Controller } from "react-hook-form";
import { formularioProps, tipoUsuario } from "../types";
import { MenuItem, Skeleton, TextField } from "@mui/material";

export const Formulario = ({
    control,
    cargando,
    tiposUsuario
}: formularioProps) => (
    <div className="flex flex-col items-center justify-center w-[80%] h-full gap-4">
        <Controller
            name="nombre"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    color="warning"
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
        <Controller
            name="correo"
            control={control}
            rules={{ required: "Debe ingresar un correo" }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="correo"
                    label="Correo"
                    variant="outlined"
                    color="warning"
                    size="small"
                    type="email"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
        <Controller
            name="contraseña"
            control={control}
            rules={{ required: "Debe ingresar una contraseña" }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="contraseña"
                    label="Contraseña"
                    variant="outlined"
                    color="warning"
                    size="small"
                    type="password"
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
                name="id_tipousuario"
                control={control}
                rules={{ required: "Debe seleccionar un tipo de usuario" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="id_tipousuario"
                        label="Seleccionar tipo de usuario"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        disabled={tiposUsuario.length === 0}
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
                        {tiposUsuario.map((tipoUsuario: tipoUsuario) => (
                            <MenuItem key={tipoUsuario.id} value={tipoUsuario.id}>
                                {tipoUsuario.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        )}
    </div>
);