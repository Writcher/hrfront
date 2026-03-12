import { TableCell, TableHead, TableRow } from '@mui/material';
import { TablaEmpleadosEncabezadoProps } from '../../types/tablaEmpleados/tablaEmpleadosEncabezadoProps';

export const TablaEmpleadosEncabezado = ({ onOrden, columna, direccion }: TablaEmpleadosEncabezadoProps) => (
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
            <TableCell
                align='center'
                onClick={() => onOrden('legajo')}
                style={{ cursor: 'pointer', minWidth: '100px' }}
                width='10%'
            >
                <div
                    style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'legajo'
                        ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500')
                        : ''
                        }`
                    }
                >
                    Legajo
                </div>
            </TableCell>
            <TableCell
                align='center'
                onClick={() => onOrden('dni')}
                style={{ cursor: 'pointer', minWidth: '120px' }}
                width='10%'
            >
                <div
                    style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${columna === 'dni'
                        ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500')
                        : ''
                        }`
                    }
                >
                    ID en Reloj
                </div>
            </TableCell>
            <TableCell
                align='left'
                onClick={() => onOrden('nombre')}
                style={{ cursor: 'pointer', minWidth: '200px' }}
                width='80%'
            >
                <div
                    style={{ userSelect: 'none' }}
                    className={`text-gray-700 font-bold text-sm ${
                        columna === 'nombre'
                            ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500')
                            : ''
                        }`
                    }
                >
                    Nombre de Empleado
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);