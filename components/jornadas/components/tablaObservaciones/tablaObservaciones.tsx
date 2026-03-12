import { Table, TableBody, TableContainer } from '@mui/material';
import { TablaObservacionesEncabezado } from './tablaObservacionesEncabezado';
import { TablaObservacionesEsqueleto } from './tablaObservacionesEsqueleto';
import { TablaObservacionesFila } from './tablaObservacionesFila';
import { ObservacionResumen, TablaObservacionesProps } from '../../types/tablaObservaciones/tablaObservacionesProps';

export const TablaObservaciones = ({
    observaciones,
    cargando,
    filas
}: TablaObservacionesProps) => {
    return (
        <TableContainer className='inner-table-container'>
            <Table stickyHeader size='small'>
                <TablaObservacionesEncabezado />
                {cargando ? (
                    <TablaObservacionesEsqueleto
                        filas={filas}
                    />
                ) : (
                    <TableBody>
                        {observaciones && (
                            observaciones.map((observacion: ObservacionResumen, index) => (
                                <TablaObservacionesFila
                                    observacion={observacion}
                                    key={index}
                                />
                            ))
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};