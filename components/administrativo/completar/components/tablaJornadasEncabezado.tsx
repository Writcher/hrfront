import { TableCell, TableHead, TableRow } from '@mui/material';

export const Encabezado = () => (
    <TableHead
        sx={{
            '& .MuiTableCell-root': {
                borderBottom: '2px solid #ED6C02 !important',
                backgroundColor: '#ffff !important',
                zIndex: 1100,
            }
        }}
    >
        <TableRow>
            <TableCell align='left' >
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Fecha
                </div>
            </TableCell>
            <TableCell align='center' >
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Tipo
                </div>
            </TableCell>
            <TableCell align='center' width='25%'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Nombre de Empleado
                </div>
            </TableCell>
            <TableCell align='center' colSpan={2}>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Entrada y Salida / Tipo de Ausencia
                </div>
            </TableCell>
            <TableCell align='right' width='25%'>
                <div style={{ userSelect: 'none' }} className='text-gray-700 font-bold text-sm'>
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
)