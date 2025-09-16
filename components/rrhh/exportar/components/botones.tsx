import { botonesProps } from "../types";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import { Button } from "@mui/material";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SyncIcon from '@mui/icons-material/Sync';

export const Botones = ({ exportando, camposValidos }: botonesProps) => (
    <div className="flex justify-between w-full">
        <Button
            component={Link}
            variant="contained"
            color="warning"
            href={"/rrhh/jornadas"}
            disableElevation
            startIcon={
                exportando ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <ArrowBackRoundedIcon />
            }
            disabled={exportando}
        >
            Resumen
        </Button>
        <Button
            type="submit"
            variant="contained"
            color="success"
            disableElevation
            endIcon={
                exportando ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <DownloadRoundedIcon />
            }
            disabled={exportando || !camposValidos}
        >
            {!exportando ? "Descargar" : "Descargando"}
        </Button>
    </div>
);