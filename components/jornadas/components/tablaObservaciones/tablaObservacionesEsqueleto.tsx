import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material'
import { TablaObservacionesEsqueletoProps } from '../../types/tablaObservaciones/tablaObservacionesEsqueletoProps';

export const TablaObservacionesEsqueleto = ({ filas }: TablaObservacionesEsqueletoProps) => (
    <TableBody>
        {Array.from({ length: filas }).map((_, index) => (
            <TableRow key={index}>
                <TableCell align='left' size='small' width='20%'>
                    <div className='flex items-center justify-start'>
                        <Skeleton variant='text' width={50} />
                    </div>
                </TableCell>
                <TableCell align='left' size='small' width='80%'>
                    <div className='flex items-center justify-start'>
                        <Skeleton variant='text' width={100} />
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);