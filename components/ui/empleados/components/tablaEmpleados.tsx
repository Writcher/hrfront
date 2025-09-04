import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button, Chip } from "@mui/material";
import React from "react";
import FormularioEditarEmpleado from "./formularioFila";
import { tablaEmpleadosProps, empleado } from "../types";
import { Esqueleto } from "./esqueletoTabla";

export const TablaEmpleados = ({
  empleadosDatos,
  empleadosCargando,
  filasPorPagina,
  ordenColumna,
  ordenDireccion,
  onOrden
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
          <TableCell align="center" onClick={() => onOrden('nombreapellido')} style={{ cursor: 'pointer' }} width="30%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'nombreapellido' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Nombre de Empleado
            </div>
          </TableCell>
          <TableCell align="center" onClick={() => onOrden('id_proyecto')} width="20%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'id_proyecto' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Proyecto
            </div>
          </TableCell>
          <TableCell align="center" onClick={() => onOrden('id_estadoempleado')} width="10%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'id_estadoempleado' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Estado
            </div>
          </TableCell>
          <TableCell align="right" width="20%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
              Acciones
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
              <FormularioEditarEmpleado
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