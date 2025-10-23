import LightTooltip from "@/components/ui/tooltip";
import { Button } from "@mui/material";
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { botonesFilaProps } from "../types";

export const Botones = ({ editando, borrando, validando, validada, camposValidos, confirmarBorrar, confirmarValidar, handleConfirmarBorrar, handleConfirmarValidar, onDelete, onEdit, onValidate }: botonesFilaProps) => (
    <>
        <LightTooltip title="Guardar" placement="left" arrow>
            <Button
                variant="contained"
                color="info"
                disableElevation
                size="small"
                disabled={editando || borrando || validando || !camposValidos || validada}
                onClick={onEdit}
            >
                {!editando ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
            </Button>
        </LightTooltip>
        <LightTooltip title={confirmarBorrar ? "Confirmar" : "¿Borrar?"} placement="left" arrow>
            <Button
                variant={confirmarBorrar ? "contained" : "outlined"}
                color="error"
                disableElevation
                className={confirmarBorrar ? "" : validada ? "" : "!bg-white"}
                size="small"
                disabled={editando || borrando || validando || validada}
                onBlur={() => handleConfirmarBorrar(false)}
                onClick={confirmarBorrar ? onDelete : () => handleConfirmarBorrar()}
            >
                {!borrando ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
            </Button>
        </LightTooltip>
        <LightTooltip title={confirmarValidar ? "Confirmar" : "¿Validar?"} placement="left" arrow>
            <Button
                variant={confirmarValidar ? "contained" : "outlined"}
                color="success"
                disableElevation
                className={confirmarValidar ? "" : validada ? "" : !camposValidos ? "" : "!bg-white"}
                size="small"
                disabled={editando || borrando || validando || !camposValidos || validada}
                onBlur={() => handleConfirmarValidar(false)}
                onClick={confirmarValidar ? onValidate : () => handleConfirmarValidar()}
            >
                {!validando ? <VerifiedUserRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
            </Button>
        </LightTooltip>
    </>
);