"use client"

import React, { useEffect } from "react";
import { Button, TablePagination } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useTablaUsuariosFormulario } from "./hooks/useTablaUsuariosFormulario";
import { useFiltros } from "./hooks/useFiltros";
import { MenuFiltros } from "./components/tablaUsuariosFiltrosMenu";
import { FormularioFiltros } from "./components/tablaUsuariosFiltrosFormulario";
import { FiltrosActivos } from "./components/tablaUsuariosFiltrosActivos";
import { TablaUsuarios } from "./components/tablaUsuarios";
import { useUsuarioFormulario } from "./hooks/useUsuarioFormulario";
import { useMostrarFormulario } from "./hooks/useMostrarFormulario";
import { Formulario } from "./components/tablaUsuariosFormularioCrear";
import { usuarioFormularioDatos, insertUsuarioParametros } from "./types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { getNombreTipoUsuario } from "./utils";
import { BotonesFiltros } from "./components/tablaUsuariosFiltrosBotones";
import { Botones } from "./components/tablaUsuariosFormularioCrearBotones";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { useOrdenacion } from "@/components/hooks/useOrdenacion";
import { fetchTiposUsuario } from "@/services/tipousuario/service.tipousuario";
import { fetchUsuarios, insertUsuario } from "@/services/usuario/service.usuario";

export default function TablaUsuariosLista() {

  const { watch, setValue } = useTablaUsuariosFormulario();

  const { control, handleSubmit, formState: { isValid }, reset } = useUsuarioFormulario();

  const { showSuccess, showError, showWarning } = useSnackbar();

  const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 25 });

  const {
    ancla,
    abrirFiltros,
    filtrosActivos,
    busquedaNombreVisible,
    filtroTipoUsuarioVisible,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioFiltroTipoUsuario,
    handleLimpiarFiltro,
    setBusquedaNombreVisible,
    setFiltroTipoUsuarioVisible
  } = useFiltros({ setValue });

  useEffect(() => {
    handleCambioPagina(null, 0);
  }, [watch("busquedaNombre"), watch("filtroTipoUsuario")]);

  const { direccion, columna, handleOrdenacion } = useOrdenacion({ columnaInicial: "id_tipousuario" });

  const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

  const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
    queryKey: ["fetchTiposUsuario"],
    queryFn: () => fetchTiposUsuario(),
    refetchOnWindowFocus: false
  });

  const { data: usuariosDatos, isLoading: usuariosCargando, isError: usuariosError, refetch: usuariosRefetch } = useQuery({
    queryKey: [
      "fetchUsuariosTabla",
      pagina,
      filasPorPagina,
      columna,
      direccion,
      watch("busquedaNombre"),
      watch("filtroTipoUsuario"),
    ],
    queryFn: () => fetchUsuarios({
      pagina: pagina,
      filasPorPagina: filasPorPagina,
      ordenColumna: columna,
      ordenDireccion: direccion,
      busquedaNombre: watch("busquedaNombre"),
      filtroTipoUsuario: watch("filtroTipoUsuario"),
    }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const getNombreTipoUsuarioPorId = getNombreTipoUsuario(selectDatos);

  const mutacionCreate = useMutation({
    mutationFn: (data: insertUsuarioParametros) => insertUsuario(data),
    onSuccess: () => {
      showSuccess("Usuario creado correctamente");
      usuariosRefetch();
      handleMostrarFormulario();
    },
    onError: () => {
      showError("Error al crear usuario");
    },
  });

  const onSubmit = (data: usuarioFormularioDatos) => {
    mutacionCreate.mutate({
      nombre: data.nombre,
      correo: data.correo,
      contraseña: data.contraseña,
      id_tipousuario: data.id_tipousuario,
    });
  };

  useEffect(() => {
    if (selectError) {
      showWarning("Error al cargar los datos");
    };
    if (usuariosError) {
      showWarning("Error al cargar usuarios");
    };
  }, [selectError, usuariosError, showWarning]);

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
                setFiltroTipoUsuarioVisible(false);
                handleCerrarFiltros();
              }}
              onSeleccionFiltroTipoUsuario={() => {
                setBusquedaNombreVisible(false);
                setFiltroTipoUsuarioVisible(true);
                handleCerrarFiltros();
              }}
            />
            <FormularioFiltros
              mostrarBusquedaNombre={busquedaNombreVisible}
              mostrarFiltroTipoUsuario={filtroTipoUsuarioVisible}
              busquedaNombreNormal={watch("busquedaNombreNormal")}
              filtroTipoUsuario={watch("filtroTipoUsuario")}
              tiposUsuario={selectDatos || []}
              onCambioBusquedaNombre={handleCambioBusquedaNombre}
              onCambioFiltroTipoUsuario={handleCambioFiltroTipoUsuario}
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
              Cargar Usuario
            </Button>
          </>
        )}
      </div>
      <FiltrosActivos
        filtrosActivos={filtrosActivos}
        getNombreTipoUsuarioPorId={getNombreTipoUsuarioPorId}
        handleLimpiarFiltro={handleLimpiarFiltro}
      />
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: `${formularioVisible ? "" : "2px solid #ED6C02"}` }}>
        {formularioVisible ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
            <Formulario
              control={control}
              cargando={selectCargando}
              tiposUsuario={selectDatos || []}
            />
            <Botones
              creando={mutacionCreate.isPending}
              handleMostrarFormulario={handleMostrarFormulario}
              camposValidos={isValid}
            />
          </form>
        ) : (
          <>
            <TablaUsuarios
              usuarios={usuariosDatos?.usuarios || []}
              cargando={usuariosCargando}
              filas={filasPorPagina}
              columna={columna}
              direccion={direccion}
              onOrden={handleOrdenacion}
            />
            {(usuariosCargando || (usuariosDatos?.usuarios.length ?? 0) > 0) && (
              <div className="flex justify-end items-center overflow-x-hide"
                style={{ borderTop: "2px solid #ED6C02" }}>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 75, 100]}
                  component="div"
                  count={usuariosDatos?.totalUsuarios || 0}
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