import { useCallback } from "react";
import debounce from "lodash.debounce";
import { hookGenericoPadreProps } from "../types";

export const useFiltros = ({ setValue, watch, getValues }: hookGenericoPadreProps<'setValue' | 'watch' | 'getValues'>) => {
  const filtrosAncla = watch("filtrosAncla");
  const abrirMenuFiltro = Boolean(filtrosAncla);
  const filtrosActivos = watch("filtrosActivos");

  const handleClickFiltros = (event: React.MouseEvent<HTMLButtonElement>) => {
    setValue("filtrosAncla", event.currentTarget);
  };

  const handleCerrarFiltros = () => {
    setValue("filtrosAncla", null);
  };

  const handleLimpiarFiltros = () => {
    setValue("busquedaNombre", "");
    setValue("busquedaNombreNormal", "");
    setValue("filtroProyecto", '');
    setValue("busquedaLegajo", '');
    setValue("busquedaLegajoNormal", '');
    setValue("idFilaExpandida", null);
    setValue("mostrarBusquedaNombre", false);
    setValue("mostrarFiltroProyecto", false);
    setValue("mostrarBusquedaLegajo", true);
    setValue("filtrosActivos", {});
    handleCerrarFiltros();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBusquedaNombre = useCallback(debounce((searchTerm: string) => {
    setValue("busquedaNombre", searchTerm);
  }, 500), []);

  const handleCambioBusquedaNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("idFilaExpandida", null);
    setValue("busquedaNombreNormal", event.target.value);
    handleBusquedaNombre(event.target.value);
    const filtrosActuales = getValues("filtrosActivos");
    setValue("filtrosActivos", { ...filtrosActuales, busquedaNombre: event.target.value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBusquedaLegajo = useCallback(debounce((searchTerm: number) => {
    setValue("busquedaLegajo", searchTerm);
  }, 500), []);

  const handleCambioBusquedaLegajo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("idFilaExpandida", null);
    setValue("busquedaLegajoNormal", Number(event.target.value));
    handleBusquedaLegajo(Number(event.target.value));
    const filtrosActuales = getValues("filtrosActivos");
    setValue("filtrosActivos", { ...filtrosActuales, busquedaLegajo: Number(event.target.value) });
  };

  const handleCambioFiltroProyecto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("idFilaExpandida", null);
    setValue("filtroProyecto", Number(event.target.value));
    const filtrosActuales = getValues("filtrosActivos");
    setValue("filtrosActivos", { ...filtrosActuales, filtroProyecto: Number(event.target.value) });
  };

  return {
    filtrosAncla,
    abrirMenuFiltro,
    filtrosActivos,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioBusquedaLegajo,
    handleCambioFiltroProyecto
  };
};
