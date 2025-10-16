"use client"

import React, { useEffect } from "react";
import { TablePagination } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTablaEmpleadosFiltros } from "./hooks/useTablaEmpleadosFiltros";
import { useFiltros } from "./hooks/useFiltrosPadre";
import { useExpansion } from "../hooks/useExpansion";
import { MenuFiltros } from "./components/tablaEmpleados/tablaEmpleadosFiltrosMenu";
import { Formulario } from "./components/tablaEmpleados/tablaEmpleadosFiltrosFormulario";
import { FiltrosActivos } from "./components/tablaEmpleados/tablaEmpleadosFiltrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados/tablaEmpleados";
import { fetchEmpleados } from "@/services/empleado/service.empleado";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { getNombreMes, getNombreProyecto, getNombreTipoAusencia, getNombreTipoEmpleado } from "./utils";
import { Botones } from "./components/tablaEmpleados/tablaEmpleadosFiltrosBotones";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { tablaAusenciasEmpleadosProps } from "./types";
import { useOrdenacion } from "../hooks/useOrdenacion";
import { useSelectDatos } from "./hooks/useSelectDatosPadre";

export default function TablaAusenciasEmpleados({ esAdministrativo, esRRHH }: tablaAusenciasEmpleadosProps) {

  const { watch, setValue } = useTablaEmpleadosFiltros();

  const { showWarning } = useSnackbar();

  const {
    ancla,
    abrirFiltros,
    filtrosActivos,
    busquedaNombreVisible,
    filtroProyectoVisible,
    busquedaLegajoVisible,
    filtroTipoEmpleadoVisible,
    filtroTipoAusenciaVisible,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioFiltroProyecto,
    handleCambioBusquedaLegajo,
    handleCambioFiltroTipoEmpleado,
    handleCambioFiltroTipoAusencia,
    handleCambioFiltroQuincena,
    handleCambioFiltroMes,
    handleLimpiarFiltro,
    setBusquedaNombreVisible,
    setFiltroProyectoVisible,
    setBusquedaLegajoVisible,
    setFiltroTipoEmpleadoVisible,
    setFiltroTipoAusenciaVisible
  } = useFiltros({ setValue });

  const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

  useEffect(() => {
    handleCambioPagina(null, 0);
  }, [
    watch("busquedaNombre"),
    watch("filtroProyecto"),
    watch("busquedaLegajo"),
    watch("filtroTipoEmpleado"),
    watch("filtroTipoAusencia"),
    watch("filtroMes"),
    watch("filtroQuincena"),
  ]);

  const { direccion, columna, handleOrdenacion } = useOrdenacion({ columnaInicial: "nombreapellido" });

  const { idFila, handleExpansionFila } = useExpansion();

  const {
    proyectos,
    meses,
    tiposEmpleado,
    tiposAusencia,
    cargando,
    error
  } = useSelectDatos();

  const { data: empleadosDatos, isLoading: empleadosCargando, isError: empleadosError } = useQuery({
    queryKey: [
      "fetchEmpleadosTablaAusencias",
      pagina,
      filasPorPagina,
      columna,
      direccion,
      watch("busquedaNombre"),
      watch("filtroProyecto"),
      watch("busquedaLegajo"),
      watch("filtroTipoEmpleado"),
      watch("filtroTipoAusencia"),
      watch("filtroMes"),
      watch("filtroQuincena"),
    ],
    queryFn: () => fetchEmpleados({
      busquedaNombre: watch("busquedaNombre"),
      filtroProyecto: watch("filtroProyecto"),
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaLegajo: watch("busquedaLegajo"),
      filtroTipoEmpleado: watch("filtroTipoEmpleado"),
      filtroTipoAusencia: watch("filtroTipoAusencia"),
      filtroMes: watch("filtroMes"),
      filtroQuincena: watch("filtroQuincena"),
    }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const getNombreProyectoPorId = getNombreProyecto(proyectos);
  const getNombreTipoEmpleadoPorId = getNombreTipoEmpleado(tiposEmpleado);
  const getNombreTipoAusenciaPorId = getNombreTipoAusencia(tiposAusencia);
  const getNombreMesPorId = getNombreMes(meses);

  useEffect(() => {
    if (error) {
      showWarning("Error al cargar los datos");
    };
    if (empleadosError) {
      showWarning("Error al cargar empleados");
    };
  }, [error, empleadosError, showWarning]);

  return (
    <div className="flex flex-col gap-1 items-start w-full h-full">
      <div className="flex flex-row gap-2 w-full">
        <Botones
          onClick={handleClickFiltros}
          onClean={handleLimpiarFiltros}
        />
        <MenuFiltros
          anchorEl={ancla}
          open={abrirFiltros}
          onClose={handleCerrarFiltros}
          onSeleccionBusquedaNombre={() => {
            setBusquedaNombreVisible(true);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(false);
            setFiltroTipoAusenciaVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionFiltroProyecto={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(true);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(false);
            setFiltroTipoAusenciaVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionBusquedaLegajo={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(true);
            setFiltroTipoEmpleadoVisible(false);
            setFiltroTipoAusenciaVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionFiltroTipoEmpleado={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(true);
            setFiltroTipoAusenciaVisible(false);
            handleCerrarFiltros();
          }}
          onSeleccionFiltroTipoAusencia={() => {
            setBusquedaNombreVisible(false);
            setFiltroProyectoVisible(false);
            setBusquedaLegajoVisible(false);
            setFiltroTipoEmpleadoVisible(false);
            setFiltroTipoAusenciaVisible(true);
            handleCerrarFiltros();
          }}
        />
        <Formulario
          mostrarBusquedaNombre={busquedaNombreVisible}
          mostrarFiltroProyecto={filtroProyectoVisible}
          mostrarBusquedaLegajo={busquedaLegajoVisible}
          mostrarFiltroTipoEmpleado={filtroTipoEmpleadoVisible}
          mostrarFiltroTipoAusencia={filtroTipoAusenciaVisible}
          busquedaNombreNormal={watch("busquedaNombreNormal")}
          filtroProyecto={watch("filtroProyecto")}
          busquedaLegajoNormal={watch("busquedaLegajoNormal")}
          filtroTipoEmpleado={watch("filtroTipoEmpleado")}
          filtroTipoAusencia={watch("filtroTipoAusencia")}
          filtroMes={watch("filtroMes")}
          filtroQuincena={watch("filtroQuincena")}
          proyectos={proyectos || []}
          tiposEmpleado={tiposEmpleado || []}
          tiposAusencia={tiposAusencia || []}
          meses={meses || []}
          cargando={cargando}
          onCambioBusquedaNombre={handleCambioBusquedaNombre}
          onCambioFiltroProyecto={handleCambioFiltroProyecto}
          onCambioBusquedaLegajo={handleCambioBusquedaLegajo}
          onCambioFiltroTipoEmpleado={handleCambioFiltroTipoEmpleado}
          onCambioFiltroTipoAusencia={handleCambioFiltroTipoAusencia}
          onCambioFiltroQuincena={handleCambioFiltroQuincena}
          onCambioFiltroMes={handleCambioFiltroMes}
        />
      </div>
      <FiltrosActivos
        filtrosActivos={filtrosActivos}
        getNombreProyectoPorId={getNombreProyectoPorId}
        getNombreTipoEmpleadoPorId={getNombreTipoEmpleadoPorId}
        getNombreTipoAusenciaPorId={getNombreTipoAusenciaPorId}
        getNombreMesPorId={getNombreMesPorId}
        handleLimpiarFiltro={handleLimpiarFiltro}
      />
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: "2px solid #ED6C02" }}>
        <TablaEmpleados
          empleados={empleadosDatos?.empleados}
          cargando={empleadosCargando}
          idFilaExpandida={idFila}
          filas={filasPorPagina}
          columna={columna}
          direccion={direccion}
          onOrden={handleOrdenacion}
          onExpandirFila={handleExpansionFila}
          esAdministrativo={esAdministrativo}
          esRRHH={esRRHH}
          filtroTipoAusencia={watch("filtroTipoAusencia")}
          filtroMes={watch("filtroMes")}
          filtroQuincena={watch("filtroQuincena")}
        />
        {(empleadosCargando || (empleadosDatos?.empleados.length ?? 0) > 0) && (
          <div className="flex justify-end items-center overflow-x-hide"
            style={{ borderTop: "2px solid #ED6C02" }}>
            <TablePagination
              rowsPerPageOptions={[25, 50, 75, 100]}
              component="div"
              count={empleadosDatos?.totalEmpleados || 0}
              rowsPerPage={filasPorPagina}
              page={pagina}
              onPageChange={handleCambioPagina}
              onRowsPerPageChange={handleCambioFilasPorPagina}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
              slotProps={{
                select: {
                  MenuProps: {
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                    transformOrigin: { vertical: "top", horizontal: "left" }
                  },
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};