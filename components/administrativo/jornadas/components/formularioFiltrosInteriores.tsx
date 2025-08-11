import { IOSSwitch } from "@/components/ui/switch";
import { TextField, MenuItem, FormControlLabel, Skeleton } from "@mui/material";
import { SyntheticEvent } from "react";

interface FormularioFiltrosProps {
    filtroMes: number;
    filtroQuincena: number;
    filtroMarcasIncompletas: boolean;
    selectCargando: boolean; 
    selectDatos: any[];
    onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCambioFiltroMarcaIncompleta: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
    getNombreMes: (mes: number) => string;
}

export const FormularioFiltros: React.FC<FormularioFiltrosProps> = ({
    filtroMes,
    filtroQuincena,
    filtroMarcasIncompletas,
    selectCargando,
    selectDatos,
    onCambioFiltroMes,
    onCambioFiltroQuincena,
    onCambioFiltroMarcaIncompleta,
    getNombreMes,
}) => (
    <form className="flex items-center justify-start w-4/6 gap-4">
        {selectCargando ?
            <Skeleton
                variant="rectangular"
                width="100%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            /> :
            <TextField
                id="month"
                name="month"
                label="Filtrar por Mes"
                type="text"
                variant="outlined"
                color="warning"
                size="small"
                select
                fullWidth
                value={filtroMes}
                onChange={onCambioFiltroMes}
            >
                {selectDatos.map((mes: any) => (
                    <MenuItem key={mes.id} value={mes.id}>{getNombreMes(mes.mes)} de {mes.id_año}</MenuItem>
                ))}
            </TextField>
        }
        <TextField
            id="quincena"
            name="quincena"
            label="Filtrar por Quincena"
            type="text"
            variant="outlined"
            color="warning"
            size="small"
            select
            fullWidth
            value={filtroQuincena}
            onChange={onCambioFiltroQuincena}
            disabled={filtroMes === 0}
        >
            <MenuItem key={1} value={1}>Primera Quincena</MenuItem>
            <MenuItem key={2} value={2}>Segunda Quincena</MenuItem>
        </TextField>
        <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Solo Fichajes Incompletos"
            className="w-full !text-gray-700"
            onChange={onCambioFiltroMarcaIncompleta}
            value={filtroMarcasIncompletas}
        />
    </form>
);