import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { Esqueleto } from "./tablaControlesEsqueleto";
import { Encabezado } from "./tablaControlesEncabezado";
import { control, tablaControlesProps } from "../../types";
import FilaControl from "./tablaControlesFila";

export const TablaControles = ({
  controles,
  cargando,
}: tablaControlesProps) => {
  return (
    <>
      {cargando || controles && controles.length > 0 ? (
        <TableContainer className="outer-table-container">
          <Table stickyHeader>
            <Encabezado />
            {cargando ? (
              <Esqueleto
                filas={5}
              />
            ) : (
              <TableBody>
                {controles.map((control: control) => (
                  <FilaControl
                    control={control}
                    key={control.id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!controles || controles.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron controles
        </div>
      )}
    </>
  );
};