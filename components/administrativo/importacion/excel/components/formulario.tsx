import { TextField, MenuItem, Skeleton } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { importarExcelDatos } from "../types";

interface FormularioProps {
    control: Control<importarExcelDatos>;
    selectCargando: boolean;
    selectDatos: any;
}

export const Formulario: React.FC<FormularioProps> = ({
    control,
    selectCargando,
    selectDatos,
}) => (
    <div className="flex items-center justify-start w-full gap-4">
        {selectCargando ? (
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
                        {selectDatos.proyectos.map((proyecto: { id: number, nombre: string }) => (
                            <MenuItem key={proyecto.id} value={proyecto.id}>
                                {proyecto.nombre}
                            </MenuItem>
                        ))}
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
                        {selectDatos.tiposJornada.map((tipo: { id: number, nombre: string }) => (
                            <MenuItem key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        )}
    </div>
);