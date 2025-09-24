import { IOSSwitch } from "@/components/ui/switch";
import { TextField, MenuItem, FormControlLabel, Skeleton } from "@mui/material";
import { formularioProps, proyecto } from "../types";

export const Formulario = ({ filtroIncompletas, filtroProyecto, proyectos, cargando, onCambioFiltroIncompletas, onCambioFiltroProyecto }: formularioProps) => (
    <form className="flex items-center justify-start w-4/6 gap-4">
        {cargando ?
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
                {proyectos?.map((proyectos: proyecto) => (
                    <MenuItem key={proyectos.id} value={proyectos.id}>
                        {proyectos.nombre}
                    </MenuItem>
                )) || []}
            </TextField>
        }
        <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Solo Importaciones Incompletas"
            className="w-full !text-gray-700"
            onChange={onCambioFiltroIncompletas}
            checked={filtroIncompletas}
        />
    </form>
);