import { Table, TableBody, TableContainer } from '@mui/material';
import { TablaEmpleadosEsqueleto } from './tablaEmpleadosEsqueleto';
import { TablaEmpleadosFila } from './tablaEmpleadosFila';
import { TablaEmpleadosEncabezado } from './tablaEmpleadosEncabezado';
import { TablaEmpleadosEmpleado, TablaEmpleadosProps } from '../../types/tablaEmpleados/tablaEmpleadosProps';

export const TablaEmpleados = ({
  empleados,
  cargando,
  idFilaExpandida,
  filas,
  columna,
  direccion,
  onOrden,
  onExpandirFila,
  esAdministrativo,
  esRRHH
}: TablaEmpleadosProps) => {
  return (
    <>
      {cargando || empleados && empleados.length > 0 ? (
        <TableContainer className='outer-table-container flex-1 overflow-auto'>
          <Table stickyHeader>
            <TablaEmpleadosEncabezado
              onOrden={onOrden}
              columna={columna}
              direccion={direccion}
            />
            {cargando ? (
              <TablaEmpleadosEsqueleto
                filas={filas}
              />
            ) : (
              <TableBody>
                {empleados.map((empleado: TablaEmpleadosEmpleado) => (
                  <TablaEmpleadosFila
                    key={empleado.id}
                    empleado={empleado}
                    idFilaExpandidaProp={idFilaExpandida}
                    onExpandirFila={onExpandirFila}
                    esAdministrativo={esAdministrativo}
                    esRRHH={esRRHH}
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

