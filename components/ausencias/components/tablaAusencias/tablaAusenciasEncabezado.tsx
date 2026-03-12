import { TableCell, TableHead, TableRow } from '@mui/material';

export const Encabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align='left'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Fecha
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Observacion
                </div>
            </TableCell>
            <TableCell align='right'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)