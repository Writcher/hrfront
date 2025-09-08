import { Button } from "@mui/material";
import Link from "next/link";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { botonesTablaProps } from "../types";

export const BotonesTabla = ({ onSubmit, mutacionPendiente, botonDeshabilitado, jornadasCargando }: botonesTablaProps) => (
    <div className="flex w-full justify-between">
        <Button
            component={Link}
            variant="contained"
            color="warning"
            href={"/administrativo/importacion"}
            disableElevation
            startIcon={<ArrowBackRoundedIcon />}
        >
            Importaciones
        </Button>
        <Button
            variant="contained"
            color="success"
            disableElevation
            onClick={onSubmit}
            endIcon={
                mutacionPendiente ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <SaveAsRoundedIcon />
            }
            disabled={mutacionPendiente || botonDeshabilitado || jornadasCargando}
        >
            {mutacionPendiente ? "Confirmando" : "Confirmar"}
        </Button>
    </div>
);