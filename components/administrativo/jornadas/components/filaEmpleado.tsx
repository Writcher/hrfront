import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { FilaExpandidaEmpleado } from "./filaExpandidaEmpleado";
import { filaEmpleadoProps } from "../types";

export const FilaEmpleado = ({ empleado, idFilaExpandidaProp, onExpandirFila }: filaEmpleadoProps) => (
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
        {idFilaExpandidaProp === empleado.id &&
            <FilaExpandidaEmpleado
                idFilaExpandida={empleado.id}
                idFilaExpandidaProp={idFilaExpandidaProp}
                estadoEmpleado={empleado.estadoempleado}
            />
        }
    </React.Fragment>
);