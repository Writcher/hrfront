import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button, Chip } from "@mui/material";
import React from "react";
import FilaEmpleado from "./tablaEmpleadosFila";
import { tablaEmpleadosProps, empleado } from "../types";
import { Esqueleto } from "./tablaEmpleadosEsqueleto";
import { Encabezado } from "./tablaEmpleadosEncabezado";

export const TablaEmpleados = ({
  empleados,
  cargando,
  filas,
  columna,
  direccion,
  onOrden
}: tablaEmpleadosProps) => (
  <TableContainer className="outer-table-container">
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
          {empleados?.length > 0 ? (
            empleados.map((empleado: empleado) => (
              <FilaEmpleado
                empleado={empleado}
                key={empleado.id}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" />
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  </TableContainer>
);