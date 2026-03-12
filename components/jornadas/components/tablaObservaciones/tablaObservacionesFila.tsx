import { TableCell, TableRow } from '@mui/material';
import { TablaObservacionesFilaProps } from '../../types/tablaObservaciones/tablaObservacionesFilaProps';

export const TablaObservacionesFila = ({ observacion }: TablaObservacionesFilaProps) => (
    <TableRow>
        <TableCell align='left' size='small' width='20%'>
            <div className='text-gray-700 font-medium'>
                {new Intl.DateTimeFormat('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                }).format(new Date(observacion.fecha)).replace(/\//g, '-')}
            </div>
        </TableCell>
        <TableCell align='left' size='small' width='80%'>
            <div className='text-gray-700 font-medium'>
                {observacion.texto}
            </div>
        </TableCell>
    </TableRow>
);