import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { hookGenericoPadreProps } from "../types";

export const useFiltros = ({ setValue }: hookGenericoPadreProps<'setValue'>) => {

  const [filtrosActivos, setFiltrosActivos] = useState<{ [key: string]: any }>({});

  const [ancla, setAncla] = useState<EventTarget & HTMLButtonElement | null>(null);

  const [busquedaNombreVisible, setBusquedaNombreVisible] = useState<boolean>(false);

  const [filtroProyectoVisible, setFiltroProyectoVisible] = useState<boolean>(false);

  const [busquedaLegajoVisible, setBusquedaLegajoVisible] = useState<boolean>(false);

  const [filtroTipoEmpleadoVisible, setFiltroTipoEmpleadoVisible] = useState<boolean>(false);

  const [filtroTipoAusenciaVisible, setFiltroTipoAusenciaVisible] = useState<boolean>(true);

  const abrirFiltros = Boolean(ancla);

  const handleClickFiltros = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAncla(event.currentTarget);
  };

  const handleCerrarFiltros = () => {
    setAncla(null);
  };

  const handleLimpiarFiltros = () => {
    setValue("filtroMes", '');
    setValue("filtroQuincena", '');
    setValue("busquedaNombre", "");
    setValue("busquedaNombreNormal", "");
    setValue("filtroProyecto", '');
    setValue("busquedaLegajo", '');
    setValue("busquedaLegajoNormal", '');
    setValue("filtroTipoEmpleado", '');
    setValue("filtroTipoAusencia", '');
    setBusquedaNombreVisible(false);
    setFiltroProyectoVisible(false);
    setBusquedaLegajoVisible(false);
    setFiltroTipoEmpleadoVisible(false);
    setFiltroTipoAusenciaVisible(true);
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

  const handleCambioFiltroProyecto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroProyecto", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroProyecto: Number(event.target.value) });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBusquedaLegajo = useCallback(debounce((searchTerm: number) => {
    setValue("busquedaLegajo", searchTerm);
  }, 500), []);

  const handleCambioBusquedaLegajo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("busquedaLegajoNormal", Number(event.target.value));
    handleBusquedaLegajo(Number(event.target.value));
    const filtrosActuales = filtrosActivos
    setFiltrosActivos({ ...filtrosActuales, busquedaLegajo: Number(event.target.value) });
  };

  const handleCambioFiltroTipoEmpleado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroTipoEmpleado", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroTipoEmpleado: Number(event.target.value) });
  };

  const handleCambioFiltroTipoAusencia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroTipoAusencia", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroTipoAusencia: Number(event.target.value) });
  };

  const handleCambioFiltroMes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroMes", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroMes: Number(event.target.value) });
  };
  const handleCambioFiltroQuincena = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("filtroQuincena", Number(event.target.value));
    const filtrosActuales = filtrosActivos;
    setFiltrosActivos({ ...filtrosActuales, filtroQuincena: Number(event.target.value) });
  };

  const handleLimpiarFiltro = (key: string) => {
    const filtrosActuales = { ...filtrosActivos };
    delete filtrosActuales[key];
    setFiltrosActivos(filtrosActuales);

    setValue(key as any, '');

    if (key === 'busquedaNombre') {
      setValue('busquedaNombreNormal', '');
    };
    if (key === 'busquedaLegajo') {
      setValue('busquedaLegajoNormal', '');
    };
    if (key === 'filtroMes') {
      setValue('filtroQuincena', '');
      delete filtrosActuales['filtroQuincena'];
      setFiltrosActivos(filtrosActuales);
    };
  };

  return {
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
  };
};
