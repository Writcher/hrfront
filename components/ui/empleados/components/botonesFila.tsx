import { Button } from "@mui/material";
import LightTooltip from "../../tooltip";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncIcon from '@mui/icons-material/Sync';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { filaBotonesProps } from "../types";

export const BotonesFila = ({ editando, desactivando, isValid, estadoempleado, formularioVisible, handleMostrarFormulario, handleSubmit, onDeactivate }: filaBotonesProps) => (
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
                <LightTooltip title="Dar Baja" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        size="small"
                        disabled={desactivando || estadoempleado.toLowerCase() === 'baja' || formularioVisible}
                        onClick={onDeactivate}
                    >
                        {!desactivando ? <PersonRemoveRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </>
        )}
    </div>
);