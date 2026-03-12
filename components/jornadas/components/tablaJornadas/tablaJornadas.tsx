import { Table, TableBody, TableContainer } from '@mui/material';
import { TablaJornadasEsqueleto } from './tablaJornadasEsqueleto';
import { TablaJornadasFila } from './tablaJornadasFila';
import { TablaJornadasEncabezado } from './tablaJornadasEncabezado';
import { Jornada, TablaJornadasProps } from '../../types/tablaJornadas/tablaJornadasProps';

export const TablaJornadas = ({
    jornadas,
    cargando,
}: TablaJornadasProps) => {
    return (
        <>
            {cargando || jornadas && jornadas.length > 0 ? (
                <TableContainer className='inner-table-container' id={'tablaJornadaBody'}>
                    <Table stickyHeader>
                        <TablaJornadasEncabezado />
                        {cargando ? (
                            <TablaJornadasEsqueleto
                                filas={5}
                            />
                        ) : (
                            <TableBody>
                                {jornadas.map((jornada: Jornada) => (
                                    <TablaJornadasFila
                                        jornada={jornada}
                                        key={jornada.id}
                                    />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            ) : null}
            {!cargando && (!jornadas || jornadas.length === 0) && (
                <div className='flex items-center justify-center py-8 h-full w-full text-gray-700 font-medium text-sm'>
                    No se encontraron jornadas
                </div>
            )}
        </>
    );
};