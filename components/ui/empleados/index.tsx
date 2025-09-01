"use client"

import React, { useEffect } from "react";
import { Button, ButtonGroup, TablePagination } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTablaEmpleadosFormulario } from "./hooks/useTablaEmpleadosFormulario";
import { useFiltros } from "./hooks/useFiltros";
import { usePaginacion } from "./hooks/usePaginacion";
import { useOrdenacion } from "./hooks/useOrdenacion";
import { MenuFiltros } from "./components/menuFiltros";
import { FormularioFiltros } from "./components/formularioFiltros";
import { FiltrosActivos } from "./components/filtrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { deactivateEmpleado, fetchEmpleados, insertEmpleado } from "@/services/empleado/service.empleado";
import { useEmpleadoFormulario } from "./hooks/useEmpleadoFormulario";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useMostrarFormulario } from "./hooks/useMostrarFormulario";
import { Formulario } from "./components/formulario";
import SyncIcon from '@mui/icons-material/Sync';
import { empleadoFormularioDatos, insertempleadoParametros } from "./types";
import { useSnackbar } from "@/lib/context/snackbarcontext";

export default function TablaEmpleadosLista() {
  const { watch, setValue, getValues } = useTablaEmpleadosFormulario();
  const { control, handleSubmit, setValue: setValueFormulario, watch: watchFormulario, formState: { isValid } } = useEmpleadoFormulario();
  const { showSuccess, showError, showWarning } = useSnackbar();

  const filtros = useFiltros(setValue, getValues, watch);
  const paginacion = usePaginacion(setValue, watch);
  const ordenacion = useOrdenacion(setValue, watch);
  const formularioVisible = useMostrarFormulario(setValueFormulario, watchFormulario)

  const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
    queryKey: ["fetchDatosSelectTablaEmpleados"],
    queryFn: () => fetchProyectos(),
    refetchOnWindowFocus: false
  });

  const { data: empleadosDatos, isLoading: empleadosCargando, isError: empleadosError, refetch: empleadosRefetch } = useQuery({
    queryKey: [
      "fetchEmpleadosTablaJornadas",
      paginacion.pagina,
      paginacion.filasPorPagina,
      ordenacion.ordenColumna,
      ordenacion.ordenDireccion,
      watch("busquedaNombre"),
      watch("filtroProyecto")
    ],
    queryFn: () => fetchEmpleados({
      busquedaNombre: watch("busquedaNombre"),
      filtroProyecto: watch("filtroProyecto"),
      pagina: paginacion.pagina,
      filasPorPagina: paginacion.filasPorPagina,
      ordenColumna: ordenacion.ordenColumna,
      ordenDireccion: ordenacion.ordenDireccion
    }),
    refetchOnWindowFocus: false
  });

  const mutacion = useMutation({
    mutationFn: (data: insertempleadoParametros) => insertEmpleado(data),
    onSuccess: () => {
      showSuccess("Empleado creado correctamente");
      empleadosRefetch();
      formularioVisible.handleMostrarFormulario();
    },
    onError: () => {
      showError("Error al crear empleado");
    }
  });

  const onSubmit = (data: empleadoFormularioDatos) => {
    mutacion.mutate({
      nombre: data.nombre,
      id_reloj: data.id_reloj,
      id_proyecto: data.id_proyecto,
      legajo: data.legajo,
    });
  };

  const mutacionDeactivate = useMutation({
    mutationFn: (id: number) => deactivateEmpleado(id),
    onSuccess: () => {
      showSuccess("Empleado dado de baja correctamente");
      empleadosRefetch();
    },
    onError: () => {
      showError("Error al dar de baja empleado");
    },
  });

  const onDeactivate = (id: number) => {
    mutacionDeactivate.mutate(
      id
    );
  };

  const getNombreProyectoPorId = (id: number) => {
    const nombreProyecto = selectDatos?.find((proyecto: { id: number; }) => proyecto.id === Number(id));
    return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
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
        {formularioVisible.formularioVisible ? (
          <>
          </>
        ) : (
          <>
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
                onClick={filtros.handleLimpiarFiltros}
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
              variant="contained"
              color="success"
              size="small"
              className="!h-[40px]"
              disableElevation
              onClick={formularioVisible.handleMostrarFormulario}
              endIcon={<PersonAddAltRoundedIcon />}
            >
              Cargar Empleado
            </Button>
          </>
        )}
      </div>
      <FiltrosActivos
        filtrosActivos={filtros.filtrosActivos}
        getNombreProyectoPorId={getNombreProyectoPorId}
      />
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: `${formularioVisible.formularioVisible ? "" : "2px solid #ED6C02"}` }}>
        {formularioVisible.formularioVisible ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
            <Formulario
              control={control}
              selectCargando={selectCargando}
              selectDatos={selectDatos || []}
            />
            <div className="flex justify-between items-center w-full">
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={formularioVisible.handleMostrarFormulario}
                endIcon={<CloseRoundedIcon />}
                disabled={mutacion.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disableElevation
                endIcon={
                  mutacion.isPending ? (
                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                  ) : <SaveAsRoundedIcon />
                }
                disabled={mutacion.isPending || !isValid}
              >
                {mutacion.isPending ? "Guardando" : "Guardar"}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <TablaEmpleados
              empleadosDatos={empleadosDatos}
              empleadosCargando={empleadosCargando}
              filasPorPagina={paginacion.filasPorPagina}
              ordenColumna={ordenacion.ordenColumna}
              ordenDireccion={ordenacion.ordenDireccion}
              onOrden={ordenacion.handleOrdenacion}
              onDeactivate={onDeactivate}
              desactivando={mutacionDeactivate.isPending}
            />
            <div className="flex justify-end items-center overflow-x-hide"
              style={{ borderTop: "2px solid #ED6C02" }}>
              <TablePagination
                rowsPerPageOptions={[25, 50, 75, 100]}
                component="div"
                count={empleadosDatos?.totalEmpleados || 0}
                rowsPerPage={paginacion.filasPorPagina}
                page={paginacion.pagina}
                onPageChange={paginacion.handleCambioPagina}
                onRowsPerPageChange={paginacion.handleCambioFilasPorPagina}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
                slotProps={{
                  select: {
                    MenuProps: {
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      }
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