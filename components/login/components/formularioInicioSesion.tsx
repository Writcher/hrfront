import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormularioInicioSesionProps {
    control: any;
}

export const FormularioInicioSesion: React.FC<FormularioInicioSesionProps> = ({
    control
}) => (
    <div className="flex flex-col items-center gap-4 w-[40%]">
        <Controller
            name="correo"
            control={control}
            rules={{ required: "Debe ingresar su correo electronico" }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="correo"
                    label="Correo Electronico"
                    variant="outlined"
                    color="warning"
                    size="small"
                    fullWidth
                    type="email"
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
        <Controller
            name="contraseña"
            control={control}
            rules={{ required: "Debe ingresar su contraseña" }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id="correo"
                    label="Contraseña"
                    variant="outlined"
                    color="warning"
                    size="small"
                    fullWidth
                    type="password"
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
    </div>
)