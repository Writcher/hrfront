import { TableCell, TableHead, TableRow } from '@mui/material';

export const TablaJornadasEncabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align='left'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Fecha
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Entrada
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Salida
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Entrada con Redondeo
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Salida con Redondeo
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Total Jornada
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Tipo de Jornada
                </div>
            </TableCell>
            <TableCell align='center'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align='right'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Observacion
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)