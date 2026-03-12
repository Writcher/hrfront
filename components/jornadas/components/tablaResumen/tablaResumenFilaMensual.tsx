import { TableBody, TableCell, TableRow } from '@mui/material';
import { TablaResumenFilaProps } from '../../types/tablaResumen/tablaResumenFilaProps';

export const TablaResumenFilaMensual = ({ resumen }: TablaResumenFilaProps) => (
    <TableBody>
        <TableRow>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {resumen.total_asistencias}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {resumen.total_ausencias_justificadas}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {resumen.total_ausencias_injustificadas}
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
);