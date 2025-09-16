"use client"

import React, { useEffect } from "react";
import { Button, TablePagination } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTablaEmpleadosFormulario } from "./hooks/useTablaEmpleadosFormulario";
import { useFiltros } from "./hooks/useFiltros";
import { MenuFiltros } from "./components/tablaEmpleadosFiltrosMenu";
import { FormularioFiltros } from "./components/tablaEmpleadosFiltrosFormulario";
import { FiltrosActivos } from "./components/tablaEmpleadosFiltrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { fetchEmpleados, insertEmpleado } from "@/services/empleado/service.empleado";
import { useEmpleadoFormulario } from "./hooks/useEmpleadoFormulario";
import { useMostrarFormulario } from "./hooks/useMostrarFormulario";
import { Formulario } from "./components/tablaEmpleadosFormularioCrear";
import { empleadoFormularioDatos, insertempleadoParametros } from "./types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { getNombreProyecto } from "./utils";
import { BotonesFiltros } from "./components/tablaEmpleadosFiltrosBotones";
import { usePaginacion } from "../hooks/usePaginacion";
import { useOrdenacion } from "../hooks/useOrdenacion";
import { Botones } from "./components/tablaEmpleadosFormularioCrearBotones";

export default function TablaEmpleadosLista() {

  const { watch, setValue, getValues } = useTablaEmpleadosFormulario();

  const { control, handleSubmit, formState: { isValid }, reset } = useEmpleadoFormulario();

  const { showSuccess, showError, showWarning } = useSnackbar();

  const { ancla, abrirFiltros, filtrosActivos, busquedaNombreVisible, filtroProyectoVisible, busquedaLegajoVisible, handleClickFiltros, handleCerrarFiltros, handleLimpiarFiltros, handleCambioBusquedaNombre, handleCambioBusquedaLegajo, handleCambioFiltroProyecto, setBusquedaNombreVisible, setFiltroProyectoVisible, setBusquedaLegajoVisible } = useFiltros({ setValue, getValues });

  const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

  const { direccion, columna, handleOrdenacion } = useOrdenacion({ columnaInicial: "nombreapellido" });

  const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

  const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
    queryKey: ["fetchDatosSelectTablaEmpleados"],
    queryFn: () => fetchProyectos(),
    refetchOnWindowFocus: false
  });

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
    ],
    queryFn: () => fetchEmpleados({
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaNombre: watch("busquedaNombre"),
      filtroProyecto: watch("filtroProyecto"),
      busquedaLegajo: watch("busquedaLegajo"),
    }),
    refetchOnWindowFocus: false
  });

  const getNombreProyectoPorId = getNombreProyecto({ selectDatos });

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
    });
  };

  useEffect(() => {
    if (selectError) {
      showWarning("Error al cargar los datos");
    };
    if (empleadosError) {
      showWarning("Error al cargar empleados");
    };
  }, [selectError, empleadosDatos, showWarning]);

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
                handleCerrarFiltros();
              }}
              onSeleccionFiltroProyecto={() => {
                setBusquedaNombreVisible(false);
                setFiltroProyectoVisible(true);
                setBusquedaLegajoVisible(false);
                handleCerrarFiltros();
              }}
              onSeleccionBusquedaLegajo={() => {
                setBusquedaNombreVisible(false);
                setFiltroProyectoVisible(false);
                setBusquedaLegajoVisible(true);
                handleCerrarFiltros();
              }}
            />
            <FormularioFiltros
              mostrarBusquedaNombre={busquedaNombreVisible}
              mostrarFiltroProyecto={filtroProyectoVisible}
              mostrarBusquedaLegajo={busquedaLegajoVisible}
              busquedaNombreNormal={watch("busquedaNombreNormal")}
              busquedaLegajoNormal={watch("busquedaLegajoNormal")}
              filtroProyecto={watch("filtroProyecto")}
              proyectos={selectDatos || []}
              onCambioBusquedaNombre={handleCambioBusquedaNombre}
              onCambioFiltroProyecto={handleCambioFiltroProyecto}
              onCambioBusquedaLegajo={handleCambioBusquedaLegajo}
            />
            <div className="flex grow" />
            <Button
              variant="contained"
              color="success"
              size="small"
              className="!h-[40px]"
              disableElevation
              onClick={handleMostrarFormulario}
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
      />
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: `${formularioVisible ? "" : "2px solid #ED6C02"}` }}>
        {formularioVisible ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
            <Formulario
              control={control}
              cargando={selectCargando}
              proyectos={selectDatos || []}
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
          </>
        )}
      </div>
    </div>
  );
}