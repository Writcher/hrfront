import { Table, TableBody, TableContainer } from '@mui/material';
import { Esqueleto } from './tablaEmpleadosEsqueleto';
import { empleado, tablaEmpleadosProps } from '../../types';
import { Fila } from './tablaEmpleadosFila';
import { Encabezado } from './tablaEmpleadosEncabezado';

export const TablaEmpleados = ({ empleados, cargando, idFilaExpandida, filas, columna, direccion, onOrden, onExpandirFila, esAdministrativo, esRRHH, filtroTipoAusencia, filtroMes, filtroQuincena }: tablaEmpleadosProps) => {
  return (
    <>
      {cargando || empleados && empleados.length > 0 ? (
        <TableContainer className='outer-table-container flex-1 overflow-auto'>
          <Table stickyHeader>
            <Encabezado
              onOrden={onOrden}
              columna={columna}
              direccion={direccion}
            />
            {cargando ? (
              <Esqueleto
                filas={filas}
              />
            ) : (
              <TableBody>
                {empleados.map((empleado: empleado) => (
                  <Fila
                    key={empleado.id}
                    empleado={empleado}
                    idFilaExpandidaProp={idFilaExpandida}
                    onExpandirFila={onExpandirFila}
                    esAdministrativo={esAdministrativo}
                    esRRHH={esRRHH}
                    filtroTipoAusencia={filtroTipoAusencia}
                    filtroMes={filtroMes}
                    filtroQuincena={filtroQuincena}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!empleados || empleados.length === 0) && (
        <div className='flex items-center justify-center py-8 h-full w-full text-gray-700 font-medium text-sm'>
          No se encontraron empleados
        </div>
      )}
    </>
  );
};

