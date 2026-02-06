import { Button } from "@mui/material";
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { Formulario } from "./tablaJornadasFiltrosFormulario";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';
import { getNombreMes } from "@/components/rrhh/exportar/utils";
import { botonesFiltrosHijoProps, botonesFiltrosHijoRRHHProps } from "../../types";

export const Botones = ({ formularioVisible, handleLimpiarFiltros, filtroMes, filtroQuincena, filtroMarcasIncompletas, cargando, meses, creando, camposValidos, handleCambioFiltroMarcasIncompletas, handleCambioFiltroQuincena, handleCambioFiltroMes, handleMostrarFormulario, estado, onCreate }: botonesFiltrosHijoProps) => (
    <div className="flex flex-row gap-2 w-full h-11 items-center">
        {formularioVisible ? (
            <></>
        ) : (
            <>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    className="!h-[40px]"
                    disableElevation
                    onClick={handleLimpiarFiltros}
                    endIcon={<FilterAltOffRoundedIcon />}
                >
                    Limpiar Filtros
                </Button>
                <Formulario
                    filtroMes={filtroMes}
                    filtroQuincena={filtroQuincena}
                    filtroMarcasIncompletas={filtroMarcasIncompletas}
                    cargando={cargando}
                    meses={meses}
                    onCambioFiltroMes={handleCambioFiltroMes}
                    onCambioFiltroQuincena={handleCambioFiltroQuincena}
                    onCambioFiltroMarcaIncompleta={handleCambioFiltroMarcasIncompletas}
                    getNombreMes={getNombreMes}
                />
                <div className="flex grow" />
            </>
        )}
        <Button
            variant="contained"
            color={formularioVisible ? "error" : "success"}
            size="small"
            className="!h-[40px]"
            disableElevation
            onClick={handleMostrarFormulario}
            endIcon={formularioVisible ? <CloseRoundedIcon /> : <UploadRoundedIcon />}
            disabled={estado.toLowerCase() === 'baja'}

        >
            {formularioVisible ? "Cancelar" : "Carga Manual"}
        </Button>
        {formularioVisible ? (
            <>
                <div className="flex grow" />
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    className="!h-[40px]"
                    disableElevation
                    endIcon={
                        creando ? (
                            <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                        ) : <SaveAsRoundedIcon />
                    }
                    onClick={onCreate}
                    disabled={creando || !camposValidos}
                >
                    {!creando ? "Guardar" : "Guardando"}
                </Button>
            </>
        ) :
            <></>
        }
    </div>
)

export const BotonesRRHH = ({ handleLimpiarFiltros, filtroMes, filtroQuincena, filtroMarcasIncompletas, cargando, meses, handleCambioFiltroMarcasIncompletas, handleCambioFiltroQuincena, handleCambioFiltroMes }: botonesFiltrosHijoRRHHProps) => (
    <div className="flex flex-row gap-2 w-full h-11 items-center">
        <Button
            variant="contained"
            color="error"
            size="small"
            className="!h-[40px]"
            disableElevation
            onClick={handleLimpiarFiltros}
            endIcon={<FilterAltOffRoundedIcon />}
        >
            Limpiar Filtros
        </Button>
        <Formulario
            filtroMes={filtroMes}
            filtroQuincena={filtroQuincena}
            filtroMarcasIncompletas={filtroMarcasIncompletas}
            cargando={cargando}
            meses={meses}
            onCambioFiltroMes={handleCambioFiltroMes}
            onCambioFiltroQuincena={handleCambioFiltroQuincena}
            onCambioFiltroMarcaIncompleta={handleCambioFiltroMarcasIncompletas}
            getNombreMes={getNombreMes}
        />
        <div className="flex grow" />
    </div>
)