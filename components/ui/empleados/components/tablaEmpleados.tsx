import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button, Chip } from "@mui/material";
import React from "react";
import LightTooltip from "../../tooltip";
import SyncIcon from '@mui/icons-material/Sync';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';

interface TablaEmpleadosProps {
  empleadosDatos: any;
  empleadosCargando: boolean;
  filasPorPagina: number;
  ordenColumna: string;
  ordenDireccion: string;
  onOrden: (column: string) => void;
  onDeactivate: (id: number) => void;
  desactivando: boolean;
}

export const TablaEmpleados: React.FC<TablaEmpleadosProps> = ({
  empleadosDatos,
  empleadosCargando,
  filasPorPagina,
  ordenColumna,
  ordenDireccion,
  onOrden,
  onDeactivate,
  desactivando,
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
            <TableRow key={index}>
              <TableCell align="left" size="small" width="10%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={100} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="10%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={100} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="30%">
                <div className="flex items-center justify-start">
                  <Skeleton variant="text" width={300} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="20%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={300} />
                </div>
              </TableCell>
              <TableCell align="center" size="small" width="10%">
                <div className="flex items-center justify-center">
                  <Skeleton variant="text" width={300} />
                </div>
              </TableCell>
              <TableCell align="right" size="small" width="20%">
                <Skeleton variant="rectangular" className="!rounded" width={45} height={30} />
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
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                      {row.nombre}
                    </div>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                      {row.nombreproyecto}
                    </div>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                      <Chip
                        label={row.estadoempleado}
                        className="!rounded"
                        color={
                          row.estadoempleado.toLowerCase() === 'activo' ? 'success' : 'error'
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right" size="small">
                    <div className="flex gap-2 items-center justify-end text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                      <LightTooltip title="Dar Baja" placement="left" arrow>
                        <Button
                          variant="contained"
                          color="error"
                          disableElevation
                          size="small"
                          disabled={desactivando || row.estadoempleado.toLowerCase() === 'baja'}
                          onClick={() => onDeactivate(row.id)}
                        >
                          {!desactivando ? <PersonRemoveRoundedIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
                        </Button>
                      </LightTooltip>
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
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