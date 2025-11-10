"use client"

import React, { useEffect } from "react";
import { Button, TablePagination } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useTablaEmpleadosFormulario } from "./hooks/useTablaEmpleadosFormulario";
import { useFiltros } from "./hooks/useFiltros";
import { MenuFiltros } from "./components/tablaEmpleadosFiltrosMenu";
import { FormularioFiltros } from "./components/tablaEmpleadosFiltrosFormulario";
import { FiltrosActivos } from "./components/tablaEmpleadosFiltrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados";
import { fetchEmpleados, insertEmpleado, syncNomina } from "@/services/empleado/service.empleado";
import { useEmpleadoFormulario } from "./hooks/useEmpleadoFormulario";
import { Formulario } from "./components/tablaEmpleadosFormularioCrear";
import { empleadoFormularioDatos, insertempleadoParametros } from "./types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { getNombreProyecto, getNombreTipoEmpleado } from "./utils";
import { BotonesFiltros } from "./components/tablaEmpleadosFiltrosBotones";
import { usePaginacion } from "../hooks/usePaginacion";
import { useOrdenacion } from "../hooks/useOrdenacion";
import { Botones } from "./components/tablaEmpleadosFormularioCrearBotones";
import { useSelectDatos } from "./hooks/useSelectDatos";
import { useMostrarFormulario } from "./hooks/useMostrarFormulario";
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import Link from "next/link";
import SyncIcon from '@mui/icons-material/Sync';

