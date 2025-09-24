import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaEmpleadosEsqueleto";
import { empleado, tablaEmpleadosProps } from "../../types";
import { Fila } from "./tablaEmpleadosFila";
import { Encabezado } from "./tablaEmpleadosEncabezado";

export const TablaEmpleados = ({ empleados, cargando, idFilaExpandida, filas, columna, direccion, onOrden, onExpandirFila, esAdministrativo, esRRHH }: tablaEmpleadosProps) => {
  return (
    <>
      {cargando || empleados && empleados.length > 0 ? (
        <TableContainer className="outer-table-container">
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
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!empleados || empleados.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron empleados
        </div>
      )}
    </>
  );
};

