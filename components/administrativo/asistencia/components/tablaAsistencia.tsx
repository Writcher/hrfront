import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import FilaPresentes from "./tablaAsistenciaFila";
import { tablaPresentesProps, empleado } from "../types";
import { Esqueleto } from "./tablaAsistenciaEsqueleto";
import { Encabezado } from "./tablaAsistenciaEncabezado";

export const TablaPresentes = ({
  empleados,
  cargando,
  filas,
  pagina,
}: tablaPresentesProps) => {
  return (
    <>
      {cargando || empleados && empleados.length > 0 ? (
        <TableContainer className="outer-table-container">
          <Table stickyHeader>
            <Encabezado
            />
            {cargando ? (
              <Esqueleto
                filas={5}
              />
            ) : (
              <TableBody>
                {empleados.map((empleado: empleado, index: number) => (
                  <FilaPresentes
                    empleado={empleado}
                    index={(index + 1) + (pagina * filas)}
                    key={empleado.id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!empleados || empleados.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron empleados presentes
        </div>
      )}
    </>
  );
};