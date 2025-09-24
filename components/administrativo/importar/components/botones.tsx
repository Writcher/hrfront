import { Button } from "@mui/material";
import Link from "next/link";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { botonesProps } from "../types";

export const Botones = ({ importando, camposValidos }: botonesProps) => (
    <div className="flex justify-between w-full">
        <Button
            component={Link}
            variant="contained"
            color="warning"
            href={"/administrativo/importaciones"}
            disableElevation
            startIcon={
                importando ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <ArrowBackRoundedIcon />
            }
            disabled={importando}
        >
            Importaciones
        </Button>
        <Button
            type="submit"
            variant="contained"
            color="success"
            disableElevation
            endIcon={
                importando ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                ) : <UploadFileRoundedIcon />
            }
            disabled={importando || !camposValidos}
        >
            {!importando ? "Guardar" : "Guardando"}
        </Button>
    </div>
);