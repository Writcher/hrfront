import { Button } from "@mui/material";
import { FormularioFiltros } from "./formularioFiltros";
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { encabezadoTablaProps } from "../types";

export const EncabezadoTabla = ({ selectDatos, selectCargando, filtroIncompletas, filtroProyecto, handleLimpiarFiltros, onCambioFiltroIncompletas, onCambioFiltroProyecto }: encabezadoTablaProps) => (
    <div className="flex flex-row gap-2 w-full">
        <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={handleLimpiarFiltros}
            endIcon={<FilterAltOffRoundedIcon />}
        >
            Limpiar Filtro
        </Button>
        <FormularioFiltros
            filtroIncompletas={filtroIncompletas}
            filtroProyecto={filtroProyecto}
            onCambioFiltroProyecto={onCambioFiltroProyecto}
            onCambioFiltroIncompletas={onCambioFiltroIncompletas}
            selectDatos={selectDatos}
            selectCargando={selectCargando}
        />
        <div className="flex grow" />
    </div>
);