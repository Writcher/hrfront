import { Button } from "@mui/material";
import { Formulario } from "./tablaImportacionesFiltrosFormulario";
import Link from "next/link";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { tablaImportacionesFiltrosProps } from "../types";

export const TablaImportacionesFiltros = ({ proyectos, cargando, filtroIncompletas, filtroProyecto, handleLimpiarFiltros, onCambioFiltroIncompletas, onCambioFiltroProyecto, esAdministrativo }: tablaImportacionesFiltrosProps) => (
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
        <Formulario
            filtroIncompletas={filtroIncompletas}
            filtroProyecto={filtroProyecto}
            onCambioFiltroProyecto={onCambioFiltroProyecto}
            onCambioFiltroIncompletas={onCambioFiltroIncompletas}
            proyectos={proyectos}
            cargando={cargando}
        />
        <div className="flex grow" />
        {esAdministrativo &&
            <Button
                component={Link}
                href={"/administrativo/importaciones/importar"}
                variant="contained"
                color="success"
                disableElevation
                endIcon={<UploadFileRoundedIcon />}
            >
                Importar Informe
            </Button>
        }
    </div>
);