import { Button } from "@mui/material";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { botonesFormularioProps } from "@/components/empleados/types";

export const Botones = ({ handleMostrarFormulario, creando, camposValidos }: botonesFormularioProps) => (
    <div className="flex justify-between items-center w-full">
        <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={handleMostrarFormulario}
            endIcon={<CloseRoundedIcon />}
            disabled={creando}
        >
            Cancelar
        </Button>
        <Button
            type="submit"
            variant="contained"
            color="success"
            disableElevation
            endIcon={
                creando ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <SaveAsRoundedIcon />
            }
            disabled={creando || !camposValidos}
        >
            {creando ? "Guardando" : "Guardar"}
        </Button>
    </div>
)