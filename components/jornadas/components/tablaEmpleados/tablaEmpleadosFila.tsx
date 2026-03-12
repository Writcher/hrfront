import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TablaEmpleadoFilaExpanida } from './tablaEmpleadosFilaExpandida';
import { TablaEmpleadosFilaProps } from '../../types/tablaEmpleados/tablaEmpleadosFilaProps';

export const TablaEmpleadosFila = ({ 
    empleado, 
    idFilaExpandidaProp, 
    onExpandirFila, 
    esAdministrativo
}: TablaEmpleadosFilaProps) => (
    <React.Fragment >
        <TableRow
            onClick={() => onExpandirFila(empleado.id)}
            className={`cursor-pointer ${idFilaExpandidaProp === empleado.id ? 'bg-orange-100' : ''}`}
        >
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {empleado.legajo}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                    {empleado.dni}
                </div>
            </TableCell>
            <TableCell align='left' size='small'>
                <div className='text-gray-700 font-medium' style={{ userSelect: 'none' }}>
                    {empleado.nombre}
                </div>
            </TableCell>
        </TableRow>
        {idFilaExpandidaProp === empleado.id &&
            <TablaEmpleadoFilaExpanida
                idFilaExpandida={empleado.id}
                idFilaExpandidaProp={idFilaExpandidaProp}
                estadoEmpleado={empleado.estadoempleado}
                es_mensualizado={empleado.es_mensualizado}
                esAdministrativo={esAdministrativo ? esAdministrativo : false}
            />
        }
    </React.Fragment>
);