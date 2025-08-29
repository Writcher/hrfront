import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import React from "react";

interface TablaEmpleadosProps {
  empleadosDatos: any;
  empleadosCargando: boolean;
  filasPorPagina: number;
  ordenColumna: string;
  ordenDireccion: string;
  onOrden: (column: string) => void;
}

export const TablaEmpleados: React.FC<TablaEmpleadosProps> = ({
  empleadosDatos,
  empleadosCargando,
  filasPorPagina,
  ordenColumna,
  ordenDireccion,
  onOrden,
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
          <TableCell align="left" onClick={() => onOrden('nombreapellido')} style={{ cursor: 'pointer' }} width="40%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'nombreapellido' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Nombre de Empleado
            </div>
          </TableCell>
          <TableCell align="center" onClick={() => onOrden('id_proyecto')} width="40%">
            <div style={{ userSelect: "none" }}
              className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${ordenColumna === 'id_proyecto' ? (ordenDireccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                }`}>
              Proyecto
            </div>
          </TableCell>
        </TableRow>
      </TableHead>

      {empleadosCargando ? (
        <TableBody>
          {Array.from({ length: filasPorPagina }).map((_, index) => (
            <TableRow key={index}>
              <TableCell align="center" size="small" width="10%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={100} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="10%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={100} />
                </div>
              </TableCell>
              <TableCell align="left" size="small" width="40%">
                <div className="flex items-center justify-start">
                  <Skeleton variant="text" width={300} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="40%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={300} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {empleadosDatos?.empleados?.length > 0 ? (
            empleadosDatos.empleados.map((row: any) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                      {row.legajo}
                    </div>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                      {row.id_reloj}
                    </div>
                  </TableCell>
                  <TableCell align="left" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                      {row.nombre}
                    </div>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                      {row.nombreproyecto}
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" />
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  </TableContainer>
);