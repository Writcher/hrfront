import { TableCell, TableHead, TableRow } from '@mui/material';
import { encabezadoProps } from '../types';

export const Encabezado = ({ onOrden, columna, direccion }: encabezadoProps) => (
    <TableHead
        sx={{
            '& .MuiTableCell-root': {
                borderBottom: '2px solid #ED6C02 !important',
                backgroundColor: '#fff !important',
                zIndex: 1100,
            }
        }}
    >
        <TableRow>
            <TableCell align='center' onClick={() => onOrden('legajo')} style={{ cursor: 'pointer' }} width='10%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'legajo' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Legajo
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('dni')} style={{ cursor: 'pointer' }} width='10%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'dni' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    DNI
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('nombre')} style={{ cursor: 'pointer' }} width='20%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'nombre' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Nombre de Empleado
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('id_tipoempleado')} width='15%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'id_tipoempleado' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Tipo de Empleado
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('id_modalidadvalidacion')} width='10%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'id_modalidadvalidacion' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Validacion
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('id_proyecto')} width='15%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'id_proyecto' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Proyecto
                </div>
            </TableCell>
            <TableCell align='center' onClick={() => onOrden('id_estadoempleado')} width='10%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'id_estadoempleado' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Estado
                </div>
            </TableCell>
            <TableCell align='right' width='10%'>
                <div style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm`}>
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);