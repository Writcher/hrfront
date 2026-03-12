import { Table, TableBody, TableContainer } from '@mui/material';
import { Esqueleto } from './tablaImportacionesEsqueleto';
import { importacion, tablaImportacionesProps } from '../types';
import Fila from './tablaImportacionesFila';
import { Encabezado } from './tablaImportacionesEncabezado';

export const TablaImportaciones = ({
    importaciones,
    cargando,
    filas,
    esAdministrativo
}: tablaImportacionesProps) => {
    return (
        <>
            {cargando || importaciones && importaciones.length > 0 ? (
                <TableContainer className='outer-table-container flex-1 overflow-auto'>
                    <Table stickyHeader>
                        <Encabezado
                            esAdministrativo={esAdministrativo}
                        />
                        {cargando ? (
                            <Esqueleto filas={filas} esAdministrativo={esAdministrativo} />
                        ) : (
                            <TableBody>
                                {importaciones.map((importacion: importacion) => (
                                    <Fila
                                        importacion={importacion}
                                        key={importacion.id}
                                        esAdministrativo={esAdministrativo}
                                    />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            ) : null}
            {!cargando && (!importaciones || importaciones.length === 0) && (
                <div className='flex items-center justify-center py-8 h-full w-full text-gray-700 font-medium text-sm'>
                    No se encontraron informes
                </div>
            )}
        </>
    );
};