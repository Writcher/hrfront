import { Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import FilaEmpleado from './tablaEmpleadosFila';
import { tablaEmpleadosProps, empleado } from '../types';
import { Esqueleto } from './tablaEmpleadosEsqueleto';
import { Encabezado } from './tablaEmpleadosEncabezado';

export const TablaEmpleados = ({
  empleados,
  cargando,
  filas,
  columna,
  direccion,
  onOrden
}: tablaEmpleadosProps) => {
  return (
    <>
      {cargando || empleados && empleados.length > 0 ? (
        <TableContainer className='outer-table-container flex-1 overflow-auto'>
          <Table stickyHeader>
            <Encabezado
              columna={columna}
              direccion={direccion}
              onOrden={onOrden}
            />
            {cargando ? (
              <Esqueleto
                filas={filas}
              />
            ) : (
              <TableBody>
                {empleados.map((empleado: empleado) => (
                  <FilaEmpleado
                    empleado={empleado}
                    key={empleado.id}
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