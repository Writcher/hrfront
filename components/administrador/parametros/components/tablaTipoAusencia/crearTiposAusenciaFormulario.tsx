import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { formularioCrearTipoAusenciaProps } from "../../types";

export const Formulario = ({ control }: formularioCrearTipoAusenciaProps) => (
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
    </div>
);