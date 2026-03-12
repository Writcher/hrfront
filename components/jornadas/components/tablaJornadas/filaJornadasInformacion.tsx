import LightTooltip from '@/components/ui/tooltip';
import { Button, TableCell } from '@mui/material';
import { Tooltip } from './filaJornadasTooltip';
import { formatHorasMinutos } from '../../utils';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PulsingWarning } from '@/components/ui/prioridad';
import { FilaJornadasInformacionProps } from '../../types/tablaJornadas/filaJornadasInformacionProps';

export const FilaJornadaInformacion = ({ 
    jornada, 
    dia, 
    setObservacionFormulario, 
    onDelete 
}: FilaJornadasInformacionProps) => (
    <>
        <TableCell align='left' size='small' className={`${dia === 0 ? 'bg-gradient-to-l from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-l from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(jornada.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium'>
                {jornada.entrada}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium'>
                {jornada.salida}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {jornada.entrada_r}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {jornada.salida_r}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {formatHorasMinutos(jornada.total)}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {jornada.tipojornada}
            </div>
        </TableCell>
        <TableCell align='center' size='small' className={`${dia === 0 ? 'bg-gray-300' : dia === 1 ? 'bg-green-300' : ''}`}>
            <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                {jornada.tipoausencia === null ? '' : jornada.tipoausencia}
            </div>
        </TableCell>
        <TableCell align='right' size='small' className={`${dia === 0 ? 'bg-gradient-to-r from-gray-300 via-gray-300 to-transparent' : dia === 1 ? 'bg-gradient-to-r from-green-300 via-green-300 to-transparent' : ''}`}>
            <div className='flex w-full items-center justify-end gap-2 flex-wrap'>
                {jornada.es_manual &&
                    <LightTooltip title='Entrada Manual' placement='left' arrow>
                        <span>
                            <PulsingWarning />
                        </span>
                    </LightTooltip>
                }
                <Tooltip observaciones={jornada.observaciones} onDelete={onDelete} />
                <LightTooltip title='Añadir Observación' placement='left' arrow>
                    <Button
                        variant='contained'
                        color='warning'
                        disableElevation
                        size='small'
                        onClick={() => setObservacionFormulario(true)}
                        disabled={jornada.tipoausencia === 'Pendiente'}
                    >
                        <AddRoundedIcon />
                    </Button>
                </LightTooltip>
            </div>
        </TableCell>
    </>
);