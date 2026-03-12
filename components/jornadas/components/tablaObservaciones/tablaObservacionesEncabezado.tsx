import { TableCell, TableHead, TableRow } from '@mui/material';

export const TablaObservacionesEncabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align='left' width='20%'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Fecha
                </div>
            </TableCell>
            <TableCell align='left' width='80%'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Observacion
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);