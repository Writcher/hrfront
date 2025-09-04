"use client"

import React, { useEffect } from "react";
import { Button, TablePagination } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTablaEmpleadosFormulario } from "./hooks/useTablaEmpleadosFormulario";
import { useFiltros } from "./hooks/useFiltrosPadre";
import { usePaginacion } from "./hooks/usePaginacionPadre";
import { useOrdenacion } from "./hooks/useOrdenacion";
import { useExpansion } from "./hooks/useExpansion";
import { MenuFiltros } from "./components/menuFiltros";
import { FormularioFiltrosPadre } from "./components/formularioFiltrosPadre";
import { FiltrosActivos } from "./components/filtrosActivos";
import { TablaEmpleados } from "./components/tablaEmpleados";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { fetchEmpleados } from "@/services/empleado/service.empleado";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { getNombreProyecto } from "./utils";
import { BotonesFiltros } from "./components/botonesFiltrosPadre";

export default function TablaJornadasEmpleados() {

  const { watch, setValue, getValues } = useTablaEmpleadosFormulario();
  const { showWarning } = useSnackbar();

  const filtros = useFiltros({ setValue, getValues, watch });
  const paginacion = usePaginacion({ setValue, watch });
  const ordenacion = useOrdenacion({ setValue, watch });
  const expansion = useExpansion({ setValue, watch });

  const { data: selectDatos, isError: selectError } = useQuery({
    queryKey: ["fetchDatosSelectTablaEmpleados"],
    queryFn: () => fetchProyectos(),
    refetchOnWindowFocus: false
  });

  const { data: empleadosDatos, isLoading: empleadosCargando, isError: empleadosError } = useQuery({
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
      ordenDireccion: ordenacion.ordenDireccion,
      busquedaLegajo: '',
    }),
    refetchOnWindowFocus: false
  });

  const getNombreProyectoPorId = getNombreProyecto(selectDatos);

  useEffect(() => {
    if (selectError) {
      showWarning("Error al cargar los datos");
    };
    if (empleadosError) {
      showWarning("Error al cargar empleados");
    };
  }, [selectError, empleadosError, showWarning]);

  return (
    <div className="flex flex-col gap-1 items-start w-full h-full">
      <div className="flex flex-row gap-2 w-full">
        <BotonesFiltros
          onClick={filtros.handleClickFiltros}
          onClean={filtros.handleLimpiarFiltros}
        />
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
        <FormularioFiltrosPadre
          mostrarBusquedaNombre={watch("mostrarBusquedaNombre")}
          mostrarFiltroProyecto={watch("mostrarFiltroProyecto")}
          busquedaNombreNormal={watch("busquedaNombreNormal")}
          filtroProyecto={watch("filtroProyecto")}
          selectDatos={selectDatos || []}
          onCambioBusquedaNombre={filtros.handleCambioBusquedaNombre}
          onCambioFiltroProyecto={filtros.handleCambioFiltroProyecto}
        />
        <div className="flex grow"/>
        <Button
          component={Link}
          href={"/administrativo/importacion/importar"}
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
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: "2px solid #ED6C02" }}>
        <TablaEmpleados
          empleadosDatos={empleadosDatos}
          empleadosCargando={empleadosCargando}
          idFilaExpandida={expansion.idFilaExpandida}
          filasPorPagina={paginacion.filasPorPagina}
          ordenColumna={ordenacion.ordenColumna}
          ordenDireccion={ordenacion.ordenDireccion}
          onOrden={ordenacion.handleOrdenacion}
          onExpandirFila={expansion.toggleExpandirFila}
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
                  anchorOrigin: { vertical: "top", horizontal: "right" },
                  transformOrigin: { vertical: "top", horizontal: "left" }
                },
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};