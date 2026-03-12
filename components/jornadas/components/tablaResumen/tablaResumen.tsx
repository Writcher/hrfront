import { Table, TableContainer } from '@mui/material';
import { TablaResumenEncabezadoMensual } from './tablaResumenEncabezadoMensual';
import { TablaResumenEncabezadoNoMensual } from './tablaResumenEncabezadoNoMensual';
import { TablaResumenEsqueletoMensual } from './tablaResumenEsqueletoMensual';
import { TablaResumenEsqueletoNoMensual } from './tablaResumenEsqueletoNoMensual';
import { TablaResumenFilaMensual } from './tablaResumenFilaMensual';
import { TablaResumenFilaNoMensual } from './tablaResumenFilaNoMensual';
import { TablaResumenProps } from '../../types/tablaResumen/tablaResumenProps';

export const TablaResumen = ({
    resumen,
    cargando,
    es_mensualizado
}: TablaResumenProps) => {
    return (
        <TableContainer className='inner-table-container'>
            <Table stickyHeader size='small'>
                {es_mensualizado 
                    ?   <TablaResumenEncabezadoMensual />
                    :   <TablaResumenEncabezadoNoMensual />
                }
                {cargando ? (
                    es_mensualizado
                        ?   <TablaResumenEsqueletoMensual />
                        :   <TablaResumenEsqueletoNoMensual />
                ) : (
                    es_mensualizado
                        ?   <TablaResumenFilaMensual
                                resumen={resumen}
                            />
                        :   <TablaResumenFilaNoMensual
                                resumen={resumen}
                            />
                )}
            </Table>
        </TableContainer>
    );
};