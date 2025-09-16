import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { hookGenericoPadreProps } from "../types";

export const useFiltros = ({ setValue, getValues }: hookGenericoPadreProps<'setValue' | 'getValues'>) => {

  const [filtrosActivos, setFiltrosActivos] = useState<{ [key: string]: any }>({});

  const [ancla, setAncla] = useState<EventTarget & HTMLButtonElement | null>(null);

  const [busquedaNombreVisible, setBusquedaNombreVisible] = useState<boolean>(false);

  const [filtroProyectoVisible, setFiltroProyectoVisible] = useState<boolean>(false);

  const [busquedaLegajoVisible, setBusquedaLegajoVisible] = useState<boolean>(true);

  const abrirFiltros = Boolean(ancla);

  const handleClickFiltros = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAncla(event.currentTarget);
  };

  const handleCerrarFiltros = () => {
    setAncla(null);
  };

  const handleLimpiarFiltros = () => {
    setValue("busquedaNombre", "");
    setValue("busquedaNombreNormal", "");
    setValue("filtroProyecto", '');
    setValue("busquedaLegajo", '');
    setValue("busquedaLegajoNormal", '');
    setBusquedaNombreVisible(false);
    setFiltroProyectoVisible(false);
    setBusquedaLegajoVisible(true);
    setFiltrosActivos({});
    handleCerrarFiltros();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBusquedaNombre = useCallback(debounce((searchTerm: string) => {
    setValue("busquedaNombre", searchTerm);
  }, 500), []);

  const handleCambioBusquedaNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("busquedaNombreNormal", event.target.value);
    handleBusquedaNombre(event.target.value);
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, busquedaNombre: event.target.value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBusquedaLegajo = useCallback(debounce((searchTerm: number) => {
    setValue("busquedaLegajo", searchTerm);
  }, 500), []);

  const handleCambioBusquedaLegajo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("busquedaLegajoNormal", Number(event.target.value));
    handleBusquedaLegajo(Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, busquedaLegajo: Number(event.target.value) });
  };

  const handleCambioFiltroProyecto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroProyecto", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroProyecto: Number(event.target.value) });
  };

  return {
    ancla,
    abrirFiltros,
    filtrosActivos,
    busquedaNombreVisible,
    filtroProyectoVisible,
    busquedaLegajoVisible,
    handleClickFiltros,
    handleCerrarFiltros,
    handleLimpiarFiltros,
    handleCambioBusquedaNombre,
    handleCambioBusquedaLegajo,
    handleCambioFiltroProyecto,
    setBusquedaNombreVisible,
    setFiltroProyectoVisible,
    setBusquedaLegajoVisible
  };
};