export default function TablaEmpleadosLista({ esAdministrativo }: { esAdministrativo: boolean }) {

  const { watch, setValue } = useTablaEmpleadosFormulario();

  const { control, handleSubmit, formState: { isValid }, reset } = useEmpleadoFormulario();

  const { showSuccess, showError, showWarning } = useSnackbar();

  const {
    ancla,
    abrirFiltros,
    filtrosActivos,
    busquedaNombreVisible,
    filtroProyectoVisible,
    busquedaLegajoVisible,
    filtroTipoEmpleadoVisible,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioBusquedaLegajo,
    handleCambioFiltroProyecto,
    handleCambioFiltroTipoEmpleado,
    handleLimpiarFiltro,
    setBusquedaNombreVisible,
    setFiltroProyectoVisible,
    setBusquedaLegajoVisible,
    setFiltroTipoEmpleadoVisible
  } = useFiltros({ setValue });

  const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

  useEffect(() => {
    handleCambioPagina(null, 0);
  }, [
    watch("busquedaNombre"),
    watch("filtroProyecto"),
    watch("busquedaLegajo"),
    watch("filtroTipoEmpleado"),
  ]);

  const { direccion, columna, handleOrdenacion } = useOrdenacion({ columnaInicial: "nombreapellido" });

  const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

  const {
    proyectos,
    tiposEmpleado,
    turnos,
    cargando,
    error
  } = useSelectDatos();

  const { data: empleadosDatos, isLoading: empleadosCargando, isError: empleadosError, refetch: empleadosRefetch } = useQuery({
    queryKey: [
      "fetchEmpleadosTablaJornadas",
      pagina,
      filasPorPagina,
      columna,
      direccion,
      watch("busquedaNombre"),
      watch("filtroProyecto"),
      watch("busquedaLegajo"),
      watch("filtroTipoEmpleado"),
    ],
    queryFn: () => fetchEmpleados({
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaNombre: watch("busquedaNombre"),
      filtroProyecto: watch("filtroProyecto"),
      busquedaLegajo: watch("busquedaLegajo"),
      filtroTipoEmpleado: watch("filtroTipoEmpleado"),
    }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const getNombreProyectoPorId = getNombreProyecto(proyectos);
  const getNombreTipoEmpleadoPorId = getNombreTipoEmpleado(tiposEmpleado);

  const mutacionCreate = useMutation({
    mutationFn: (data: insertempleadoParametros) => insertEmpleado(data),
    onSuccess: () => {
      showSuccess("Empleado creado correctamente");
      empleadosRefetch();
      handleMostrarFormulario();
    },
    onError: () => {
      showError("Error al crear empleado");
    },
  });

  const onSubmit = (data: empleadoFormularioDatos) => {
    mutacionCreate.mutate({
      nombre: data.nombre,
      id_reloj: data.id_reloj,
      id_proyecto: data.id_proyecto,
      legajo: data.legajo,
      id_tipoempleado: data.id_tipoempleado,
    });
  };

  const mutacionSync = useMutation({
    mutationFn: () => syncNomina(),
    onSuccess: () => {
      showSuccess("Empleados sincronizados correctamente");
      empleadosRefetch();
    },
    onError: () => {
      showError("Error al sincronizar empleados");
    },
  })

  useEffect(() => {
    if (error) {
      showWarning("Error al cargar los datos");
    };
    if (empleadosError) {
      showWarning("Error al cargar empleados");
    };
  }, [error, empleadosDatos, showWarning]);

  return (
    <div className="flex flex-col gap-1 items-start w-full h-full">
      <div className="flex flex-row gap-2 w-full">
        {formularioVisible ? (
          <>
          </>
        ) : (
          <>
            <BotonesFiltros
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
                handleCerrarFiltros();
              }}
              onSeleccionFiltroProyecto={() => {
                setBusquedaNombreVisible(false);
                setFiltroProyectoVisible(true);
                setBusquedaLegajoVisible(false);
                setFiltroTipoEmpleadoVisible(false);
                handleCerrarFiltros();
              }}
              onSeleccionBusquedaLegajo={() => {
                setBusquedaNombreVisible(false);
                setFiltroProyectoVisible(false);
                setBusquedaLegajoVisible(true);
                setFiltroTipoEmpleadoVisible(false);
                handleCerrarFiltros();
              }}
              onSeleccionFiltroTipoEmpleado={() => {
                setBusquedaNombreVisible(false);
                setFiltroProyectoVisible(false);
                setBusquedaLegajoVisible(false);
                setFiltroTipoEmpleadoVisible(true);
                handleCerrarFiltros();
              }}
            />
            <FormularioFiltros
              mostrarBusquedaNombre={busquedaNombreVisible}
              mostrarFiltroProyecto={filtroProyectoVisible}
              mostrarBusquedaLegajo={busquedaLegajoVisible}
              mostrarFiltroTipoEmpleado={filtroTipoEmpleadoVisible}
              busquedaNombreNormal={watch("busquedaNombreNormal")}
              filtroProyecto={watch("filtroProyecto")}
              busquedaLegajoNormal={watch("busquedaLegajoNormal")}
              filtroTipoEmpleado={watch("filtroTipoEmpleado")}
              proyectos={proyectos || []}
              tiposEmpleado={tiposEmpleado || []}
              onCambioBusquedaNombre={handleCambioBusquedaNombre}
              onCambioFiltroProyecto={handleCambioFiltroProyecto}
              onCambioBusquedaLegajo={handleCambioBusquedaLegajo}
              onCambioFiltroTipoEmpleado={handleCambioFiltroTipoEmpleado}
            />
            <div className="flex grow" />
            {esAdministrativo &&
              <Button
                variant="contained"
                color="info"
                size="small"
                className="!h-[40px]"
                disableElevation
                component={Link}
                href={`/administrativo/empleados/asistencia`}
                endIcon={<NumbersRoundedIcon />}
              >
                Consultar Asistencia
              </Button>
            }
            {!esAdministrativo &&
              <Button
                variant="contained"
                color="info"
                size="small"
                className="!h-[40px]"
                disableElevation
                onClick={() => mutacionSync.mutate()}
                disabled={mutacionSync.isPending}
                endIcon= {!mutacionSync.isPending ? <SyncIcon /> : <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />}
              >
                {!mutacionSync.isPending ? "Sincronizar Empleados" : "Sincronizando"}
              </Button>
            }
            <Button
              variant="contained"
              color="success"
              size="small"
              className="!h-[40px]"
              disableElevation
              onClick={handleMostrarFormulario}
              disabled={mutacionSync.isPending}
              endIcon={<PersonAddAltRoundedIcon />}
            >
              Cargar Empleado
            </Button>
          </>
        )}
      </div>
      <FiltrosActivos
        filtrosActivos={filtrosActivos}
        getNombreProyectoPorId={getNombreProyectoPorId}
        getNombreTipoEmpleadoPorId={getNombreTipoEmpleadoPorId}
        handleLimpiarFiltro={handleLimpiarFiltro}
      />
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: `${formularioVisible ? "" : "2px solid #ED6C02"}` }}>
        {formularioVisible ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
            <Formulario
              control={control}
              cargando={cargando}
              proyectos={proyectos || []}
              tiposEmpleado={tiposEmpleado || []}
            />
            <Botones
              creando={mutacionCreate.isPending}
              handleMostrarFormulario={handleMostrarFormulario}
              camposValidos={isValid}
            />
          </form>
        ) : (
          <>
            <TablaEmpleados
              empleados={empleadosDatos?.empleados}
              cargando={empleadosCargando}
              filas={filasPorPagina}
              columna={columna}
              direccion={direccion}
              onOrden={handleOrdenacion}
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
          </>
        )}
      </div>
    </div>
  );
}