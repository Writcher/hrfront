import LightTooltip from "@/components/ui/tooltip";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { Button } from "@mui/material";
import { filaBotonesProps } from "../../types";

export const BotonesFila = ({ editando, borrando, isValid, formularioVisible, handleMostrarFormulario, handleSubmit, onDelete, confirmarBorrar, onClickBorrar }: filaBotonesProps) => (
    <div className="flex gap-2 items-center justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
        {formularioVisible ? (
            <>
                <LightTooltip title="Guardar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        size="small"
                        disabled={editando || !isValid}
                        onClick={handleSubmit}
                    >
                        {!editando ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
                <LightTooltip title="Cancelar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        size="small"
                        disabled={editando}
                        onClick={handleMostrarFormulario}
                    >
                        {!editando ? <CloseRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </>
        ) : (
            <>
                <LightTooltip title="Editar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        size="small"
                        disabled={borrando}
                        onClick={handleMostrarFormulario}
                    >
                        {!borrando ? <EditRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
                <LightTooltip title={confirmarBorrar ? "Confirmar": "¿Borrar?"} placement="left" arrow>
                    <Button
                        variant={confirmarBorrar ? "contained": "outlined"}
                        color="error"
                        disableElevation
                        size="small"
                        disabled={borrando || formularioVisible}
                        onBlur={() => onClickBorrar(false)}
                        onClick={confirmarBorrar ? onDelete : () => onClickBorrar()}
                    >
                        {!borrando ? <DeleteForeverRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </>
        )}
    </div>
);