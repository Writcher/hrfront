import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { FilaExpandidaAdministrativo } from "./tablaEmpleadosFilaExpandidaAdministrativo";
import { filaEmpleadoProps } from "../../types";
import { FilaExpandidaRRHH } from "./tablaEmpleadosFilaExpandidaRRHH";

export const Fila = ({ empleado, idFilaExpandidaProp, onExpandirFila, esAdministrativo, esRRHH }: filaEmpleadoProps) => (
    <React.Fragment >
        <TableRow
            onClick={() => onExpandirFila(empleado.id)}
            className={`cursor-pointer ${idFilaExpandidaProp === empleado.id ? 'bg-orange-100' : ''}`}
        >
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {empleado.legajo}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.id_reloj}
                </div>
            </TableCell>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.nombre}
                </div>
            </TableCell>
        </TableRow>
        {idFilaExpandidaProp === empleado.id && esAdministrativo &&
            <FilaExpandidaAdministrativo
                idFilaExpandida={empleado.id}
                idFilaExpandidaProp={idFilaExpandidaProp}
                estadoEmpleado={empleado.estadoempleado}
            />
        }
        {idFilaExpandidaProp === empleado.id && esRRHH &&
            <FilaExpandidaRRHH
                idFilaExpandida={empleado.id}
                idFilaExpandidaProp={idFilaExpandidaProp}
            />
        }
    </React.Fragment>
);