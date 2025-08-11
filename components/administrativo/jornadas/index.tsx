"use client"

import React from "react";
import { Button, ButtonGroup, TablePagination } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTablaJornadaFormulario } from "./hooks/useTablaJornadaForm";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useOrdenacion } from "./hooks/useOrdenacion";
import { useExpansion } from "./hooks/useExpansion";
import { MenuFiltros } from "./components/menuFiltros";
import { FormularioFiltros } from "./components/formularioFiltros";
import { FiltrosActivos } from "./components/filtrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados";
import { ContenidoFilaExpandida } from "./components/contenidoFilaExpandida";
import { fetchDatosSelectTablaEmpleados, fetchEmpleadosTablaJornadas } from "@/services/jornadas/service.jornadas";

export default function TablaEmpleadosJornadas() {
  const { watch, setValue, getValues } = useTablaJornadaFormulario();

  const filtros = useFiltros(setValue, getValues, watch);
  const paginacion = usePaginacion(setValue, watch);
  const ordenacion = useOrdenacion(setValue, watch);
  const expansion = useExpansion(setValue, watch);

  // Queries
  const { data: selectDatos } = useQuery({
    queryKey: ["fetchDatosSelectTablaEmpleados"],
    queryFn: () => fetchDatosSelectTablaEmpleados(),
    refetchOnWindowFocus: false
  });

  const { data: empleadosDatos, isLoading: empleadosCargando } = useQuery({
    queryKey: ["fetchEmpleadosTablaJornadas", paginacion.pagina, paginacion.filasPorPagina, ordenacion.ordenColumna, ordenacion.ordenDireccion, watch("busquedaNombre"), watch("filtroProyecto")], //añadir parametros
    queryFn: () => fetchEmpleadosTablaJornadas({
      busquedaNombre: watch("busquedaNombre"),
      filtroProyecto: watch("filtroProyecto"),
      pagina: paginacion.pagina,
      filasPorPagina: paginacion.filasPorPagina,
      ordenColumna: ordenacion.ordenColumna,
      ordenDireccion: ordenacion.ordenDireccion
    }),
    refetchOnWindowFocus: false
  });

  const getNombreProyectoPorId = (id: number) => {
    const nombreProyecto = selectDatos?.find((proyecto: { id: number; }) => proyecto.id === Number(id));
    return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      <div className="flex flex-col gap-2 items-start justify-between w-[95%] h-full">
        <div className="flex flex-row gap-2 w-full">
          <ButtonGroup variant="outlined" color="inherit">
            <Button
              variant="contained"
              className="!bg-gray-800 hover:!bg-gray-700 !text-white"
              disableElevation
              endIcon={<FilterAltRoundedIcon />}
              onClick={filtros.handleClickFiltros}
            >
              Filtros
            </Button>
            <Button
              variant="contained"
              color="error"
              disableElevation
              onClick={filtros.handleCerrarFiltros}
            >
              <FilterAltOffRoundedIcon />
            </Button>
          </ButtonGroup>
          <MenuFiltros
            anchorEl={filtros.filtrosAncla}
            open={filtros.abrirMenuFiltro}
            onClose={filtros.handleCerrarFiltros}
            onSeleccionBusquedaNombre={() => {
              setValue("mostrarBusquedaNombre", true);
              setValue("mostrarFiltroProyecto", false);
              filtros.handleCerrarFiltros();
            }}
            onSeleccionFiltroProyecto={() => {
              setValue("mostrarBusquedaNombre", false);
              setValue("mostrarFiltroProyecto", true);
              filtros.handleCerrarFiltros();
            }}
          />
          <FormularioFiltros
            mostrarBusquedaNombre={watch("mostrarBusquedaNombre")}
            mostrarFiltroProyecto={watch("mostrarFiltroProyecto")}
            busquedaNombreNormal={watch("busquedaNombreNormal")}
            filtroProyecto={watch("filtroProyecto")}
            selectDatos={selectDatos || []}
            onCambioBusquedaNombre={filtros.handleCambioBusquedaNombre}
            onCambioFiltroProyecto={filtros.handleCambioFiltroProyecto}
          />
          <div className="flex grow" />
          <Button
            component={Link}
            href={"/administrativo/excel"}
            variant="contained"
            color="success"
            disableElevation
            endIcon={<UploadFileRoundedIcon />}
          >
            Importar Informe
          </Button>
        </div>
        <FiltrosActivos
          filtrosActivos={filtros.filtrosActivos}
          getNombreProyectoPorId={getNombreProyectoPorId}
        />
        <div className="flex grow flex-col justify-between w-full mb-[4px] rounded overflow-y-auto" style={{ border: "2px solid #ED6C02" }}>
          <TablaEmpleados
            empleadosDatos={empleadosDatos}
            empleadosCargando={empleadosCargando}
            idFilaExpandida={expansion.idFilaExpandida}
            filasPorPagina={paginacion.filasPorPagina}
            ordenColumna={ordenacion.ordenColumna}
            ordenDireccion={ordenacion.ordenDireccion}
            onOrden={ordenacion.handleOrdenacion}
            onExpandirFila={expansion.toggleExpandirFila}
            renderFilaExpandida={(idFilaExpandidaProp) => (
              <ContenidoFilaExpandida
                idFilaExpandida={expansion.idFilaExpandida}
                idFilaExpandidaProp={idFilaExpandidaProp}
                setValue={setValue}
                watch={watch}
              />
            )}
          />
          <div className="flex justify-end items-center overflow-x-hide"
            style={{ borderTop: "2px solid #ED6C02" }}>
            <TablePagination
              rowsPerPageOptions={[25, 50, 75, 100]}
              component="div"
              count={empleadosDatos?.totalEmpleaados || 0}
              rowsPerPage={paginacion.filasPorPagina}
              page={paginacion.pagina}
              onPageChange={paginacion.handleCambioPagina}
              onRowsPerPageChange={paginacion.handleCambioFilasPorPagina}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}