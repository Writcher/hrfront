import { TableCell, TableHead, TableRow } from '@mui/material';

export const TablaResumenEncabezadoNoMensual = () => (
    <TableHead>
        <TableRow>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total Normal
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total 50%
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total 100%
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total Feriado
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total Nocturno
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);