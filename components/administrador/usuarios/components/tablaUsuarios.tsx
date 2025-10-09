import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { tablaUsuariosProps, usuario } from "../types";
import { Esqueleto } from "./tablaUsuariosEsqueleto";
import { Encabezado } from "./tablaUsuariosEncabezado";
import FilaUsuario from "./tablaUsuariosFila";

export const TablaUsuarios = ({
  usuarios,
  cargando,
  filas,
  columna,
  direccion,
  onOrden
}: tablaUsuariosProps) => {
  return (
    <>
      {cargando || usuarios && usuarios.length > 0 ? (
        <TableContainer className="outer-table-container">
          <Table stickyHeader>
            <Encabezado
              columna={columna}
              direccion={direccion}
              onOrden={onOrden}
            />
            {cargando ? (
              <Esqueleto
                filas={filas}
              />
            ) : (
              <TableBody>
                {usuarios.map((usuario: usuario) => (
                  <FilaUsuario
                    usuario={usuario}
                    key={usuario.id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
      {!cargando && (!usuarios || usuarios.length === 0) && (
        <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
          No se encontraron usuarios
        </div>
      )}
    </>
  );
};