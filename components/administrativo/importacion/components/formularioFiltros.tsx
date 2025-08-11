import { IOSSwitch } from "@/components/ui/switch";
import { TextField, MenuItem, FormControlLabel, Skeleton } from "@mui/material";
import { SyntheticEvent } from "react";

interface FormularioFiltrosProps {
    filtroIncompletas: boolean;
    filtroProyecto: number;
    selectDatos: any[];
    selectCargando: boolean;
    onCambioFiltroIncompletas: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
    onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormularioFiltros: React.FC<FormularioFiltrosProps> = ({
    filtroIncompletas,
    filtroProyecto,
    selectDatos,
    selectCargando,
    onCambioFiltroIncompletas,
    onCambioFiltroProyecto
}) => (
    <form className="flex items-center justify-start w-4/6 gap-4">
        {selectCargando ?
            <Skeleton
                variant="rectangular"
                width="33%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            /> :
            <TextField
                id="filtroProyecto"
                name="filtroProyecto"
                label="Filtrar por Proyecto"
                type="text"
                variant="outlined"
                color="warning"
                size="small"
                className="!w-2/6"
                select
                value={filtroProyecto}
                onChange={onCambioFiltroProyecto}
            >
                {selectDatos?.map((proyectos: { id: number, nombre: string }) => (
                    <MenuItem key={proyectos.id} value={proyectos.id}>
                        {proyectos.nombre}
                    </MenuItem>
                ))}
            </TextField>
        }
        <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Solo Importaciones con Fichajes Incompletos"
            className="w-full !text-gray-700"
            onChange={onCambioFiltroIncompletas}
            checked={filtroIncompletas}
        />
    </form>
);