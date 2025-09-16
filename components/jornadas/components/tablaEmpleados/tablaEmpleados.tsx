import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaEmpleadosEsqueleto";
import { empleado, tablaEmpleadosProps } from "../../types";
import { Fila } from "./tablaEmpleadosFila";
import { Encabezado } from "./tablaEmpleadosEncabezado";

export const TablaEmpleados = ({ empleados, cargando, idFilaExpandida, filas, columna, direccion, onOrden, onExpandirFila, esAdministrativo, esRRHH }: tablaEmpleadosProps) => (
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
          {empleados?.length > 0 ? (
            empleados.map((empleado: empleado) => (
              <Fila
                key={empleado.id}
                empleado={empleado}
                idFilaExpandidaProp={idFilaExpandida}
                onExpandirFila={onExpandirFila}
                esAdministrativo={esAdministrativo}
                esRRHH={esRRHH}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" />
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  </TableContainer>
);