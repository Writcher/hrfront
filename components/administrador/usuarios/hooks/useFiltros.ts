import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { hookGenericoPadreProps } from "../types";

export const useFiltros = ({ setValue }: hookGenericoPadreProps<'setValue'>) => {

  const [filtrosActivos, setFiltrosActivos] = useState<{ [key: string]: any }>({});

  const [ancla, setAncla] = useState<EventTarget & HTMLButtonElement | null>(null);

  const [busquedaNombreVisible, setBusquedaNombreVisible] = useState<boolean>(true);

  const [filtroTipoUsuarioVisible, setFiltroTipoUsuarioVisible] = useState<boolean>(false);

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
    setValue("filtroTipoUsuario", '');
    setBusquedaNombreVisible(true);
    setFiltroTipoUsuarioVisible(false);
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

  const handleCambioFiltroTipoUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroTipoUsuario", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroTipoUsuario: Number(event.target.value) });
  };

  const handleLimpiarFiltro = (key: string) => {
    const filtrosActuales = { ...filtrosActivos };
    delete filtrosActuales[key];
    setFiltrosActivos(filtrosActuales);

    setValue(key as any, '');

    if (key === 'busquedaNombre') {
      setValue('busquedaNombreNormal', '');
    };
  };

  return {
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
  };
};
