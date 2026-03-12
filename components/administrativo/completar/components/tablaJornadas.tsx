import { Table, TableBody, TableContainer } from '@mui/material';
import { Fila } from './tablaJornadasFila';
import { jornada, tablaJornadasProps } from '../types';
import { Esqueleto } from './tablaJornadasEsqueleto';
import { Encabezado } from './tablaJornadasEncabezado';

export const TablaJornadas = ({ jornadas, cargando, tiposAusencia, tiposAusenciaCargando }: tablaJornadasProps) => {
    return (
        <>
            {cargando || jornadas && jornadas.length > 0 ? (
                <TableContainer className='flex-1 overflow-auto'>
                    <Table stickyHeader>
                        <Encabezado />
                        {cargando ? (
                            <Esqueleto filas={5} />
                        ) : (
                            <TableBody>
                                {jornadas.map((jornada: jornada) => (
                                    <Fila jornada={jornada} tiposAusencia={tiposAusencia} tiposAusenciaCargando={tiposAusenciaCargando} key={jornada.id} />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            ) : null}
            {!cargando && (!jornadas || jornadas.length === 0) && (
                <div className='flex items-center justify-center py-8 h-full w-full text-gray-700 font-medium text-sm'>
                    No se encontraron jornadas sin validar
                </div>
            )}
        </>
    );
};