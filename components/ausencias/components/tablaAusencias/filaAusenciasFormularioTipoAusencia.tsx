import { Button, MenuItem, TableCell, TextField } from "@mui/material";
import { formularioTipoAusenciaProps, tipoAusencia } from "../../types";
import LightTooltip from "@/components/ui/tooltip";
import { Controller } from "react-hook-form";
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Tooltip } from "./filaAusenciasTooltip";

export const FormularioTipoAusencia = ({ jornada, dia, control, actualizando, camposValidos, tiposAusencia, onUpdate, setTipoAusenciaFormulario }: formularioTipoAusenciaProps) => (
    <>
        <TableCell align="left" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-transparent via-green-300 to-transparent' : ''}`}>
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                <Controller
                    name="tipoAusencia"
                    control={control}
                    rules={{ required: "Debe seleccionar un tipo" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            id="tipoAusencia"
                            variant="outlined"
                            color="warning"
                            size="small"
                            select
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            disabled={tiposAusencia.length === 0 || !tiposAusencia}
                        >
                            {tiposAusencia.map((tipoAusencia: tipoAusencia) => (
                                <MenuItem key={tipoAusencia.id} value={tipoAusencia.id}>
                                    {tipoAusencia.nombre}
                                </MenuItem>
                            )) || []}
                        </TextField>
                    )}
                />
            </div>
        </TableCell>
        <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className="flex w-full items-center justify-center gap-2">
                <Tooltip observaciones={jornada.observaciones} />
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
                        disabled={actualizando || !camposValidos}
                        onClick={(e) => onUpdate(e)}
                    >
                        {!actualizando ? <SaveAsRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
                <LightTooltip title="Cancelar" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        size="small"
                        disabled={actualizando}
                        onClick={() => setTipoAusenciaFormulario()}
                    >
                        {!actualizando ? <CloseRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                    </Button>
                </LightTooltip>
            </div>
        </TableCell>
    </>
)