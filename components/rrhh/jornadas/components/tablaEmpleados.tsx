import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { tablaEmpleadosProps, empleado } from "../types";
import { Esqueleto } from "./esqueletoTablaEmpleado";
import { FilaEmpleado } from "./filaEmpleado";

export const TablaEmpleados = ({
  empleadosDatos,
  empleadosCargando,
  idFilaExpandida,
  filasPorPagina,
  ordenColumna,
  ordenDireccion,
  onOrden,
  onExpandirFila
}: tablaEmpleadosProps) => (
  <TableContainer className="outer-table-container">
    <Table stickyHeader>
      <TableHead
        sx={{
          '& .MuiTableCell-root': {
            borderBottom: '2px solid #ED6C02 !important',
            backgroundColor: '#fff !important',
            zIndex: 1100,
          }
        }}
      >
        <TableRow>
          <TableCell align="center" onClick={() => onOrden('legajo')} style={{ cursor: 'pointer' }} width="10%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'legajo' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Legajo
            </div>
          </TableCell>
          <TableCell align="center" onClick={() => onOrden('id_reloj')} style={{ cursor: 'pointer' }} width="10%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'id_reloj' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              ID en Reloj
            </div>
          </TableCell>
          <TableCell align="left" onClick={() => onOrden('nombreapellido')} style={{ cursor: 'pointer' }} width="80%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'nombreapellido' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Nombre de Empleado
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      {empleadosCargando ? (
        <TableBody>
          {Array.from({ length: filasPorPagina }).map((_, index) => (
            <Esqueleto key={index}/>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {empleadosDatos?.empleados?.length > 0 ? (
            empleadosDatos.empleados.map((empleado: empleado) => (
              <FilaEmpleado
                key={empleado.id}
                empleado={empleado}
                idFilaExpandidaProp={idFilaExpandida}
                onExpandirFila={onExpandirFila}
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