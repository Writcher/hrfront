import { TextField, MenuItem, FormControlLabel, Skeleton } from "@mui/material";

interface FormularioFiltrosProps {
    filtroMes: number | '';
    filtroQuincena: number | '';
    selectCargando: boolean;
    selectDatos: any[];
    onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getNombreMes: (mes: number) => string;
}

export const FormularioFiltros: React.FC<FormularioFiltrosProps> = ({
    filtroMes,
    filtroQuincena,
    selectCargando,
    selectDatos,
    onCambioFiltroMes,
    onCambioFiltroQuincena,
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
            disabled={filtroMes === ''}
        >
            <MenuItem key={1} value={1}>Primera Quincena</MenuItem>
            <MenuItem key={2} value={2}>Segunda Quincena</MenuItem>
        </TextField>
    </form>
);