import LightTooltip from "@/components/ui/tooltip";
import { Button } from "@mui/material";
import Link from "next/link";
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { filaBotonesProps } from "../types";

export const Botones = ({ id, completa, borrando, onDelete }: filaBotonesProps) => (
    <div className="flex justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)] gap-2">
        <LightTooltip title="Revisar" placement="left" arrow>
            <Button
                component={Link}
                href={`/administrativo/importacion/${id}/completar`}
                variant="contained"
                color="success"
                size="small"
                disableElevation
                disabled={borrando || completa}
            >
                <EditNoteRoundedIcon />
            </Button>
        </LightTooltip>
        <LightTooltip title="Borrar" placement="left" arrow>
            <Button
                variant="contained"
                color="error"
                disableElevation
                size="small"
                disabled={borrando || completa}
                onClick={onDelete}
            >
                {!borrando ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
            </Button>
        </LightTooltip>
    </div>
);