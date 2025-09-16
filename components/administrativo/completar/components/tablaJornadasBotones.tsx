import { Button } from "@mui/material";
import Link from "next/link";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { botonesTablaProps } from "../types";

export const Botones = ({ onComplete, pendiente, deshabilitado, cargando }: botonesTablaProps) => (
    <div className="flex w-full justify-between">
        <Button
            component={Link}
            variant="contained"
            color="warning"
            href={"/administrativo/importaciones"}
            disableElevation
            startIcon={<ArrowBackRoundedIcon />}
        >
            Importaciones
        </Button>
        <Button
            variant="contained"
            color="success"
            disableElevation
            onClick={onComplete}
            endIcon={
                pendiente 
                ? <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} /> 
                : <SaveAsRoundedIcon />
            }
            disabled={pendiente || deshabilitado || cargando}
        >
            {pendiente ? "Confirmando" : "Confirmar"}
        </Button>
    </div>
);