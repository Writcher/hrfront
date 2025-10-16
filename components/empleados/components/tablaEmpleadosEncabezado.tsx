import { TableCell, TableHead, TableRow } from "@mui/material";
import { encabezadoProps } from "../types";

export const Encabezado = ({ onOrden, columna, direccion }: encabezadoProps) => (
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
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'legajo' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Legajo
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_reloj')} style={{ cursor: 'pointer' }} width="10%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_reloj' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    ID en Reloj
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('nombreapellido')} style={{ cursor: 'pointer' }} width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'nombreapellido' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Nombre de Empleado
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_tipoempleado')} width="15%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_tipoempleado' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Tipo de Empleado
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_turno')} width="10%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_turno' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Turno
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_proyecto')} width="15%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_proyecto' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Proyecto
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_estadoempleado')} width="10%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_estadoempleado' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Estado
                </div>
            </TableCell>
            <TableCell align="right" width="10%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);