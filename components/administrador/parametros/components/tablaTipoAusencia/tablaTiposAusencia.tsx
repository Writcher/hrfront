import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaTiposAusenciaEsqueleto";
import { Encabezado } from "./tablaTiposAusenciaEncabezado";
import { tipoAusencia, tablaTipoAusenciaProps } from "../../types";
import FilaTipoAusencia from "./tablaTiposAusenciaFila";

export const TablaProyectos = ({
  tiposAusencia,
  cargando,
}: tablaTipoAusenciaProps) => {
  return (
    <>
      {cargando || tiposAusencia && tiposAusencia.length > 0 ? (
        <TableContainer className="outer-table-container">
          <Table stickyHeader>
            <Encabezado />
            {cargando ? (
              <Esqueleto
                filas={5}
              />
            ) : (
              <TableBody>
                {tiposAusencia.map((tipoAusencia: tipoAusencia) => (
                  <FilaTipoAusencia
                    tipoAusencia={tipoAusencia}
                    key={tipoAusencia.id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!tiposAusencia || tiposAusencia.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron tipos de ausencia
        </div>
      )}
    </>
  );
};