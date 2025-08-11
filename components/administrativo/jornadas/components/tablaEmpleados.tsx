import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import React from "react";

interface TablaEmpleadosProps {
  empleadosDatos: any;
  empleadosCargando: boolean;
  idFilaExpandida: number | null;
  filasPorPagina: number;
  ordenColumna: string;
  ordenDireccion: string;
  onOrden: (column: string) => void;
  onExpandirFila: (id: number) => void;
  renderFilaExpandida?: (rowId: number) => React.ReactNode;
}

export const TablaEmpleados: React.FC<TablaEmpleadosProps> = ({
  empleadosDatos,
  empleadosCargando,
  idFilaExpandida,
  filasPorPagina,
  ordenColumna,
  ordenDireccion,
  onOrden,
  onExpandirFila,
  renderFilaExpandida
}) => (
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
                 className={`text-gray-700 font-medium md:font-bold text-[17px] ${
                   ordenColumna === 'legajo' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                 }`}>
              Legajo
            </div>
          </TableCell>
          <TableCell align="center" onClick={() => onOrden('id_reloj')} style={{ cursor: 'pointer' }} width="10%">
            <div style={{ userSelect: "none" }} 
                 className={`text-gray-700 font-medium md:font-bold text-[17px] ${
                   ordenColumna === 'id_reloj' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                 }`}>
              ID en Reloj
            </div>
          </TableCell>
          <TableCell align="left" onClick={() => onOrden('nombreapellido')} style={{ cursor: 'pointer' }} width="80%">
            <div style={{ userSelect: "none" }} 
                 className={`text-gray-700 font-medium md:font-bold text-[17px] ${
                   ordenColumna === 'nombreapellido' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                 }`}>
              Nombre de Empleado
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      
      {empleadosCargando ? (
        <TableBody>
          {Array.from({ length: filasPorPagina }).map((_, index) => (
            <TableRow key={index}>
              <TableCell align="center" size="small" width="10%">
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell align="center" size="small" width="10%">
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell align="left" size="small" width="80%">
                <Skeleton variant="text" width={400} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {empleadosDatos?.empleados?.length > 0 ? (
            empleadosDatos.empleados.map((row: any) => (
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={() => onExpandirFila(row.id)}
                  className={`cursor-pointer ${idFilaExpandida === row.id ? 'bg-orange-100' : ''}`}
                >
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                      {row.legajo}
                    </div>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                      {row.id_reloj}
                    </div>
                  </TableCell>
                  <TableCell align="left" size="small">
                    <div className="text-gray-700 font-medium text-[15px]" style={{ userSelect: "none" }}>
                      {row.nombre}
                    </div>
                  </TableCell>
                </TableRow>
                {idFilaExpandida === row.id && renderFilaExpandida?.(row.id)}
              </React.Fragment>
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