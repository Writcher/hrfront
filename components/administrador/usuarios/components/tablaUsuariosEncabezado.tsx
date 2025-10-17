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
            <TableCell align="left" onClick={() => onOrden('nombre')} style={{ cursor: 'pointer' }} width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'nombre' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Nombre
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('correo')} style={{ cursor: 'pointer' }} width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'correo' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Correo
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_tipousuario')} style={{ cursor: 'pointer' }} width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_tipousuario' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Tipo de Usuario
                </div>
            </TableCell>
            <TableCell align="center" onClick={() => onOrden('id_estadousuario')} style={{ cursor: 'pointer' }} width="20%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)] ${columna === 'id_estadousuario' ? (direccion === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''
                        }`}>
                    Estado de Usuario
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
);