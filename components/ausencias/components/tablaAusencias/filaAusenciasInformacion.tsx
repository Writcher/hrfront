import LightTooltip from "@/components/ui/tooltip";
import { Button, TableCell } from "@mui/material";
import { Tooltip } from "./filaAusenciasTooltip";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { informacionProps } from "../../types";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export const Informacion = ({ jornada, dia, setObservacionFormulario, setTipoAusenciaFormulario }: informacionProps) => (
    <>
        <TableCell align="left" size="small" className={`${dia === 0 ? 'bg-gradient-to-l from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-l from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]" style={{ userSelect: "none" }}>
                {jornada.tipoausencia === null ? "" : jornada.tipoausencia}
            </div>
        </TableCell>
        <TableCell align="center" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className="flex w-full items-center justify-center gap-2">
                <Tooltip observaciones={jornada.observaciones} />
            </div>
        </TableCell>
        <TableCell align="right" size="small" className={`${dia === 0 ? 'bg-gradient-to-r from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className="flex w-full items-center justify-end gap-2">
                <LightTooltip title="Actualizar Ausencia" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="info"
                        disableElevation
                        size="small"
                        onClick={() => setTipoAusenciaFormulario()}
                    >
                        <EditRoundedIcon />
                    </Button>
                </LightTooltip>
                <LightTooltip title="Añadir Observación" placement="left" arrow>
                    <Button
                        variant="contained"
                        color="warning"
                        disableElevation
                        size="small"
                        onClick={() => setObservacionFormulario()}
                    >
                        <AddRoundedIcon />
                    </Button>
                </LightTooltip>
            </div>
        </TableCell>
    </>
);