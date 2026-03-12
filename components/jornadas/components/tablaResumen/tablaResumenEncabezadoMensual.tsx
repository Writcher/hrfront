import { TableCell, TableHead, TableRow } from '@mui/material';

export const TablaResumenEncabezadoMensual = () => (
    <TableHead>
        <TableRow>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total de Asistencias
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total de Ausencias Justificadas
                </div>
            </TableCell>
            <TableCell align='center'>
                <div
                    style={{ userSelect: 'none' }}
                    className='text-gray-700 font-bold text-sm'
                >
                    Total de Ausencias Injustificadas
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);