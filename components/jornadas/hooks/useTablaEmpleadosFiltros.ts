import { useForm } from "react-hook-form";
import { tablaEmpleadosFiltrosDatos } from "../types";

export const useTablaEmpleadosFiltros = () => {
  return useForm<tablaEmpleadosFiltrosDatos>({
    defaultValues: {
      busquedaNombre: "",
      busquedaNombreNormal: "",
      filtroProyecto: '',
      busquedaLegajo: '',
      busquedaLegajoNormal: '',
    },
  });
};