import { TableBody, TableCell, TableRow } from '@mui/material';
import { formatHorasMinutos } from '../../utils';
import { TablaResumenFilaProps } from '../../types/tablaResumen/tablaResumenFilaProps';

export const TablaResumenFilaNoMensual = ({ resumen }: TablaResumenFilaProps) => (
    <TableBody>
        <TableRow>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total)}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total_normal)}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total_50)}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total_100)}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total_feriado)}
                </div>
            </TableCell>
            <TableCell align='center' size='small'>
                <div className='text-gray-700 font-medium'>
                    {formatHorasMinutos(resumen.suma_total_nocturno)}
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
);