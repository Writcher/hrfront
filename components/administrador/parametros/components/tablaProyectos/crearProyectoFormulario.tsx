import { MenuItem, Skeleton, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { formularioCrearProyectoProps, modalidadTrabajo } from "../../types";

export const Formulario = ({ control, cargando, modalidadesTrabajo }: formularioCrearProyectoProps) => (
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
        {cargando ? (
            <Skeleton
                variant="rectangular"
                width="100%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            />
        ) : (
            <Controller
                name="id_modalidadtrabajo"
                control={control}
                rules={{ required: "Debe seleccionar una modalidado" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        id="id_tipousuario"
                        label="Modalidad de Trabajo"
                        variant="outlined"
                        color="warning"
                        size="small"
                        select
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        disabled={modalidadesTrabajo.length === 0}
                    >
                        {modalidadesTrabajo.map((modalidadTrabajo: modalidadTrabajo) => (
                            <MenuItem key={modalidadTrabajo.id} value={modalidadTrabajo.id}>
                                {modalidadTrabajo.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        )}
    </div>
);