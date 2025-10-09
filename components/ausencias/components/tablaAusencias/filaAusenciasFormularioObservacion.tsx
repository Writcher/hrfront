import { Button, TableCell, TextField } from "@mui/material";
import { formularioObservacionProps } from "../../types";
import LightTooltip from "@/components/ui/tooltip";
import { Controller } from "react-hook-form";
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const FormularioObservacion = ({ fecha, dia, control, creando, camposValidos, onCreate, setObservacionFormulario }: formularioObservacionProps) => (
    <>
        <TableCell align="left" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-transparent via-green-300 to-transparent' : ''}`}>
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell colSpan={2} align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                <Controller
                    name="observacion"
                    control={control}
                    rules={{ required: "Debe ingresar la observacion" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="observacion"
                            label="Observación"
                            variant="outlined"
                            color="warning"
                            size="small"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            disabled={creando}
                        />
                    )}
                />
            </div>
        </TableCell>
        <TableCell align="right" size="small" className={`${dia === 0 ? 'bg-gradient-to-l from-transparent via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-l from-transparent via-green-300 to-transparent' : ''}`}>
            <div className="flex w-full items-center justify-end gap-2">
                <LightTooltip title="Guardar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        size="small"
                        disabled={creando || !camposValidos}
                        onClick={(e) => onCreate(e)}
                    >
                        {!creando ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
                <LightTooltip title="Cancelar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        size="small"
                        disabled={creando}
                        onClick={() => setObservacionFormulario()}
                    >
                        {!creando ? <CloseRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </div>
        </TableCell>
    </>
)