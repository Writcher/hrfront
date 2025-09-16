import { Button } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncIcon from '@mui/icons-material/Sync';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { filaBotonesProps } from "../types";
import LightTooltip from "@/components/ui/tooltip";

export const BotonesFila = ({ editando, desactivando, isValid, estadoempleado, formularioVisible, handleMostrarFormulario, handleSubmit, onDeactivate, confirmarBaja, onClickBaja }: filaBotonesProps) => (
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
                        disabled={desactivando || estadoempleado.toLowerCase() === 'baja'}
                        onClick={handleMostrarFormulario}
                    >
                        {!desactivando ? <EditRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
                <LightTooltip title={confirmarBaja ? "Confirmar": "¿Dar Baja?"} placement="left" arrow>
                    <Button
                        variant={estadoempleado.toLowerCase() === 'baja' ? "contained" : confirmarBaja ? "contained": "outlined"}
                        color="error"
                        disableElevation
                        size="small"
                        disabled={desactivando || estadoempleado.toLowerCase() === 'baja' || formularioVisible}
                        onBlur={() => onClickBaja(false)}
                        onClick={confirmarBaja ? onDeactivate : () => onClickBaja()}
                    >
                        {!desactivando ? <PersonRemoveRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </>
        )}
    </div>
);