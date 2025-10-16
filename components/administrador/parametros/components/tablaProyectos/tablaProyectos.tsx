import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaProyectosEsqueleto";
import { Encabezado } from "./tablaProyectosEncabezado";
import { tablaProyectosProps, proyecto } from "../../types";
import FilaProyecto from "./tablaProyectosFila";

export const TablaProyectos = ({
  proyectos,
  cargando,
}: tablaProyectosProps) => {
  return (
    <>
      {cargando || proyectos && proyectos.length > 0 ? (
        <TableContainer className="outer-table-container">
          <Table stickyHeader>
            <Encabezado />
            {cargando ? (
              <Esqueleto
                filas={5}
              />
            ) : (
              <TableBody>
                {proyectos.map((proyecto: proyecto) => (
                  <FilaProyecto
                    proyecto={proyecto}
                    key={proyecto.id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!proyectos || proyectos.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron proyectos
        </div>
      )}
    </>
  );
};